import { apiClient } from "./apiClient";


const ITEM_ICON = {
  DEPARTURE: "🚩",
  AIRPORT: "🛫",
  FLIGHT: "✈️",
  ACCOMMODATION: "🏨",
  ATTRACTION: "📍",
  RESTAURANT: "🍽️",
  CAFE: "☕",
};


const LOCKED_TYPES = new Set([
  "DEPARTURE",
  "AIRPORT",
  "FLIGHT",
  "ACCOMMODATION",
]);


/**
 * 백엔드에서 stayMinutes가 없는 경우
 * 현재 UI가 깨지지 않도록 사용하는 추정치.
 *
 * metadata.estimated.stayMinutes=true 로
 * 추정값임을 따로 남긴다.
 */
function estimateStayMinutes(type) {
  switch (type) {
    case "DEPARTURE":
      return 30;

    case "AIRPORT":
      return 90;

    case "FLIGHT":
      return null;

    case "ACCOMMODATION":
      return 45;

    case "RESTAURANT":
      return 60;

    case "CAFE":
      return 60;

    case "ATTRACTION":
      return 90;

    default:
      return 60;
  }
}


function dateTimeToTime(value) {
  if (!value) {
    return null;
  }

  const text =
    String(value);

  /*
   * 2026-09-16T09:30:00
   */
  const isoMatch =
    text.match(
      /T(\d{2}:\d{2})/,
    );

  if (isoMatch) {
    return isoMatch[1];
  }

  /*
   * 혹시 HH:mm 형태로 내려오는 경우
   */
  const timeMatch =
    text.match(
      /^(\d{2}:\d{2})/,
    );

  return timeMatch
    ? timeMatch[1]
    : null;
}


function dateTimeDurationMinutes(
  startAt,
  endAt,
) {
  if (
    !startAt ||
    !endAt
  ) {
    return null;
  }

  const start =
    new Date(startAt);

  const end =
    new Date(endAt);

  const minutes =
    Math.round(
      (
        end.getTime() -
        start.getTime()
      ) /
      60000,
    );

  if (
    !Number.isFinite(minutes) ||
    minutes < 0
  ) {
    return null;
  }

  return minutes;
}


/**
 * startAt도 없는 극단적인 경우
 * 시간표 UI가 겹치지 않게 임시 시각을 만든다.
 *
 * 실제 backend 시간이 있으면 절대 사용되지 않는다.
 */
function estimateStartTime(
  eventIndex,
) {
  const start =
    9 * 60;

  const minutes =
    Math.min(
      start +
        eventIndex *
          90,

      23 * 60 +
        30,
    );

  const hour =
    Math.floor(
      minutes /
        60,
    );

  const minute =
    minutes %
    60;

  return (
    `${String(hour).padStart(2, "0")}:` +
    `${String(minute).padStart(2, "0")}`
  );
}


