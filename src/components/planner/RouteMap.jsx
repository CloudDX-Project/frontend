import { locationLabel } from "../../data/mockData";

function RouteMap({ activeDay, dayPlans, destinationLocation, originLocation }) {
  const selectedDay = dayPlans[activeDay] || dayPlans[0];
  const destinationContext = locationLabel(destinationLocation, "대한민국");
  const originContext = locationLabel(originLocation, "출발지");
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
  const mapUrl = `https://www.google.com/maps?output=embed&f=d&saddr=${searchStops[0]}&daddr=${mapDestinations.join("+to:")}`;
  const openMapUrl = `https://www.google.com/maps/dir/${searchStops.join("/")}`;

  return (
    <section
      className="full-route-map"
      aria-label={`DAY ${activeDay + 1} 지도`}
    >
      <header>
        <div>
          <span>DAY {activeDay + 1} · 실제 장소 기반 동선</span>
          <b>{route.label}</b>
        </div>
        <a href={openMapUrl} target="_blank" rel="noreferrer">
          전체 지도 ↗
        </a>
      </header>
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
      </div>
    </section>
  );
}

export default RouteMap;
