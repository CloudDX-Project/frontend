import { apiClient } from "./apiClient";

/**
 * 여행 기본 정보 생성
 *
 * POST /api/trips
 */
export async function createTrip({
  departure,
  departureLatitude,
  departureLongitude,

  destination,
  destinationLatitude,
  destinationLongitude,

  startDate,
  startTime,

  endDate,
  endTime,

  peopleCount,

  mainTransportMode,
  localTransportMode,

  budget,
  mealBudgetPerPersonPerDay,

  pace,
  preferences,
  foodPreferences,

  /*
   * ========================================
   * 선택 숙소
   * ========================================
   */
  accommodationId,

  /*
   * ========================================
   * 선택 항공편
   *
   * AIR가 아니면 null
   * ========================================
   */
  outboundFlight = null,
  returnFlight = null,

  /*
   * ========================================
   * 선택 렌터카
   *
   * RENTAL_CAR가 아니면 null
   * ========================================
   */
  rental = null,

  signal,
}) {
  return apiClient.request("/api/trips", {
    method: "POST",

    body: {
      departure,
      departureLatitude,
      departureLongitude,

      destination,
      destinationLatitude,
      destinationLongitude,

      startDate,
      startTime,

      endDate,
      endTime,

      peopleCount,

      mainTransportMode,
      localTransportMode,

      budget,
      mealBudgetPerPersonPerDay,

      pace,
      preferences,
      foodPreferences,

      /*
       * ========================================
       * 백엔드 TripCreateRequest 추가 필드
       * ========================================
       */
      accommodationId,

      outboundFlight,
      returnFlight,

      rental,
    },

    signal,

    timeoutMs: 15000,
  });
}