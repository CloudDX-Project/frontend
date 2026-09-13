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
    },

    signal,

    timeoutMs: 15000,
  });
}