import { useState } from "react";
import { Maximize2, Minimize2, Minus, Plus } from "lucide-react";
import { locationLabel } from "../../data/mockData";

function RouteMap({ activeDay, dayPlans, destinationLocation, originLocation, routeResults = [], compact = false, hideHeader = false }) {
  const [expanded, setExpanded] = useState(false);
  const [zoom, setZoom] = useState(11);
  const selectedDay = dayPlans[activeDay] || dayPlans[0];
  const destinationContext = locationLabel(destinationLocation, "대한민국");
  const originContext = locationLabel(originLocation, "출발지");
  const providerRoute = routeResults.find((item) => item.dayIndex === activeDay) ?? routeResults[activeDay];
  const route = {
    label: selectedDay?.[0] || `${destinationContext} 여행 동선`,
    stops: (selectedDay?.[2] || [])
      .filter((event) => event[6]?.isGeographical !== false && !/체크인|체크아웃|준비|수령|반납|짐 정리|탑승|귀가|오는 편|이동/.test(event[2] || ""))
      .map(([, , name, , , , metadata = {}]) => ({
        name: name?.trim(),
        latitude: metadata.latitude ?? metadata.point?.latitude,
        longitude: metadata.longitude ?? metadata.point?.longitude,
      }))
      .filter((stop) => Boolean(stop.name))
      .slice(0, 6),
  };
  const searchStops = (route.stops.length ? route.stops : [{ name: destinationContext }]).map(
    (stop) =>
      encodeURIComponent(
        Number.isFinite(stop.latitude) && Number.isFinite(stop.longitude)
          ? `${stop.latitude},${stop.longitude}`
          : `${stop.name}, ${destinationLocation?.apiSearchKeyword || destinationContext}`,
      ),
  );
  const mapDestinations = searchStops.length > 1 ? searchStops.slice(1) : searchStops;
  const mapUrl = `https://www.google.com/maps?output=embed&f=d&z=${zoom}&saddr=${searchStops[0]}&daddr=${mapDestinations.join("+to:")}`;
  const openMapUrl = providerRoute?.deepLink || `https://www.google.com/maps/dir/${searchStops.join("/")}`;

  return (
    <section
      className={`full-route-map${compact ? " mobile-route-map" : ""}`}
      aria-label={`DAY ${activeDay + 1} 지도`}
    >
      {!hideHeader && <header>
        <div>
          <span>DAY {activeDay + 1} · 실제 장소 기반 동선</span>
          <b>{route.label}</b>
        </div>
        <a href={openMapUrl} target="_blank" rel="noreferrer">
          전체 지도 ↗
        </a>
      </header>}
      <div className="route-map-frame">
        <iframe
          src={mapUrl}
          title={`DAY ${activeDay + 1} ${destinationContext} 동선 지도`}
          loading="lazy"
        />
        <b>DAY {activeDay + 1} ROUTE</b>
        <div className="route-stop-list">
          {route.stops.map((stop, index) => (
            <span key={`${stop.name}-${index}`}>
              <i>{index + 1}</i>
              {stop.name}
            </span>
          ))}
        </div>
        <small className="route-map-context">
          {originContext} → {destinationContext} · 선택한 장소 기준
        </small>
        {compact && <button type="button" className="map-expand-trigger" onClick={() => setExpanded(true)}><Maximize2 size={15} /> 전체 화면으로 경로 보기</button>}
      </div>
      {compact && expanded && (
        <div className="mobile-map-expanded" role="dialog" aria-modal="true" aria-label={`DAY ${activeDay + 1} 전체 경로 지도`}>
          <header><span><small>DAY {activeDay + 1} ROUTE</small><b>{route.label}</b></span><button type="button" onClick={() => setExpanded(false)} aria-label="전체 지도 닫기"><Minimize2 size={16} /><span>지도 닫기</span></button></header>
          <div className="mobile-expanded-map-canvas">
            <iframe src={mapUrl} title={`DAY ${activeDay + 1} 전체 화면 경로 지도`} />
            <div className="map-zoom-controls" aria-label="지도 확대 축소">
              <button type="button" onClick={() => setZoom((value) => Math.min(18, value + 1))} aria-label="지도 확대"><Plus size={18} /></button>
              <button type="button" onClick={() => setZoom((value) => Math.max(7, value - 1))} aria-label="지도 축소"><Minus size={18} /></button>
            </div>
          </div>
          <div className="mobile-map-stop-sheet">
            <b>오늘의 이동 순서</b>
            {route.stops.map((stop, index) => <span key={`${stop.name}-expanded-${index}`}><i>{index + 1}</i>{stop.name}</span>)}
            <a href={openMapUrl} target="_blank" rel="noreferrer">Google 지도에서 길찾기 ↗</a>
          </div>
        </div>
      )}
    </section>
  );
}

export default RouteMap;
