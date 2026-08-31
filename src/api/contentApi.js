import { apiClient, withMockFallback } from './apiClient';
import { API_ENDPOINTS, API_SOURCE_LABELS } from './contracts';
import { MOCK_PLACES } from './mockData';

/**
 * 관광지와 식당의 "사실성"을 분리한다.
 * - 관광지: 한국관광공사/지자체 관광 데이터
 * - 식당: 인허가·영업상태 데이터로 먼저 필터링한 뒤 노출
 */
export function createContentApi({ client = apiClient } = {}) {
  return {
    /** @param {import('./contracts').TourismSearchRequest} request */
    async searchTourismSpots(request, { signal } = {}) {
      return withMockFallback(
        () => client.request(API_ENDPOINTS.tourism.spots, { method: 'POST', body: request, signal }),
        async () => ({
          items: MOCK_PLACES.slice(0, request.limit ?? 8),
          isMock: true,
          sourceLabel: API_SOURCE_LABELS.mock,
        }),
      );
    },

    /**
     * 백엔드는 식품위생업 인허가/폐업 상태와 마지막 동기화 시간을 함께 반환해야 한다.
     * 프런트는 eligible=true인 식당만 추천 목록에 섞는다.
     */
    async checkRestaurantEligibility({ placeId, name, address }, { signal } = {}) {
      return withMockFallback(
        () => client.request(API_ENDPOINTS.tourism.restaurantEligibility, {
          method: 'POST',
          body: { placeId, name, address },
          signal,
        }),
        async () => ({
          placeId: placeId ?? `mock-${name ?? 'restaurant'}`,
          eligible: false,
          businessStatus: 'UNKNOWN',
          reasons: ['인허가 데이터 API 연결 전에는 식당 추천을 확정하지 않습니다.'],
          isMock: true,
          sourceLabel: API_SOURCE_LABELS.mock,
        }),
      );
    },

    /** 유효 사업장만 반환하도록 백엔드 필터가 먼저 적용되는 검색 API. */
    async searchEligibleRestaurants(request, { signal } = {}) {
      return withMockFallback(
        () => client.request(API_ENDPOINTS.tourism.restaurants, {
          method: 'POST',
          body: request,
          signal,
        }),
        async () => ({ items: [], isMock: true, sourceLabel: API_SOURCE_LABELS.mock }),
      );
    },
  };
}

export const contentApi = createContentApi();
