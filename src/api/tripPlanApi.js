import { apiClient } from './apiClient.js';
import { API_ENDPOINTS } from './contracts.js';

const minutesLabel = (value, fallback = '60분') => {
  if (typeof value === 'string') return value;
  return Number.isFinite(Number(value)) ? `${Number(value)}분` : fallback;
};

const normalizePlanEvent = (event, dayIndex, eventIndex) => {
  if (Array.isArray(event)) {
    const metadata = event[6] || {};
    return [...event.slice(0, 6), {
      ...metadata,
      id: metadata.id || `api-day-${dayIndex + 1}-stop-${eventIndex + 1}`,
    }];
  }
  const point = event?.point || event?.location?.point || {};
  return [
    event?.time || event?.startTime || '09:00',
    event?.icon || '📍',
    event?.name || event?.title || '여행 일정',
    event?.detail || event?.description || '',
    minutesLabel(event?.duration || event?.durationMinutes),
    Number(event?.travel ?? event?.travelMinutes ?? 0),
    {
      ...(event?.metadata || {}),
      id: event?.id || event?.metadata?.id || `api-day-${dayIndex + 1}-stop-${eventIndex + 1}`,
      isLocked: Boolean(event?.isLocked ?? event?.metadata?.isLocked),
      isGeographical: event?.isGeographical ?? event?.metadata?.isGeographical ?? true,
      bookingUrl: event?.bookingUrl || event?.metadata?.bookingUrl || null,
      bookingProvider: event?.bookingProvider || event?.provider || event?.metadata?.bookingProvider || '',
      pricePerPerson: event?.pricePerPerson ?? event?.price ?? event?.metadata?.pricePerPerson ?? null,
      latitude: event?.latitude ?? point.latitude ?? event?.metadata?.latitude ?? null,
      longitude: event?.longitude ?? point.longitude ?? event?.metadata?.longitude ?? null,
      address: event?.address || event?.metadata?.address || '',
      provider: event?.provider || event?.metadata?.provider || '',
      externalId: event?.externalId || event?.metadata?.externalId || '',
    },
  ];
};

export function normalizeTripPlanResponse(payload) {
  const root = payload?.plan || payload || {};
  const sourceDays = root.dayPlans || root.days || root.itinerary?.days || [];
  const dayPlans = sourceDays.map((day, dayIndex) => {
    if (Array.isArray(day)) return [day[0], day[1], (day[2] || []).map((event, eventIndex) => normalizePlanEvent(event, dayIndex, eventIndex))];
    const events = day?.events || day?.stops || day?.items || [];
    return [
      day?.title || day?.name || `${dayIndex + 1}일차`,
      day?.description || day?.summary || '',
      events.map((event, eventIndex) => normalizePlanEvent(event, dayIndex, eventIndex)),
    ];
  });
  return {
    id: root.id || payload?.planId || null,
    dayPlans,
    costEstimate: payload?.costEstimate || root?.costEstimate || payload?.costs || root?.costs || null,
    routes: payload?.routes || root?.routes || [],
    source: payload?.source || root?.source || 'backend',
  };
}

/**
 * 일정 생성 BFF 호출.
 * axios를 별도로 쓰지 않고 다른 API 어댑터와 같은 인증·오류 처리 규칙을 사용한다.
 * 현재 화면은 VITE_USE_MOCK=false일 때만 이 함수를 호출한다.
 */
export async function requestTripPlan(payload, { signal } = {}) {
  const response = await apiClient.request(API_ENDPOINTS.plans.generate, {
    method: 'POST',
    body: payload,
    signal,
  });
  return normalizeTripPlanResponse(response);
}
