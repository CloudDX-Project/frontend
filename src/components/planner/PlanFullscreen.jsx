import { useState } from "react";
import { dateLabel, locationLabel, timeLabel } from "../../data/mockData";
import TransitionIcon from "../common/TransitionIcon";
import BrandPolygon from "../icons/BrandPolygon";
import CampusTimetable from "./CampusTimetable";
import RouteMap from "./RouteMap";

function PlanFullscreen({
  activeDay,
  costDetails,
  dates,
  dayPlans,
  destinationLocation,
  endTime,
  eventCost,
  money,
  onChangeStop,
  onOpenStay,
  onOpenStayComparison,
  placeOptions,
  planRevision,
  originLocation,
  selectedFlight,
  selectedRental,
  selectedStay,
  setActiveDay,
  setPlanRevision,
  setPlanViewOpen,
  startTime,
  stayChange,
  total,
  transport,
  travelers,
}) {
  const day = dayPlans[activeDay];
  const [costExpanded, setCostExpanded] = useState(false);
  const [scheduleView, setScheduleView] = useState("timeline");
  const [placePicker, setPlacePicker] = useState(null);
  const [customPlace, setCustomPlace] = useState("");
  const [routeRecalculation, setRouteRecalculation] = useState(null);
  const [routeResult, setRouteResult] = useState(null);
  const [utilityMessage, setUtilityMessage] = useState("");
  const destinationName = locationLabel(destinationLocation);
  const originName = locationLabel(originLocation, "출발지");
  const destinationRegion =
    destinationLocation?.region || destinationLocation?.countryCode || "TRAVEL";
  const nightCount = Math.max(0, dates.length - 1);
  const tripTitle = (
    <>
      {destinationName}에서 완성하는
      <br />
      나만의 여행
    </>
  );
  const showUtilityMessage = (message) => {
    setUtilityMessage(message);
    window.setTimeout(() => setUtilityMessage(""), 2600);
  };
  const savePlan = () => {
    try {
      window.localStorage.setItem(
        "eolmagil-saved-itinerary",
        JSON.stringify({
          title: dayPlans[0]?.[0] || `${destinationName} 여행`,
          dates,
          travelers,
          total,
          savedAt: new Date().toISOString(),
        }),
      );
      showUtilityMessage("이 일정이 이 기기에 저장되었습니다.");
    } catch {
      showUtilityMessage("이 브라우저에서는 일정 저장을 완료할 수 없어요.");
    }
  };
  const sharePlan = async () => {
    const text = `얼마길 여행 일정 · ${dayPlans[0]?.[0] || `${destinationName} 여행`}\n1인 예상 경비 ${money(total)}원 · ${travelers}명 여행`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "얼마길 여행 일정",
          text,
          url: window.location.href,
        });
        showUtilityMessage("공유 창을 열었습니다.");
        return;
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
        showUtilityMessage("일정 링크를 클립보드에 복사했습니다.");
        return;
      }
      showUtilityMessage("이 브라우저에서는 공유 기능을 지원하지 않아요.");
    } catch (error) {
      if (error?.name !== "AbortError")
        showUtilityMessage("공유를 완료하지 못했어요. 다시 시도해 주세요.");
    }
  };
  const applyPlaceChange = (place) => {
    if (!placePicker) return;
    const beforeName = placePicker.name;
    const beforeCost = eventCost(beforeName);
    const afterCost = eventCost(place.name);
    const delta = afterCost - beforeCost;
    const update = {
      from: beforeName,
      to: place.name,
      travel: place.travel,
      delta,
    };
    setPlacePicker(null);
    setRouteRecalculation(update);
    window.setTimeout(() => {
      onChangeStop(activeDay, placePicker.index, place);
      setRouteRecalculation(null);
      setRouteResult(update);
    }, 1900);
  };
  return (
    <section
      className={`plan-fullscreen ${stayChange ? "plan-rebuilt" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${destinationName} 전체 여행 일정`}
    >
      <header className="plan-fullscreen-head">
        <a
          className="brand"
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            setPlanViewOpen(false);
          }}
          aria-label="일정 닫기"
        >
          <BrandPolygon />
          <strong>얼마길</strong>
        </a>
        <div>
          <span>AI TRIP PLAN · REV {planRevision}</span>
          <b>
            {destinationName} {nightCount}박 {dates.length}일 상세 일정
          </b>
        </div>
        <div className="plan-header-actions">
          <button type="button" onClick={savePlan}>
            저장
          </button>
          <button type="button" onClick={sharePlan}>
            공유
          </button>
          <button type="button" onClick={() => setPlanViewOpen(false)}>
            ← 메인으로 돌아가기
          </button>
        </div>
      </header>
      {utilityMessage && (
        <div className="plan-utility-toast" role="status">
          {utilityMessage}
        </div>
      )}
      <div className="plan-fullscreen-body">
        <aside className="full-trip-aside">
          <p>{destinationRegion}</p>
          <h2>{tripTitle}</h2>
          <span>
            {originName} → {destinationName} · {dateLabel(dates[0])} {timeLabel(startTime)} —{" "}
            {dateLabel(dates[dates.length - 1])} {timeLabel(endTime)}
          </span>
          <div className="full-booking-list">
            <b>
              ✈{" "}
              {selectedFlight
                ? `${selectedFlight.airline} 왕복`
                : `${transport || "교통수단"} 미선택`}
            </b>
            <b>
              ⌂{" "}
              {selectedStay
                ? `${selectedStay.name} · ${nightCount}박`
                : "숙소 미선택"}
            </b>
            <b>
              🚗{" "}
              {selectedRental
                ? `${selectedRental.company} · 48시간`
                : "현지 이동 미선택"}
            </b>
          </div>
          <div className="full-day-tabs">
            {dates.map((date, index) => (
              <button
                type="button"
                key={date}
                className={activeDay === index ? "active" : ""}
                onClick={() => {
                  setActiveDay(index);
                  setScheduleView("timeline");
                }}
              >
                <small>DAY {index + 1}</small>
                <b>{date.slice(5).replace("-", ".")}</b>
                <span>{dayPlans[index][0]}</span>
              </button>
            ))}
          </div>
        </aside>
        <main className="full-timetable">
          <div className="full-day-title">
            <span>
              DAY {activeDay + 1} ·{" "}
              {dates[activeDay]?.slice(5).replace("-", ".")}
            </span>
            <h1>{scheduleView === "timeline" ? day[0] : "3일 여행 시간표"}</h1>
            <p>
              {scheduleView === "timeline"
                ? day[1]
                : "세 날짜의 이동·식사·관광·휴식 시간을 한눈에 비교해 보세요."}
            </p>
            <div>
              <button
                type="button"
                className={
                  scheduleView === "timeline" ? "view-tab active" : "view-tab"
                }
                onClick={() => setScheduleView("timeline")}
              >
                일정
              </button>
              <button
                type="button"
                className={
                  scheduleView === "calendar" ? "view-tab active" : "view-tab"
                }
                onClick={() => setScheduleView("calendar")}
              >
                시간표
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlanRevision((revision) => revision + 1);
                  setActiveDay(0);
                  setScheduleView("timeline");
                }}
              >
                ✦ 현재 선택으로 일정 다시 설계
              </button>
              {stayChange && (
                <button
                  type="button"
                  className="stay-comparison-button"
                  onClick={onOpenStayComparison}
                >
                  숙소 변경 내용 보기
                </button>
              )}
              <div className="stay-question">
                <b>혹시 숙소를 변경하고 싶으신가요?</b>
                <button type="button" className="subtle" onClick={onOpenStay}>
                  AI에게 숙소 다시 추천받기
                </button>
              </div>
            </div>
          </div>
          {scheduleView === "timeline" ? (
            <div className="full-timeline">
              {day[2].map(([time, icon, name, detail, stay], index) => {
                const price = eventCost(name);
                const approximate = /저녁|점심|카페|고등어|시장|오설록/.test(
                  name,
                );
                const isRentalStop = /렌터카/.test(name);
                const costLabel = isRentalStop
                  ? selectedRental
                    ? `렌터카 총 ${money(selectedRental.price)}원`
                    : ""
                  : price
                    ? `${approximate ? "약 " : ""}1인 ${money(price)}원`
                    : "";
                return (
                  <article
                    className="itinerary-stop"
                    key={`${time}-${name}`}
                    role="button"
                    tabIndex="0"
                    onClick={() => setPlacePicker({ index, name })}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setPlacePicker({ index, name });
                      }
                    }}
                  >
                    <time>{time}</time>
                    <span>{icon}</span>
                    <div>
                      <small>
                        STOP {String(index + 1).padStart(2, "0")} · {stay}
                      </small>
                      <b>
                        {name}
                        {costLabel && (
                          <em className="stop-price">{costLabel}</em>
                        )}
                      </b>
                      <p>{detail}</p>
                      <button
                        type="button"
                        className="stop-change"
                        onClick={(event) => {
                          event.stopPropagation();
                          setPlacePicker({ index, name });
                        }}
                      >
                        장소 변경
                      </button>
                    </div>
                    <i>
                      {index === 0
                        ? "출발"
                        : index === day[2].length - 1
                          ? "마무리"
                          : "이동 포함"}
                    </i>
                  </article>
                );
              })}
            </div>
          ) : (
            <CampusTimetable dates={dates} dayPlans={dayPlans} />
          )}
        </main>
        <aside className="full-budget">
          <RouteMap
            activeDay={activeDay}
            dayPlans={dayPlans}
            destinationLocation={destinationLocation}
            originLocation={originLocation}
          />
          <section className="full-budget-summary">
            <div className="full-budget-top">
              <span>선택한 예약 기준 · 1인 예상 경비</span>
              <h2>1인 {money(total)}원</h2>
              <p>
                총 {travelers}명 여행비 {money(total * (travelers || 1))}원
              </p>
            </div>
            <button
              type="button"
              className="full-cost-toggle"
              aria-expanded={costExpanded}
              onClick={() => setCostExpanded((current) => !current)}
            >
              <span>{costExpanded ? "상세 경비 접기" : "상세 경비 보기"}</span>
              <b>{costExpanded ? "⌃" : "⌄"}</b>
            </button>
            {costExpanded && (
              <div className="full-cost-groups">
                {costDetails.map((group) => (
                  <section key={group.group}>
                    <h3>{group.group}</h3>
                    {group.rows.map(([name, value, note]) => {
                      const approximate =
                        /고등어|카페|점심|저녁|시장|오설록|새별|카멜리아|성산/.test(
                          name,
                        );
                      return (
                        <p key={name}>
                          <span>
                            <b>{name}</b>
                            <small>{note}</small>
                          </span>
                          <strong>
                            {approximate ? "약 " : ""}1인 {money(value)}원
                          </strong>
                        </p>
                      );
                    })}
                  </section>
                ))}
                <p className="cost-uncertainty">
                  ※ 식비·간식·체험비는 실제 주문, 인원, 현장 요금에 따라 약간의
                  차이가 날 수 있어요.
                </p>
              </div>
            )}
          </section>
          <div className="full-budget-note">
            <b>✦ AI 일정 반영</b>
            <span>
              숙소·교통편을 바꾸면 객실 수, 이동 시간, 세부 경비와 추천 동선을
              다시 계산합니다.
            </span>
          </div>
        </aside>
      </div>
      {placePicker && (
        <div className="stop-picker-backdrop" role="presentation">
          <section
            className="stop-picker-modal"
            role="dialog"
            aria-modal="true"
            aria-label="장소 변경"
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setPlacePicker(null)}
              aria-label="장소 변경 닫기"
            >
              ×
            </button>
            <p>✦ 얼마길 AI · ROUTE EDIT</p>
            <h3>
              {placePicker.name} 대신
              <br />
              어디로 가볼까요?
            </h3>
            <span>
              장소를 고르면 이후 이동 시간, 지도 경로와 1인 예상 경비를 함께
              다시 계산해요.
            </span>
            <div className="route-place-options">
              {placeOptions.map((place) => (
                <button
                  type="button"
                  key={place.name}
                  onClick={() => applyPlaceChange(place)}
                >
                  {place.image ? (
                    <img src={place.image} alt={`${place.name} 관광지 사진`} />
                  ) : (
                    <div className="route-place-photo-fallback" aria-hidden="true">
                      {place.icon}
                    </div>
                  )}
                  <span>
                    <i aria-hidden="true">{place.icon}</i>
                    <b>{place.name}</b>
                    <small>
                      {place.duration} · 이동 {place.travel}분
                    </small>
                  </span>
                </button>
              ))}
            </div>
            <form
              className="route-custom-prompt"
              onSubmit={(event) => {
                event.preventDefault();
                if (!customPlace.trim()) return;
                applyPlaceChange({
                  icon: "✦",
                  name: customPlace.trim(),
                  detail:
                    "사용자가 직접 요청한 장소를 중심으로 이동 시간과 예상 경비를 다시 계산해요.",
                  duration: "90분",
                  travel: 35,
                });
                setCustomPlace("");
              }}
            >
              <label htmlFor="custom-place">혹시 어디로 가고 싶으신가요?</label>
              <div>
                <input
                  id="custom-place"
                  value={customPlace}
                  onChange={(event) => setCustomPlace(event.target.value)}
                  placeholder="가고 싶은 장소를 입력하세요"
                />
                <button type="submit">동선에 반영</button>
              </div>
            </form>
          </section>
        </div>
      )}
      {routeRecalculation && (
        <div
          className="route-recalculation-overlay"
          role="status"
          aria-live="polite"
        >
          <section>
            <TransitionIcon type="plan" />
            <p>얼마길 AI · ROUTE RECALCULATION</p>
            <h2>
              변경된 장소를 기점으로
              <br />
              경로와 비용을 재설정하고 있어요.
            </h2>
            <span>
              {routeRecalculation.from} → {routeRecalculation.to} 변경을 반영해
              이동 시간과 1인 예상 경비를 다시 계산합니다.
            </span>
            <div className="route-recalculation-dots">
              <i />
              <i />
              <i />
            </div>
          </section>
        </div>
      )}
      {routeResult && (
        <div className="route-result-backdrop" role="presentation">
          <section
            className="route-result-modal"
            role="dialog"
            aria-modal="true"
            aria-label="장소 변경 완료"
          >
            <TransitionIcon type="plan" />
            <p>✦ 얼마길 AI · ROUTE UPDATE COMPLETE</p>
            <h3>재설정이 완료되었습니다!</h3>
            <span>
              {routeResult.to}를 기준으로 다음 동선과 예상 경비를
              업데이트했어요.
            </span>
            <div>
              <p>
                <small>변경 장소</small>
                <del>{routeResult.from}</del>
                <b>→ {routeResult.to}</b>
              </p>
              <p>
                <small>이동 시간</small>
                <b>다음 장소까지 약 {routeResult.travel}분 반영</b>
              </p>
              <p>
                <small>1인 예상 경비</small>
                <b
                  className={
                    routeResult.delta > 0
                      ? "increase"
                      : routeResult.delta < 0
                        ? "decrease"
                        : ""
                  }
                >
                  {routeResult.delta > 0
                    ? `약 ${money(routeResult.delta)}원 증가`
                    : routeResult.delta < 0
                      ? `약 ${money(Math.abs(routeResult.delta))}원 절감`
                      : "변동 없음"}
                </b>
              </p>
            </div>
            <button type="button" onClick={() => setRouteResult(null)}>
              변경된 일정 확인하기 →
            </button>
          </section>
        </div>
      )}
    </section>
  );
}

export default PlanFullscreen;
