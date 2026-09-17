import { apiClient } from "./apiClient.js";

export async function searchFlights({
  departure,
  destination,
  direction,
  startDate,
  startTime = "00:00",
  endDate,
  endTime = "23:59",
  peopleCount,
  signal,
}) {
  return apiClient.request("/api/flights/search", {
    method: "POST",

    body: {
      departure,
      destination,
      direction,
      startDate,
      startTime,
      endDate,
      endTime,
      peopleCount,
    },

    signal,
    timeoutMs: 60000,
  });
}