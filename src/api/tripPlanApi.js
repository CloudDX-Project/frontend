import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './contracts';

/**
 * 일정 생성 BFF 호출.
 * axios를 별도로 쓰지 않고 다른 API 어댑터와 같은 인증·오류 처리 규칙을 사용한다.
 * 현재 화면은 VITE_USE_MOCK=false일 때만 이 함수를 호출한다.
 */
export async function requestTripPlan(payload, { signal } = {}) {
  return apiClient.request(API_ENDPOINTS.plans.generate, {
    method: 'POST',
    body: payload,
    signal,
  });
}
