import { apiClient } from './apiClient.js';
import { API_ENDPOINTS } from './contracts.js';
import {
  booleanValue,
  finiteNumber,
  normalizeCostEstimate,
  normalizeGeoPoint,
  normalizeRouteResult,
} from './normalizers.js';

const minutesLabel = (value, fallback = '60분') => {
  if (typeof value === 'string' && /분|시간/.test(value)) return value;
  const minutes = finiteNumber(value);
  return minutes != null ? `${Math.max(0, Math.round(minutes))}분` : fallback;
};

const normalizePlanEvent = (event, dayIndex, eventIndex) => {
  if (Array.isArray(event)) {
    const metadata = event[6] || {};
    return [...event.slice(0, 6), {
      ...metadata,
      id: metadata.id || `api-day-${dayIndex + 1}-stop-${eventIndex + 1}`,
    }];
  }
  const metadata = event?.metadata || {};
  const point = normalizeGeoPoint(
    event?.point || event?.location?.point || event?.coordinate || event?.coordinates || event,
  );
  const rawTravelMinutes = event?.travelMinutes ?? event?.travel;
  const travelMinutes = event?.travelSeconds != null
    ? Math.ceil(finiteNumber(event.travelSeconds, 0) / 60)
    : Math.max(0, Math.round(finiteNumber(rawTravelMinutes, 0)));
  const explicitPerPersonPrice = event?.pricePerPerson
    ?? event?.price?.perPerson
    ?? metadata.pricePerPerson
    ?? (event?.priceScope === 'personal' ? event?.price : null);
  return [
    event?.time || event?.startTime || '09:00',
    event?.icon || '📍',
    event?.name || event?.title || '여행 일정',
    event?.detail || event?.description || '',
    minutesLabel(
      event?.durationMinutes
        ?? event?.duration
        ?? (event?.durationSeconds != null ? Math.ceil(finiteNumber(event.durationSeconds, 0) / 60) : null),
    ),
    travelMinutes,
    {
      ...metadata,
      id: event?.id || metadata.id || `api-day-${dayIndex + 1}-stop-${eventIndex + 1}`,
      isLocked: booleanValue(event?.isLocked ?? metadata.isLocked, false),
      isGeographical: booleanValue(event?.isGeographical ?? metadata.isGeographical, true),
      bookingUrl: event?.bookingUrl || metadata.bookingUrl || null,
      bookingProvider: event?.bookingProvider || event?.provider || metadata.bookingProvider || '',
      pricePerPerson: finiteNumber(explicitPerPersonPrice),
      latitude: point.latitude ?? finiteNumber(metadata.latitude),
      longitude: point.longitude ?? finiteNumber(metadata.longitude),
      address: event?.address || metadata.address || '',
      provider: event?.provider || metadata.provider || '',
      externalId: event?.externalId || metadata.externalId || '',
    },
  ];
};

const normalizeRoutes = (routes) => (Array.isArray(routes) ? routes : [])
  .map((route) => {
    try {
      return normalizeRouteResult(route, route?.provider ?? 'auto');
    } catch {
      return null;
    }
  })
  .filter(Boolean);

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
  const costEstimate = payload?.costEstimate || root?.costEstimate || payload?.costs || root?.costs || null;
  const travelers = root?.travelers ?? payload?.travelers ?? 1;
  return {
    id: root.id || payload?.planId || null,
    revisionId: root.revisionId || payload?.revisionId || null,
    dayPlans,
    costEstimate: costEstimate ? normalizeCostEstimate(costEstimate, travelers) : null,
    routes: normalizeRoutes(payload?.routes || root?.routes || []),
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

/** 장소 교체·드래그 재정렬 뒤 경로, 시간, 비용을 하나의 revision으로 다시 계산한다. */
export async function requestTripPlanRevision(planId, operation, { signal } = {}) {
  if (!planId) throw new TypeError('일정 revision을 만들 planId가 없습니다.');
  const response = await apiClient.request(API_ENDPOINTS.plans.recalculate(planId), {
    method: 'POST',
    body: operation,
    signal,
  });
  return normalizeTripPlanResponse(response);
}
