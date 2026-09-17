import { durationToMinutes, timeToMinutes } from "../../data/mockData";

function formatFlightClock(value) {
  const match = String(value || "").match(/T(\d{2}:\d{2})/);
  return match?.[1] || null;
}

function dateTimeToMinutes(value) {
  const clock = formatFlightClock(value);
  return clock ? timeToMinutes(clock) : null;
}

function CampusTimetable({ activeDay = 0, compact = false, dates, dayPlans }) {
  const visibleDates = compact ? [dates[activeDay]].filter(Boolean) : dates;
  const visiblePlans = compact ? [dayPlans[activeDay]].filter(Boolean) : dayPlans;

  const eventTimes = visiblePlans
    .flatMap((day) => day?.[2] || [])
    .map(([time, , , , , , metadata = {}]) => {
      const hasFlight = Boolean(metadata.flightLabel);
      const category = String(metadata.category || "").toUpperCase();
      const isArrivalAirport = category.includes("ARRIVAL_AIRPORT");

      if (hasFlight) {
        return dateTimeToMinutes(metadata.flightDepartureAt) ?? timeToMinutes(time);
      }

      if (isArrivalAirport) {
        return dateTimeToMinutes(metadata.startAt) ?? timeToMinutes(time);
      }

      // backend TripPlan의 startAt을 모든 카드의 최우선 시간 기준으로 사용한다.
      // tuple time은 mock/legacy fallback으로만 남긴다.
      return dateTimeToMinutes(metadata.startAt) ?? timeToMinutes(time);
    })
    .filter((minutes) => Number.isFinite(minutes));

  // 기존 08:00 고정 시작 때문에 06~07시 공항/항공 카드가 같은 위치에 겹쳤다.
  // 이른 일정이 있으면 실제 첫 일정 시각부터 시간표를 시작한다.
  const earliestMinutes = eventTimes.length ? Math.min(...eventTimes) : 8 * 60;
  const startHour = Math.max(0, Math.min(8, Math.floor(earliestMinutes / 60)));
  const endHour = 23;
  const hours = Array.from(
    { length: Math.max(1, endHour - startHour + 1) },
    (_, index) => startHour + index,
  );
  const timetableHeight = hours.length * 60;

  return (
    <div
      className={`campus-timetable${compact ? " mobile-timetable" : ""}`}
      aria-label={compact ? `DAY ${activeDay + 1} 시간표` : `${dates.length}일 통합 시간표`}
    >
      <div className="timetable-top">
        <span>TIME</span>
        {visibleDates.map((date, index) => (
          <b key={date}>
            DAY {compact ? activeDay + 1 : index + 1}
            <small>{date.slice(5).replace("-", ".")}</small>
          </b>
        ))}
      </div>
      <div className="timetable-content" style={{ minHeight: `${timetableHeight}px` }}>
        <div
          className="timetable-hours"
          style={{ gridTemplateRows: `repeat(${hours.length}, 60px)` }}
        >
          {hours.map((hour) => (
            <span key={hour}>{String(hour).padStart(2, "0")}:00</span>
          ))}
        </div>
        {visiblePlans.map((day, dayIndex) => (
          <div className="timetable-day" key={day[0]}>
            {hours.map((hour) => (
              <i key={hour} />
            ))}
            {day[2].map(([time, icon, name, detail, duration, travel, metadata = {}]) => {
              const flightStart = formatFlightClock(metadata.flightDepartureAt);
              const flightEnd = formatFlightClock(metadata.flightArrivalAt);
              const flightTime = flightStart && flightEnd ? `${flightStart} → ${flightEnd}` : null;
              const hasFlight = Boolean(metadata.flightLabel);
              const category = String(metadata.category || "").toUpperCase();
              const isAirport = String(metadata.type || "").toUpperCase() === "AIRPORT";
              const isArrivalAirport = category.includes("ARRIVAL_AIRPORT");

              // tuple의 time 값이 오래된 값이어도 항공/공항은 backend datetime을 우선한다.
              const displayMinutes = hasFlight
                ? dateTimeToMinutes(metadata.flightDepartureAt)
                  ?? dateTimeToMinutes(metadata.startAt)
                  ?? timeToMinutes(time)
                : dateTimeToMinutes(metadata.startAt)
                  ?? timeToMinutes(time);
              const top = Math.max(0, displayMinutes - startHour * 60);
              const displayClock = Number.isFinite(displayMinutes)
                ? `${String(Math.floor(displayMinutes / 60)).padStart(2, "0")}:${String(displayMinutes % 60).padStart(2, "0")}`
                : time;

              // 출발공항 + 항공편 카드는 실제 비행시간만큼 세로 길이를 사용한다.
              // 도착공항은 체류 일정이 아니라 도착 milestone이므로 짧은 카드로 고정한다.
              // 이렇게 해야 도착시각과 첫 관광지 시작시각이 가까워도 서로 덮지 않는다.
              const flightDurationMinutes = Number(metadata.flightDurationMinutes);
              const normalDurationMinutes = durationToMinutes(duration);

              const height = isArrivalAirport
                ? 24
                : hasFlight && Number.isFinite(flightDurationMinutes) && flightDurationMinutes > 0
                  ? Math.max(62, flightDurationMinutes)
                  : Math.max(46, normalDurationMinutes);

              const timingLabel = isArrivalAirport
                ? `${displayClock} · 도착`
                : `${displayClock} · ${duration}`;

              return (
                <article
                  key={`${dayIndex}-${time}-${name}-${metadata.id || "event"}`}
                  className={`${hasFlight ? "has-flight " : ""}${isAirport ? "is-airport " : ""}${isArrivalAirport ? "is-arrival-airport" : ""}`.trim() || undefined}
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    zIndex: hasFlight ? 4 : isArrivalAirport ? 3 : 1,
                  }}
                >
                  <span>{icon}</span>
                  <b>{name}</b>
                  {hasFlight && (
                    <em className="timetable-flight-label">
                      ✈ {metadata.flightLabel}
                    </em>
                  )}
                  <small>{hasFlight && flightTime ? flightTime : timingLabel}</small>
                </article>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CampusTimetable;
