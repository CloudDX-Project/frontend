import { koreanRegions } from "../../data/locationCatalog";
import KoreaRegionMap from "../KoreaRegionMap";
import RegionDetailMap from "../RegionDetailMap";

export default function RegionLocationMenu({
  activeRegionId,
  customValue,
  kind = "departure",
  onBack,
  onChooseCustom,
  onChooseDistrict,
  onChooseRegion,
  onCustomValueChange,
  onUseCurrentLocation,
}) {
  const activeRegion = koreanRegions.find((region) => region.id === activeRegionId);
  const isDeparture = kind === "departure";
  const title = isDeparture ? "출발지" : "도착지";
  const question = isDeparture ? "어디서 출발하시나요?" : "어디로 여행을 떠나시나요?";
  const customPlaceholder = isDeparture
    ? "예: 경기도 파주시"
    : "예: 강원특별자치도 강릉시";

  return (
    <section className="route-location-menu korea-location-menu" aria-label={`${title} 선택`}>
      {activeRegion ? (
        <>
          <header className="location-menu-heading detail-heading">
            <button type="button" onClick={onBack}>← 권역 다시 고르기</button>
            <div>
              <small>{title} 세부 선택</small>
              <b>{activeRegion.name}에서 {isDeparture ? "어디서 출발하시나요?" : "어디를 방문하시나요?"}</b>
            </div>
          </header>
          <RegionDetailMap
            region={activeRegion}
            selectDistrict={(district) => onChooseDistrict(activeRegion, district)}
            ariaLabel={`${activeRegion.name} ${title} 세부 시군구 선택 지도`}
          />
        </>
      ) : (
        <>
          <header className="location-menu-heading korea-map-heading">
            <div>
              <small>{title} 권역 지도</small>
              <b>{question}</b>
            </div>
            <span>대한민국 17개 시·도 → 세부 지역 순서로 선택</span>
          </header>
          {isDeparture && onUseCurrentLocation ? (
            <button type="button" className="current-location-button" onClick={onUseCurrentLocation}>
              <span aria-hidden="true">◎</span>
              <span>
                <b>현재 내 위치로 출발지 설정</b>
                <small>GPS 좌표를 바로 저장해 이동 거리 계산에 사용해요.</small>
              </span>
              <i aria-hidden="true">→</i>
            </button>
          ) : null}
          <KoreaRegionMap
            regions={koreanRegions}
            selectedId={activeRegionId}
            onSelect={(region) => onChooseRegion(region.id)}
            ariaLabel={`대한민국 ${title} 권역 선택 지도`}
          />
        </>
      )}
      <label className="departure-custom location-custom-input">
        <span>원하는 {title}를 직접 입력할 수도 있어요.</span>
        <div>
          <input
            value={customValue}
            onChange={(event) => onCustomValueChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                onChooseCustom();
              }
            }}
            placeholder={customPlaceholder}
          />
          <button type="button" onClick={onChooseCustom}>직접 선택</button>
        </div>
      </label>
    </section>
  );
}
