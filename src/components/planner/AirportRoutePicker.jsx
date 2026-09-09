import { Check, ChevronDown, MapPin, Plane, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import "./airport-route-picker.css";

const REGION_ORDER = ["수도권", "충청권", "강원권", "호남권", "경상권"];
const JEJU_AIRPORT = {
  code: "CJU",
  city: "제주",
  name: "제주국제공항",
  shortName: "제주",
  region: "제주권",
};

function AirportCard({ airport, label, onClick, expanded }) {
  return (
    <button
      type="button"
      className="flight-route-airport"
      aria-haspopup="dialog"
      aria-expanded={expanded}
      onClick={onClick}
    >
      <span>{label}</span>
      <div>
        <strong>{airport.code}</strong>
        <b>{airport.city}</b>
        <small>{airport.name}</small>
        <ChevronDown size={16} strokeWidth={1.8} aria-hidden="true" />
      </div>
    </button>
  );
}

export default function AirportRoutePicker({ airports, originAirport, leg, onOriginChange }) {
  const [openSide, setOpenSide] = useState("");
  const rootRef = useRef(null);
  const isReturn = leg === "return";
  const selectableSide = isReturn ? "arrival" : "departure";
  const fixedSide = isReturn ? "departure" : "arrival";
  const departureAirport = isReturn ? JEJU_AIRPORT : originAirport;
  const arrivalAirport = isReturn ? originAirport : JEJU_AIRPORT;

  const groups = useMemo(() => REGION_ORDER.map((region) => ({
    region,
    airports: airports.filter((airport) => airport.region === region),
  })).filter((group) => group.airports.length), [airports]);

  useEffect(() => {
    if (!openSide) return undefined;
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpenSide("");
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpenSide("");
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openSide]);

  const chooseAirport = (airport) => {
    onOriginChange(airport.code);
    setOpenSide("");
  };

  return (
    <div className="flight-airport-picker" ref={rootRef}>
      <div className="flight-route-selector">
        <AirportCard
          airport={departureAirport}
          label="출발 공항"
          expanded={openSide === "departure"}
          onClick={() => setOpenSide((current) => current === "departure" ? "" : "departure")}
        />
        <span className="flight-route-direction" aria-hidden="true">
          <Plane size={16} strokeWidth={1.8} />
        </span>
        <AirportCard
          airport={arrivalAirport}
          label="도착 공항"
          expanded={openSide === "arrival"}
          onClick={() => setOpenSide((current) => current === "arrival" ? "" : "arrival")}
        />
      </div>

      {openSide && (
        <section className="airport-popover" role="dialog" aria-label="공항 선택">
          <header>
            <div>
              <span><MapPin size={14} aria-hidden="true" /> AIRPORT SELECT</span>
              <b>{openSide === selectableSide ? `${isReturn ? "도착" : "출발"} 공항을 선택하세요` : "여행지 공항"}</b>
              <small>
                {openSide === selectableSide
                  ? "지역별 공항을 비교해 가장 편한 출발지를 선택할 수 있어요."
                  : "선택한 제주 여행지에 맞춰 제주국제공항으로 연결돼요."}
              </small>
            </div>
            <button type="button" onClick={() => setOpenSide("")} aria-label="공항 선택 닫기">
              <X size={17} />
            </button>
          </header>

          {openSide === fixedSide ? (
            <div className="airport-region-group is-fixed">
              <p><span>제주권</span><small>JEJU</small></p>
              <button type="button" className="airport-option selected" onClick={() => setOpenSide("")}>
                <strong>CJU</strong>
                <span><b>제주</b><small>제주국제공항</small></span>
                <Check size={16} aria-hidden="true" />
              </button>
            </div>
          ) : (
            <div className="airport-region-list">
              {groups.map((group) => (
                <div className="airport-region-group" key={group.region}>
                  <p><span>{group.region}</span><small>{group.airports.length}개 공항</small></p>
                  <div>
                    {group.airports.map((airport) => (
                      <button
                        type="button"
                        className={`airport-option ${airport.code === originAirport.code ? "selected" : ""}`}
                        onClick={() => chooseAirport(airport)}
                        key={airport.code}
                      >
                        <strong>{airport.code}</strong>
                        <span><b>{airport.shortName}</b><small>{airport.name}</small></span>
                        {airport.code === originAirport.code && <Check size={16} aria-hidden="true" />}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
