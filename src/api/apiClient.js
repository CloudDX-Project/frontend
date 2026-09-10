/**
 * 브라우저용 공통 HTTP 클라이언트.
 * 외부 지도/관광/사업자 API 키는 절대 여기서 직접 호출하지 않고 백엔드 BFF를 통한다.
 */

const DEFAULT_BASE_URL =
  import.meta.env?.VITE_API_BASE_URL ??
  (import.meta.env?.DEV ? "http://localhost:8080" : "");

const ACCESS_TOKEN_KEY = "tripbuddy.accessToken";

/**
 * JWT Access Token 조회
 */
export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

/**
 * JWT Access Token 저장
 */
export function saveAccessToken(token) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

/**
 * JWT Access Token 삭제
 */
export function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export class ApiClientError extends Error {
  constructor(
    message,
    {
      status = 0,
      code = "API_ERROR",
      payload = null,
      cause,
    } = {},
  ) {
    super(message, { cause });

    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
    this.payload = payload;
  }
}

function toQueryString(query = {}) {
  const pairs = Object.entries(query).flatMap(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return [];
    }

    if (Array.isArray(value)) {
      return value.map((item) => [key, String(item)]);
    }

    return [[key, String(value)]];
  });

  return new URLSearchParams(pairs).toString();
}

async function parseBody(response) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch (cause) {
      throw new ApiClientError(
        "백엔드 응답 형식이 올바르지 않습니다.",
        {
          status: response.status,
          code: "INVALID_RESPONSE",
          cause,
        },
      );
    }
  }

  const text = await response.text();

  return text
    ? {
        message: text,
      }
    : null;
}

/**
 * @param {{
 *   baseUrl?: string,
 *   getToken?: () => string|undefined,
 *   fetchImpl?: typeof fetch
 * }} options
 */
export function createApiClient({
  baseUrl = DEFAULT_BASE_URL,
  getToken,
  fetchImpl = fetch,
} = {}) {
  async function request(
    path,
    {
      method = "GET",
      query,
      body,
      headers,
      signal,
      timeoutMs = 15000,
    } = {},
  ) {
    const queryString = toQueryString(query);

    const url =
      `${baseUrl.replace(/\/$/, "")}${path}` +
      `${queryString ? `?${queryString}` : ""}`;

    const token = getToken?.();

    const controller = new AbortController();

    const relayAbort = () => {
      controller.abort(signal?.reason);
    };

    if (signal?.aborted) {
      relayAbort();
    } else {
      signal?.addEventListener("abort", relayAbort, {
        once: true,
      });
    }

    const timeoutId = setTimeout(
      () => controller.abort("timeout"),
      Math.max(1, timeoutMs),
    );

    try {
      const response = await fetchImpl(url, {
        method,

        signal: controller.signal,

        headers: {
          Accept: "application/json",

          ...(body
            ? {
                "Content-Type": "application/json",
              }
            : {}),

          ...(token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}),

          ...headers,
        },

        ...(body
          ? {
              body: JSON.stringify(body),
            }
          : {}),
      });

      const payload = await parseBody(response);

      if (!response.ok) {
        throw new ApiClientError(
          payload?.message ?? "API 요청에 실패했습니다.",
          {
            status: response.status,
            code: payload?.code ?? "HTTP_ERROR",
            payload,
          },
        );
      }

      /*
       * 백엔드 응답이
       *
       * {
       *   "success": true,
       *   "message": "...",
       *   "data": {...}
       * }
       *
       * 형식이면 data만 반환한다.
       *
       * data wrapper가 없는 API도 대응한다.
       */
      return payload?.data ?? payload;
    } catch (cause) {
      if (cause instanceof ApiClientError) {
        throw cause;
      }

      const code = signal?.aborted
        ? "REQUEST_ABORTED"
        : controller.signal.aborted
          ? "TIMEOUT"
          : "NETWORK_ERROR";

      throw new ApiClientError(
        "백엔드 서버에 연결할 수 없습니다.",
        {
          code,
          cause,
        },
      );
    } finally {
      clearTimeout(timeoutId);

      signal?.removeEventListener(
        "abort",
        relayAbort,
      );
    }
  }

  return {
    request,
    baseUrl,
  };
}

/*
 * 모든 API 요청에서 localStorage의 JWT를 읽는다.
 *
 * 로그인 후 저장된 토큰이 있으면:
 *
 * Authorization: Bearer {token}
 *
 * 이 자동으로 붙는다.
 */
export const apiClient = createApiClient({
  getToken: getAccessToken,
});

export function isMockModeEnabled() {
  /*
   * 로컬 화면 시연은 서버가 없어도 동작하도록 기본 true.
   * 실제 서버 연결 시 false로 설정한다.
   */
  return (
    String(
      import.meta.env.VITE_USE_MOCK ?? "true",
    ).toLowerCase() !== "false"
  );
}

/**
 * 실제 API 우선, 연결 실패/시연 모드일 때만 mock으로 폴백한다.
 * 응답에는 source와 isMock을 명시해 화면이 실제 가격처럼 오해하지 않게 한다.
 */
export async function withMockFallback(
  liveRequest,
  mockRequest,
  {
    forceMock = isMockModeEnabled(),
  } = {},
) {
  if (forceMock) {
    return mockRequest();
  }

  try {
    return await liveRequest();
  } catch (error) {
    if (
      error instanceof ApiClientError &&
      (
        error.status >= 500 ||
        error.code === "NETWORK_ERROR" ||
        error.code === "TIMEOUT"
      )
    ) {
      return mockRequest();
    }

    throw error;
  }
}