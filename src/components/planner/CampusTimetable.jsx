import { durationToMinutes, timeToMinutes } from "../../data/mockData";

function CampusTimetable({ activeDay = 0, compact = false, dates, dayPlans }) {
  const hours = Array.from({ length: 16 }, (_, index) => index + 8);
  const visibleDates = compact ? [dates[activeDay]].filter(Boolean) : dates;
  const visiblePlans = compact ? [dayPlans[activeDay]].filter(Boolean) : dayPlans;
  return (
    <div className={`campus-timetable${compact ? " mobile-timetable" : ""}`} aria-label={compact ? `DAY ${activeDay + 1} 시간표` : `${dates.length}일 통합 시간표`}>
      <div className="timetable-top">
        <span>TIME</span>
        {visibleDates.map((date, index) => (
          <b key={date}>
            DAY {compact ? activeDay + 1 : index + 1}
            <small>{date.slice(5).replace("-", ".")}</small>
          </b>
        ))}
      </div>
      <div className="timetable-content">
        <div className="timetable-hours">
          {hours.map((hour) => (
            <span key={hour}>{String(hour).padStart(2, "0")}:00</span>
          ))}
        </div>
        {visiblePlans.map((day, dayIndex) => (
          <div className="timetable-day" key={day[0]}>
            {hours.map((hour) => (
              <i key={hour} />
            ))}
            {day[2].map(([time, icon, name, detail, duration]) => {
              const top = Math.max(0, timeToMinutes(time) - 8 * 60);
              const height = Math.max(46, durationToMinutes(duration));
              return (
                <article
                  key={`${dayIndex}-${time}-${name}`}
                  style={{ top: `${top}px`, height: `${height}px` }}
                >
                  <span>{icon}</span>
                  <b>{name}</b>
                  <small>
                    {time} · {duration}
                  </small>
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
