import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Compass,
  MapPinned,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import KoreaRegionMap from "./KoreaRegionMap";
import RegionDetailMap from "./RegionDetailMap";
import useMediaQuery from "../hooks/useMediaQuery";
import jejuCoastPhoto from "../assets/jeju-main-hero.jpeg";
import "./destination-explorer.css";

const TAB = {
  TRENDING: "trending",
  MAP: "map",
  THEME: "theme",
};

const THEME_OPTIONS = ["전체", "바다", "힐링", "맛집·카페", "야경", "자연·숲"];

const DESTINATION_IMAGE_FALLBACKS = {
  "destination-jeju": jejuCoastPhoto,
  "destination-busan": "https://yaimg.yanolja.com/v5/2026/01/30/05/1280/697c45a04bcde3.06159282.jpg",
  "destination-yeosu": "https://img.einet.kr/P202101006/travel/42924/01.jpg?v=1684740236",
  "destination-gapyeong-chuncheon": "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/463000/463964-Nami-Island.jpg?h=500&impolicy=fcrop&q=medium&w=1200",
  "destination-danyang": "https://d3h30waly5w5yx.cloudfront.net/images/tour/pictures/danyang-dodam-1.jpg",
  "destination-suncheon-boseong": "https://commons.wikimedia.org/wiki/Special:FilePath/Suncheon%20Ecological%20Bay-%20%EC%88%9C%EC%B2%9C%EB%A7%8C%EC%8A%B5%EC%A7%80.jpg?width=1200",
  "destination-pohang": "https://tong.visitkorea.or.kr/cms/resource/30/2917730_image2_1.jpg",
};

