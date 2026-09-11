import { apiClient } from "./apiClient";

export async function searchFlights({
  departure,
  destination,
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