function normalizePlanEvent(
  event,
  dayIndex,
  eventIndex,
) {
  /*
   * 혹시 나중에 backend가 이미
   * 프론트 tuple 형태를 반환할 경우도 호환.
   */
  if (Array.isArray(event)) {
  const metadata =
    event[6] || {};

  const baseId =
    metadata.id ||
    "api-stop";

  return [
    ...event.slice(0, 6),

    {
      ...metadata,

      id:
        `${baseId}-day-${dayIndex + 1}-stop-${eventIndex + 1}`,
    },
  ];
}


  const type =
    event?.type ||
    "ATTRACTION";


  /*
   * ==============================
   * 시간
   * ==============================
   */

  const backendStartTime =
    dateTimeToTime(
      event?.startAt,
    );

  const time =
    backendStartTime ||
    estimateStartTime(
      eventIndex,
    );


  /*
   * ==============================
   * 체류시간
   * ==============================
   */

  const backendStayMinutes =
    Number.isFinite(
      Number(
        event?.stayMinutes,
      ),
    )
      ? Number(
          event.stayMinutes,
        )
      : null;


  const dateTimeDuration =
    dateTimeDurationMinutes(
      event?.startAt,
      event?.endAt,
    );


  const estimatedStayMinutes =
    estimateStayMinutes(
      type,
    );


  const stayMinutes =
    backendStayMinutes ??
    dateTimeDuration ??
    estimatedStayMinutes;


  const durationLabel =
    stayMinutes != null
      ? `${Math.max(
          0,
          Math.round(
            stayMinutes,
          ),
        )}분`
      : "시간 미정";


  /*
   * ==============================
   * 이동시간
   *
   * 현재 backend에는 Routing 결과가 없음.
   *
   * 데이터상으로는 null을 유지하고
   * tuple에는 UI 안전성을 위해 0.
   * ==============================
   */

  const backendTravelMinutes =
    Number.isFinite(
      Number(
        event?.travelMinutes ??
        event?.moveMinutes,
      ),
    )
      ? Number(
          event?.travelMinutes ??
          event?.moveMinutes,
        )
      : null;


  const travelMinutesForUi =
    backendTravelMinutes ??
    0;


  /*
   * ==============================
   * 좌표
   * ==============================
   */

  const latitude =
    event?.latitude ==
    null
      ? null
      : Number(
          event.latitude,
        );


  const longitude =
    event?.longitude ==
    null
      ? null
      : Number(
          event.longitude,
        );


  const hasCoordinates =
    Number.isFinite(
      latitude,
    ) &&
    Number.isFinite(
      longitude,
    );


  /*
   * ==============================
   * ID
   * ==============================
   */

  const eventIdentity =
  event?.placeId ??
  event?.referenceId ??
  "unknown";

const eventOrder =
  event?.order ??
  eventIndex + 1;

const eventId =
  `${type}-${eventIdentity}-day-${dayIndex + 1}-stop-${eventOrder}`;


  /*
   * ==============================
   * 설명
   * ==============================
   */

  const detail =
    event?.reason ||
    event?.category ||
    (
      type ===
      "ACCOMMODATION"
        ? "선택한 숙소"
        : ""
    );


  return [
    /*
     * [0]
     * 현재 UI 표시 시간
     */
    time,


    /*
     * [1]
     * 현재 UI 아이콘
     */
    ITEM_ICON[type] ||
      "📍",


    /*
     * [2]
     * 장소명
     */
    event?.name ||
      "여행 일정",


    /*
     * [3]
     * 설명
     */
    detail,


    /*
     * [4]
     * 체류시간
     */
    durationLabel,


    /*
     * [5]
     * 이동시간
     *
     * UI 호환 때문에 0 사용.
     * 실제 데이터는 metadata.travelMinutes 참고.
     */
    travelMinutesForUi,


    /*
     * [6]
     * metadata
     */
    {
      id:
        eventId,

      type,

      order:
        event?.order ??
        eventIndex +
          1,


      placeId:
        event?.placeId ??
        null,

      referenceId:
        event?.referenceId ??
        null,


      category:
        event?.category ??
        null,


      latitude:
        hasCoordinates
          ? latitude
          : null,

      longitude:
        hasCoordinates
          ? longitude
          : null,


      startAt:
        event?.startAt ??
        null,

      endAt:
        event?.endAt ??
        null,


      stayMinutes:
        stayMinutes ??
        null,


      /*
       * Routing 미적용이면 null
       */
      travelMinutes:
        backendTravelMinutes,


      transportModeFromPrevious:
        event?.transportModeFromPrevious ??
        null,


      reason:
        event?.reason ??
        null,


      /*
       * 현재 TripPlan API는
       * 가격을 반환하지 않는다.
       *
       * null이면 기존 eventCost()가
       * 화면용 예상 비용을 계산한다.
       */
      pricePerPerson:
        null,


      bookingUrl:
        null,

      bookingProvider:
        "",


      isLocked:
        LOCKED_TYPES.has(
          type,
        ),

      isGeographical:
        hasCoordinates,


      /*
       * 실제값 / 추정값 구분.
       * 추후 Routing API 붙일 때 유용.
       */
      estimated: {
        startTime:
          backendStartTime ==
          null,

        stayMinutes:
          backendStayMinutes ==
            null &&
          dateTimeDuration ==
            null,

        travelMinutes:
          backendTravelMinutes ==
          null,

        price:
          true,
      },
    },
  ];
}


/**
 * 백엔드 TripPlanResponse
 *
 * ↓
 *
 * 현재 프론트 UI에서 사용 중인 dayPlans
 */