export const TRENDING_DESTINATIONS = [
  { id: "destination-jeju", title: "제주도", subtitle: "제주시 · 협재 · 성산", region: "제주특별자치도", regionCode: "KR-49", latitude: 33.4996, longitude: 126.5312, tags: ["바다", "힐링", "맛집·카페"], image: "https://images.unsplash.com/photo-1589136785350-93a3881bcce2?q=80&w=600&auto=format&fit=crop", subSpots: ["성산일출봉", "애월 한담해안산책로", "오설록 티뮤지엄", "동문시장"] },
  { id: "destination-busan", title: "부산", subtitle: "해운대 · 광안리", region: "부산광역시", regionCode: "KR-26", latitude: 35.1796, longitude: 129.0756, tags: ["바다", "맛집·카페", "야경"], image: "https://yaimg.yanolja.com/v5/2026/01/30/05/1280/697c45a04bcde3.06159282.jpg", subSpots: ["해운대 블루라인파크", "흰여울문화마을", "해동용궁사", "광안리 해수욕장"] },
  { id: "destination-gangneung", title: "강릉", subtitle: "경포 · 안목", region: "강원특별자치도", regionCode: "KR-42", latitude: 37.7519, longitude: 128.8761, tags: ["바다", "맛집·카페", "힐링"], image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=88", subSpots: ["경포대", "아르떼뮤지엄", "안목해변 커피거리", "강릉 중앙시장"] },
  { id: "destination-sokcho", title: "속초", subtitle: "설악산 · 영랑호", region: "강원특별자치도", regionCode: "KR-42", latitude: 38.207, longitude: 128.5918, tags: ["자연·숲", "바다", "힐링"], image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=88", subSpots: ["설악산 케이블카", "속초아이 대관람차", "아바이마을", "속초관광수산시장"] },
  { id: "destination-yeosu", title: "여수", subtitle: "오동도 · 낭만포차", region: "전라남도", regionCode: "KR-46", latitude: 34.7604, longitude: 127.6622, tags: ["바다", "야경", "맛집·카페"], image: "https://images.unsplash.com/photo-1598509524136-421c60f2bb97?q=80&w=600&auto=format&fit=crop", subSpots: ["오동도", "여수 해상케이블카", "향일암", "이순신광장"] },
  { id: "destination-gyeongju", title: "경주", subtitle: "황리단길 · 대릉원", region: "경상북도", regionCode: "KR-47", latitude: 35.8562, longitude: 129.2247, tags: ["힐링", "맛집·카페", "야경"], image: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Korea-Gyeongju-Bulguksa-24.jpg", subSpots: ["대릉원", "황리단길", "불국사", "동궁과 월지"] },
  { id: "destination-jeonju", title: "전주", subtitle: "한옥마을 · 남부시장", region: "전북특별자치도", regionCode: "KR-45", latitude: 35.8242, longitude: 127.148, tags: ["맛집·카페", "힐링", "야경"], image: "https://tour.jeonju.go.kr/images/visitjj/contents/streetmap/img_hanok00.jpg", subSpots: ["전주한옥마을", "객리단길", "덕진공원", "남부시장"] },
  { id: "destination-gapyeong-chuncheon", title: "가평·춘천", subtitle: "남이섬 · 의암호", region: "경기도·강원특별자치도", regionCode: "KR-41", latitude: 37.8564, longitude: 127.62, tags: ["자연·숲", "힐링", "맛집·카페"], image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop", subSpots: ["남이섬", "아침고요수목원", "레고랜드", "구봉산 카페거리"] },
  { id: "destination-taean", title: "태안·안면도", subtitle: "꽃지 · 신두리", region: "충청남도", regionCode: "KR-44", latitude: 36.7456, longitude: 126.2979, tags: ["바다", "자연·숲", "힐링"], image: "https://images.unsplash.com/photo-1455729552865-3658a5d39692?auto=format&fit=crop&w=1200&q=88", subSpots: ["꽃지해수욕장", "신두리 해안사구", "천리포수목원", "안면도 수산시장"] },
  { id: "destination-danyang", title: "단양", subtitle: "도담삼봉 · 남한강", region: "충청북도", regionCode: "KR-43", latitude: 36.9847, longitude: 128.365, tags: ["자연·숲", "힐링", "맛집·카페"], image: "https://d3h30waly5w5yx.cloudfront.net/images/tour/pictures/danyang-dodam-1.jpg", subSpots: ["도담삼봉", "패러글라이딩 활공장", "만천하스카이워크", "단양 구경시장"] },
  { id: "destination-suncheon-boseong", title: "순천·보성", subtitle: "순천만 · 녹차밭", region: "전라남도", regionCode: "KR-46", latitude: 34.9006, longitude: 127.287, tags: ["자연·숲", "힐링", "맛집·카페"], image: "https://commons.wikimedia.org/wiki/Special:FilePath/Suncheon%20Ecological%20Bay-%20%EC%88%9C%EC%B2%9C%EB%A7%8C%EC%8A%B5%EC%A7%80.jpg?width=1200", subSpots: ["순천만습지", "순천만국가정원", "대한다원 녹차밭", "낙안읍성 민속마을"] },
  { id: "destination-pohang", title: "포항", subtitle: "호미곶 · 영일대", region: "경상북도", regionCode: "KR-47", latitude: 36.019, longitude: 129.3435, tags: ["바다", "야경", "맛집·카페"], image: "https://tong.visitkorea.or.kr/cms/resource/30/2917730_image2_1.jpg", subSpots: ["호미곶", "스페이스워크", "구룡포 일본인가옥거리", "영일대 해수욕장"] },
];

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

const destinationSearchText = (destination) =>
  normalizedText([
    getTitle(destination),
    getDetail(destination),
    destination?.region,
    destination?.name,
    destination?.detail,
    ...getTags(destination),
    ...(destination?.subSpots || []),
  ].filter(Boolean).join(" "));

/**
 * 도착지에 특화된 탐색 모달입니다.
 *
 * - 국내 12개 핵심 권역과 48개 세부 관광지를 2 Depth로 탐색합니다.
 * - `regions`: 대한민국 17개 시·도 배열 (KoreaRegionMap에 전달)
 * - `onSelect(location)`: 시각 카드/자동완성에서 최종 도착지 선택 시 호출
 * - `onSelectRegion(region)`: 권역별 찾기에서 시·도 선택 시 호출
 *
 * API 연결 전에는 어떤 형태의 데이터도 받을 수 있도록 title/name/detail/tags/image를 유연하게 해석합니다.
 */
export default function DestinationExplorer({
  open = true,
  regions = [],
  selectedId = null,
  selectedRegionId = null,
  title = "어디로 떠나볼까요?",
  subtitle = "도시·관광지 이름을 검색하거나, 인기 여행지에서 바로 골라보세요.",
  initialTab = TAB.TRENDING,
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
  const [selectedTheme, setSelectedTheme] = useState("전체");
  const [expandedDestinationId, setExpandedDestinationId] = useState(null);
  const isMobile = useMediaQuery("(max-width: 760px)");
  const inputRef = useRef(null);

  const validDestinations = TRENDING_DESTINATIONS;

  const matchingDestinations = useMemo(() => {
    const keyword = normalizedText(query);
    if (!keyword) return [];
    return validDestinations
      .filter((destination) => destinationSearchText(destination).includes(keyword))
      .slice(0, 6);
  }, [query, validDestinations]);

  const themeDestinations = useMemo(
    () => selectedTheme === "전체"
      ? validDestinations
      : validDestinations.filter((destination) => getTags(destination).includes(selectedTheme)),
    [selectedTheme],
  );

  const visibleDestinations = activeTab === TAB.THEME ? themeDestinations : validDestinations;
  const activeRegion = useMemo(
    () => regions.find((region) => region.id === activeRegionId) || null,
    [activeRegionId, regions],
  );

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

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

  const selectSubSpot = (destination, subSpot, index) => {
    selectDestination({
      ...destination,
      id: `${destination.id}-spot-${index + 1}`,
      parentDestinationId: destination.id,
      title: subSpot,
      name: subSpot,
      detail: subSpot,
      latitude: null,
      longitude: null,
      apiSearchKeyword: `${destination.title} ${subSpot}`,
      needsGeocoding: true,
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
            placeholder="예: 제주, 속초, 해운대, 경포대"
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
          <button type="button" className={activeTab === TAB.TRENDING ? "is-active" : ""} onClick={() => setActiveTab(TAB.TRENDING)}>
            <Compass size={17} /> 요즘 뜨는 여행지
          </button>
          <button type="button" className={activeTab === TAB.MAP ? "is-active" : ""} onClick={() => setActiveTab(TAB.MAP)}>
            <MapPinned size={17} /> 지도로 찾기
          </button>
          <button type="button" className={activeTab === TAB.THEME ? "is-active" : ""} onClick={() => setActiveTab(TAB.THEME)}>
            <Sparkles size={17} /> 테마별 추천
          </button>
        </nav>

        {activeTab === TAB.MAP ? (
          <div className="destination-region-panel">
            {activeRegion ? (
              <div className="destination-region-detail">
                <button type="button" className="destination-region-back" onClick={() => setActiveRegionId(null)}>← 권역별 지도</button>
                <div className="destination-region-heading">
                  <span><MapPinned size={19} /></span>
                  <div><b>{activeRegion.name}에서 어디로 갈까요?</b><small>관광지와 가까운 세부 시·군·구를 골라보세요.</small></div>
                </div>
                <RegionDetailMap
                  region={activeRegion}
                  selectedDistrictId={selectedId}
                  selectDistrict={selectDistrict}
                  ariaLabel={`${activeRegion.name} 도착지 세부 시군구 선택 지도`}
                />
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
            {activeTab === TAB.THEME ? (
              <div className="destination-theme-chips" role="group" aria-label="여행 테마 선택">
                {THEME_OPTIONS.map((theme) => (
                  <button type="button" key={theme} className={selectedTheme === theme ? "is-active" : ""} onClick={() => setSelectedTheme(theme)} aria-pressed={selectedTheme === theme}>
                    {theme}
                  </button>
                ))}
              </div>
            ) : null}
            <div className="destination-visual-heading">
              <div>
                <b>{activeTab === TAB.THEME ? `${selectedTheme} 테마 여행지` : "요즘 많이 찾는 국내 여행지"}</b>
                <small>{activeTab === TAB.THEME ? "원하는 테마와 어울리는 지역을 골라보세요." : "카드에 마우스를 올리면 대표 관광지 4곳을 바로 선택할 수 있어요."}</small>
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
                    <article
                      key={destination.id || `${getTitle(destination)}-${index}`}
                      className={`destination-visual-card${selected ? " is-selected" : ""}${activeTab === TAB.TRENDING ? " has-sub-spots" : ""}${expandedDestinationId === destination.id ? " is-expanded" : ""}`}
                    >
                      <button type="button" className="destination-card-main" onClick={() => isMobile && activeTab === TAB.TRENDING ? setExpandedDestinationId((current) => current === destination.id ? null : destination.id) : selectDestination(destination)} aria-pressed={selected}>
                        <span className="destination-card-image">
                          {destination.image ? <img src={destination.image} alt={`${destination.title} 대표 풍경`} onError={(event) => {
                            const fallback = DESTINATION_IMAGE_FALLBACKS[destination.id];
                            if (fallback && event.currentTarget.src !== fallback) event.currentTarget.src = fallback;
                          }} /> : <span className="destination-image-fallback"><MapPinned size={25} /></span>}
                          <span className="destination-card-shade" />
                          <span className="destination-card-select">{selected ? "선택됨" : "여행지 보기"}</span>
                        </span>
                        <span className="destination-card-content">
                          <b>{getTitle(destination)}</b>
                          <small>{getDetail(destination)}</small>
                          {tags.length ? <span className="destination-card-tags">{tags.map((tag) => <em key={tag}>#{tag}</em>)}</span> : null}
                        </span>
                      </button>
                      {activeTab === TAB.TRENDING ? (
                        <div className="destination-subspot-overlay" aria-label={`${destination.title} 대표 관광지`}>
                          <strong>{destination.title} 어디로 갈까요?</strong>
                          {destination.subSpots.map((subSpot, subIndex) => (
                            <button type="button" key={subSpot} onClick={() => selectSubSpot(destination, subSpot, subIndex)}>{subSpot}<ArrowRight size={13} /></button>
                          ))}
                        </div>
                      ) : null}
                    </article>
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
