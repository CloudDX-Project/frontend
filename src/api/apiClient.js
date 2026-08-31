/**
 * 브라우저용 공통 HTTP 클라이언트.
 * 외부 지도/관광/사업자 API 키는 절대 여기서 직접 호출하지 않고 백엔드 BFF를 통한다.
 */

const DEFAULT_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

export class ApiClientError extends Error {
  constructor(message, { status = 0, code = 'API_ERROR', payload = null, cause } = {}) {
    super(message, { cause });
    this.name = 'ApiClientError';
    this.status = status;
    this.code = code;
    this.payload = payload;
  }
}

function toQueryString(query = {}) {
  const pairs = Object.entries(query).flatMap(([key, value]) => {
    if (value === undefined || value === null || value === '') return [];
    if (Array.isArray(value)) return value.map((item) => [key, String(item)]);
    return [[key, String(value)]];
  });
  return new URLSearchParams(pairs).toString();
}

async function parseBody(response) {
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) return response.json();
  const text = await response.text();
  return text ? { message: text } : null;
}

/**
 * @param {{baseUrl?: string, getToken?: () => string|undefined, fetchImpl?: typeof fetch}} options
 */
export function createApiClient({ baseUrl = DEFAULT_BASE_URL, getToken, fetchImpl = fetch } = {}) {
  async function request(path, { method = 'GET', query, body, headers, signal } = {}) {
    const queryString = toQueryString(query);
    const url = `${baseUrl.replace(/\/$/, '')}${path}${queryString ? `?${queryString}` : ''}`;
    const token = getToken?.();

    let response;
    try {
      response = await fetchImpl(url, {
        method,
        signal,
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          ...(body ? { 'Content-Type': 'application/json' } : {}),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...headers,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });
    } catch (cause) {
      throw new ApiClientError('백엔드 서버에 연결할 수 없습니다.', {
        code: 'NETWORK_ERROR',
        cause,
      });
    }

    const payload = await parseBody(response);
    if (!response.ok) {
      throw new ApiClientError(payload?.message ?? 'API 요청에 실패했습니다.', {
        status: response.status,
        code: payload?.code ?? 'HTTP_ERROR',
        payload,
      });
    }

    // 백엔드가 { data: ... } 래퍼를 쓸 수도, 데이터만 반환할 수도 있게 허용한다.
    return payload?.data ?? payload;
  }

  return { request, baseUrl };
}

export const apiClient = createApiClient();

export function isMockModeEnabled() {
  // 로컬 화면 시연은 서버가 없어도 동작하도록 기본 true. 실제 서버 연결 시 false로 설정한다.
  return String(import.meta.env.VITE_USE_MOCK ?? 'true').toLowerCase() !== 'false';
}

/**
 * 실제 API 우선, 연결 실패/시연 모드일 때만 mock으로 폴백한다.
 * 응답에는 source와 isMock을 명시해 화면이 실제 가격처럼 오해하지 않게 한다.
 */
export async function withMockFallback(liveRequest, mockRequest, { forceMock = isMockModeEnabled() } = {}) {
  if (forceMock) return mockRequest();

  try {
    return await liveRequest();
  } catch (error) {
    if (!(error instanceof ApiClientError) || error.status >= 500 || error.code === 'NETWORK_ERROR') {
      return mockRequest();
    }
    throw error;
  }
}
