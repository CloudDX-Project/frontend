import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Compass,
  Globe2,
  MapPinned,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import KoreaRegionMap from "./KoreaRegionMap";
import "./destination-explorer.css";

const TAB = {
  POPULAR: "popular",
  REGIONS: "regions",
  OVERSEAS: "overseas",
};

const normalizedText = (value) => String(value || "").replace(/\s+/g, " ").trim().toLocaleLowerCase("ko-KR");

const getTitle = (destination) =>
  destination?.title || destination?.name || destination?.detail || destination?.region || "이름 없는 여행지";

const getDetail = (destination) =>
  destination?.subtitle || destination?.city || destination?.detail || destination?.region || "여행지";

const getTags = (destination) => {
  if (Array.isArray(destination?.tags)) return destination.tags.filter(Boolean).slice(0, 3);
  if (typeof destination?.tags === "string") return destination.tags.split(/[#,]/).map((tag) => tag.trim()).filter(Boolean).slice(0, 3);
  if (typeof destination?.tag === "string") return destination.tag.split(/[#,]/).map((tag) => tag.trim()).filter(Boolean).slice(0, 3);
  return [];
};

const isOverseas = (destination) => {
  if (destination?.scope === "overseas" || destination?.type === "overseas" || destination?.isOverseas) return true;
  return Boolean(destination?.countryCode && destination.countryCode !== "KR");
};

const destinationSearchText = (destination) =>
  normalizedText([
    getTitle(destination),
    getDetail(destination),
    destination?.region,
    destination?.name,
    destination?.detail,
    ...getTags(destination),
  ].filter(Boolean).join(" "));

/**
 * 도착지에 특화된 탐색 모달입니다.
 *
 * - `destinations`: API 또는 더미 데이터로 받은 여행지 배열
 * - `regions`: 대한민국 17개 시·도 배열 (KoreaRegionMap에 전달)
 * - `onSelect(location)`: 시각 카드/자동완성에서 최종 도착지 선택 시 호출
 * - `onSelectRegion(region)`: 권역별 찾기에서 시·도 선택 시 호출
 *
 * API 연결 전에는 어떤 형태의 데이터도 받을 수 있도록 title/name/detail/tags/image를 유연하게 해석합니다.
 */
export default function DestinationExplorer({
  open = true,
  destinations = [],
  regions = [],
  selectedId = null,
  selectedRegionId = null,
  title = "어디로 떠나볼까요?",
  subtitle = "도시·관광지 이름을 검색하거나, 인기 여행지에서 바로 골라보세요.",
  initialTab = TAB.POPULAR,
  onSelect,
  onSelectRegion,
  onAiRecommend,
  onClose,
  closeOnSelect = true,
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [query, setQuery] = useState("");
  const [activeResult, setActiveResult] = useState(-1);
  const [activeRegionId, setActiveRegionId] = useState(selectedRegionId);
  const inputRef = useRef(null);

  const validDestinations = useMemo(
    () => (Array.isArray(destinations) ? destinations.filter(Boolean) : []),
    [destinations],
  );

  const matchingDestinations = useMemo(() => {
    const keyword = normalizedText(query);
    if (!keyword) return [];
    return validDestinations
      .filter((destination) => destinationSearchText(destination).includes(keyword))
      .slice(0, 6);
  }, [query, validDestinations]);

  const popularDestinations = useMemo(
    () => validDestinations.filter((destination) => !isOverseas(destination)).slice(0, 8),
    [validDestinations],
  );

  const overseasDestinations = useMemo(
    () => validDestinations.filter(isOverseas).slice(0, 8),
    [validDestinations],
  );

  const visibleDestinations = activeTab === TAB.OVERSEAS ? overseasDestinations : popularDestinations;
  const activeRegion = useMemo(
    () => regions.find((region) => region.id === activeRegionId) || null,
    [activeRegionId, regions],
  );

  useEffect(() => {
    if (!open) return undefined;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    setActiveResult(-1);
  }, [query]);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (open) setActiveRegionId(selectedRegionId || null);
  }, [open, selectedRegionId]);

  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const selectDestination = (destination) => {
    if (!destination) return;
    onSelect?.(destination);
    setQuery("");
    if (closeOnSelect) onClose?.();
  };

  const selectRegion = (region) => {
    if (!region) return;
    setActiveRegionId(region.id);
    onSelectRegion?.(region);
  };

  const selectDistrict = (district) => {
    if (!activeRegion || !district) return;
    selectDestination({
      ...district,
      title: district.detail || district.name,
      name: district.name || district.detail,
      detail: district.detail || district.name,
      region: activeRegion.name || activeRegion.region,
      regionCode: district.regionCode || activeRegion.regionCode,
      countryCode: district.countryCode || "KR",
      scope: "domestic",
    });
  };

  const handleSearchKeyDown = (event) => {
    if (!matchingDestinations.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveResult((current) => Math.min(current + 1, matchingDestinations.length - 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveResult((current) => Math.max(current - 1, 0));
    }
    if (event.key === "Enter") {
      event.preventDefault();
      selectDestination(matchingDestinations[Math.max(activeResult, 0)]);
    }
  };

  if (!open) return null;

  return (
    <div className="destination-explorer-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose?.();
    }}>
      <section
        className="destination-explorer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="destination-explorer-title"
      >
        <button className="destination-explorer-close" type="button" onClick={onClose} aria-label="도착지 선택 닫기">
          <X size={19} strokeWidth={2.25} />
        </button>

        <header className="destination-explorer-header">
          <span className="destination-explorer-kicker"><Sparkles size={14} /> AI 여행지 탐색</span>
          <h2 id="destination-explorer-title">{title}</h2>
          <p>{subtitle}</p>
        </header>

        <div className="destination-explorer-search-wrap">
          <Search size={20} aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="예: 제주, 속초, 해운대, 교토"
            aria-label="도시 또는 관광지 검색"
            aria-autocomplete="list"
            aria-controls="destination-search-results"
            aria-expanded={Boolean(query && matchingDestinations.length)}
          />
          {query ? <button type="button" onClick={() => setQuery("")} aria-label="검색어 지우기"><X size={16} /></button> : null}
          {query ? (
            <div id="destination-search-results" className="destination-search-results" role="listbox" aria-label="추천 검색 결과">
              {matchingDestinations.length ? matchingDestinations.map((destination, index) => (
                <button
                  type="button"
                  key={destination.id || `${getTitle(destination)}-${index}`}
                  className={activeResult === index ? "is-active" : ""}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectDestination(destination)}
                  role="option"
                  aria-selected={activeResult === index}
                >
                  {destination.image ? <img src={destination.image} alt="" /> : <span className="destination-result-fallback"><MapPinned size={17} /></span>}
                  <span><b>{getTitle(destination)}</b><small>{getDetail(destination)}</small></span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              )) : <p className="destination-search-empty">일치하는 여행지가 없어요. 직접 지역 찾기를 이용해 보세요.</p>}
            </div>
          ) : null}
        </div>

        <nav className="destination-explorer-tabs" aria-label="도착지 탐색 방식">
          <button type="button" className={activeTab === TAB.POPULAR ? "is-active" : ""} onClick={() => setActiveTab(TAB.POPULAR)}>
            <Compass size={17} /> 인기 여행지
          </button>
          <button type="button" className={activeTab === TAB.REGIONS ? "is-active" : ""} onClick={() => setActiveTab(TAB.REGIONS)}>
            <MapPinned size={17} /> 권역별 찾기
          </button>
          {overseasDestinations.length ? (
            <button type="button" className={activeTab === TAB.OVERSEAS ? "is-active" : ""} onClick={() => setActiveTab(TAB.OVERSEAS)}>
              <Globe2 size={17} /> 해외 여행지
            </button>
          ) : null}
        </nav>

        {activeTab === TAB.REGIONS ? (
          <div className="destination-region-panel">
            {activeRegion ? (
              <div className="destination-region-detail">
                <button type="button" className="destination-region-back" onClick={() => setActiveRegionId(null)}>← 권역별 지도</button>
                <div className="destination-region-heading">
                  <span><MapPinned size={19} /></span>
                  <div><b>{activeRegion.name}에서 어디로 갈까요?</b><small>관광지와 가까운 세부 시·군·구를 골라보세요.</small></div>
                </div>
                <div className="destination-district-grid">
                  {activeRegion.districts?.map((district) => (
                    <button type="button" key={district.id} onClick={() => selectDistrict(district)}>
                      <span><b>{district.detail || district.name}</b><small>{district.apiSearchKeyword}</small></span>
                      <ArrowRight size={17} aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="destination-region-heading">
                  <span><MapPinned size={19} /></span>
                  <div><b>권역별로 찾아볼까요?</b><small>시·도를 고르면 다음 단계에서 세부 지역을 선택할 수 있어요.</small></div>
                </div>
                <KoreaRegionMap regions={regions} selectedId={selectedRegionId} onSelect={selectRegion} ariaLabel="도착지 권역별 지도" />
              </>
            )}
          </div>
        ) : (
          <div className="destination-visual-panel">
            <div className="destination-visual-heading">
              <div>
                <b>{activeTab === TAB.OVERSEAS ? "지금 떠나고 싶은 해외 여행지" : "많이 찾는 국내 여행지"}</b>
                <small>사진과 테마를 보고 가장 끌리는 곳을 골라보세요.</small>
              </div>
              {onAiRecommend ? (
                <button type="button" onClick={onAiRecommend}><Sparkles size={16} /> AI에게 추천받기</button>
              ) : null}
            </div>
            {visibleDestinations.length ? (
              <div className="destination-visual-grid">
                {visibleDestinations.map((destination, index) => {
                  const selected = selectedId === destination.id;
                  const tags = getTags(destination);
                  return (
                    <button
                      type="button"
                      key={destination.id || `${getTitle(destination)}-${index}`}
                      className={`destination-visual-card${selected ? " is-selected" : ""}`}
                      onClick={() => selectDestination(destination)}
                      aria-pressed={selected}
                    >
                      <span className="destination-card-image">
                        {destination.image ? <img src={destination.image} alt="" /> : <span className="destination-image-fallback"><MapPinned size={25} /></span>}
                        <span className="destination-card-shade" />
                        <span className="destination-card-select">{selected ? "선택됨" : "여행지 보기"}</span>
                      </span>
                      <span className="destination-card-content">
                        <b>{getTitle(destination)}</b>
                        <small>{getDetail(destination)}</small>
                        {tags.length ? <span className="destination-card-tags">{tags.map((tag) => <em key={tag}>#{tag}</em>)}</span> : null}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="destination-empty-panel"><MapPinned size={25} /><b>표시할 여행지가 아직 없어요.</b><span>백엔드에서 인기 여행지를 불러오면 이곳에 자동으로 나타납니다.</span></div>
            )}
          </div>
        )}

        <footer className="destination-explorer-footer">
          <span><Sparkles size={15} /> 여행 취향이 정해지지 않았나요?</span>
          {onAiRecommend ? <button type="button" onClick={onAiRecommend}>AI 추천으로 채우기 <ArrowRight size={15} /></button> : <small>메인 프롬프트에 원하는 여행을 자유롭게 적어도 좋아요.</small>}
        </footer>
      </section>
    </div>
  );
}