export function normalizeTripPlanResponse(
  payload,
) {
  const root =
    payload?.plan ||
    payload ||
    {};


  const sourceDays =
    Array.isArray(
      root?.days,
    )
      ? root.days
      : Array.isArray(
            root?.dayPlans,
          )
        ? root.dayPlans
        : [];


  const dayPlans =
    sourceDays.map(
      (
        day,
        dayIndex,
      ) => {
        /*
         * 이미 기존 UI 형식이면
         * 그대로 살려준다.
         */
        if (
          Array.isArray(day)
        ) {
          return [
            day[0],

            day[1],

            (
              day[2] ||
              []
            ).map(
              (
                event,
                eventIndex,
              ) =>
                normalizePlanEvent(
                  event,
                  dayIndex,
                  eventIndex,
                ),
            ),
          ];
        }


        const events =
          Array.isArray(
            day?.items,
          )
            ? day.items
            : Array.isArray(
                  day?.events,
                )
              ? day.events
              : [];


        const dayNumber =
          day?.dayNumber ??
          dayIndex +
            1;


        const date =
          day?.date ||
          "";


        return [
          /*
           * PlanFullscreen 제목
           */
          `${dayNumber}일차 여행`,


          /*
           * PlanFullscreen 설명
           */
          date
            ? `${date} · AI 추천 일정`
            : "AI 추천 일정",


          events.map(
            (
              event,
              eventIndex,
            ) =>
              normalizePlanEvent(
                event,
                dayIndex,
                eventIndex,
              ),
          ),
        ];
      },
    );


  return {
    /*
     * 기존 frontend가 id를 사용하므로
     * tripId를 id로도 제공.
     */
    id:
      root?.tripId ??
      root?.id ??
      null,

    tripId:
      root?.tripId ??
      null,


    /*
     * 현재 backend revision API 없음
     */
    revisionId:
      null,


    planner:
      root?.planner ||
      "",

    timeBasis:
      root?.timeBasis ||
      "",


    mainTransportMode:
      root?.mainTransportMode ??
      null,

    localTransportMode:
      root?.localTransportMode ??
      null,


    selectedAccommodation:
      root?.selectedAccommodation ??
      null,


    outboundFlight:
      root?.outboundFlight ??
      null,

    returnFlight:
      root?.returnFlight ??
      null,


    weather:
      Array.isArray(
        root?.weather,
      )
        ? root.weather
        : [],


    attractionCandidateCount:
      root?.attractionCandidateCount ??
      0,

    restaurantCandidateCount:
      root?.restaurantCandidateCount ??
      0,

    cafeCandidateCount:
      root?.cafeCandidateCount ??
      0,


    dayPlans,


    /*
     * 아직 backend TripPlan 응답에 없음.
     *
     * 빈 값으로 두면 기존 UI fallback을 사용.
     */
    routes:
      [],

    costEstimate:
      null,


    source:
      "trip-plan-v1",
  };
}


/**
 * 실제 AI 여행 일정 생성
 *
 * POST /api/trips/{tripId}/plan
 */
export async function requestTripPlan(
  tripId,
  {
    accommodationId,
    outboundFlight = null,
    returnFlight = null,
  },
  {
    signal,
  } = {},
) {
  if (!tripId) {
    throw new TypeError(
      "여행 일정 생성을 위한 tripId가 없습니다.",
    );
  }


  if (!accommodationId) {
    throw new TypeError(
      "선택한 숙소 ID가 없습니다.",
    );
  }


  const response =
    await apiClient.request(
      `/api/trips/${encodeURIComponent(
        tripId,
      )}/plan`,
      {
        method:
          "POST",

        body: {
          accommodationId,
          outboundFlight,
          returnFlight,
        },

        signal,

        /*
         * Bedrock 일정 생성은
         * 시간이 조금 더 걸릴 수 있으므로
         * 넉넉하게 설정.
         */
        timeoutMs:
          120000,
      },
    );


  return normalizeTripPlanResponse(
    response,
  );
}


/**
 * 아직 backend에 revision API 없음.
 *
 * useTripPlanner에서 source를 검사해
 * 이 함수를 호출하지 않도록 할 예정.
 */
export async function requestTripPlanRevision() {
  throw new Error(
    "현재 백엔드에는 일정 재계산 API가 없습니다.",
  );
}