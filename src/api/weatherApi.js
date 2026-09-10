import { apiClient } from "./apiClient";

/**
 * 캘린더 날씨 조회
 *
 * GET /api/weather/calendar
 */
export async function getCalendarWeather({
  destination,
  latitude,
  longitude,
  signal,
}) {
  return apiClient.request("/api/weather/calendar", {
    method: "GET",

    query: {
      destination,
      latitude,
      longitude,
    },

    signal,
  });
}