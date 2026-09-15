import { apiClient } from "./apiClient";

/**
 * 여행 생성
 *
 * POST /api/trips
 *
 * 메인 화면에서 사용자가 확정한
 * 숙소 + 왕복 항공편까지 Trip과 함께 저장한다.
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

  accommodationId,
  outboundFlight = null,
  returnFlight = null,

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

      accommodationId,
      outboundFlight,
      returnFlight,
    },

    signal,

    timeoutMs: 15000,
  });
}