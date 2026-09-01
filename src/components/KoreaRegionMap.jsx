import "./KoreaRegionMap.css";

/**
 * 대한민국 17개 시·도를 선택하는 재사용 가능한 SVG 지도입니다.
 *
 * 서버에서 내려오는 region 객체({ id, name, districts })와 문자열 id 모두 받을 수 있습니다.
 * 클릭할 수 있는 영역은 SVG <g>로 만들고 Enter / Space 키 선택도 지원합니다.
 */

const REGION_LAYOUT = [
  {
    id: "gangwon",
    shortName: "강원",
    label: [354, 110],
    path: "M271 31 L350 19 L416 44 L467 91 L478 157 L445 199 L379 197 L337 180 L293 169 L261 128 Z",
  },
  {
    id: "gyeonggi",
    shortName: "경기",
    label: [234, 178],
    path: "M159 112 L221 89 L275 111 L293 169 L275 211 L225 227 L172 202 L148 161 Z",
  },
  {
    id: "seoul",
    shortName: "서울",
    label: [207, 145],
    path: "M189 130 L215 121 L233 138 L226 158 L202 162 L183 149 Z",
  },
  {
    id: "incheon",
    shortName: "인천",
    label: [133, 151],
    path: "M103 122 L154 111 L173 143 L159 180 L116 179 L91 158 Z M74 143 L94 149 L95 166 L79 168 Z M81 184 L103 188 L100 203 L84 200 Z",
  },
  {
    id: "chungbuk",
    shortName: "충북",
    label: [307, 249],
    path: "M278 190 L347 188 L386 219 L371 279 L323 300 L278 273 L258 229 Z",
  },
  {
    id: "chungnam",
    shortName: "충남",
    label: [205, 259],
    path: "M138 204 L203 194 L262 225 L278 273 L245 307 L181 312 L130 281 L119 241 Z",
  },
  {
    id: "sejong",
    shortName: "세종",
    label: [254, 286],
    path: "M242 267 L269 268 L280 288 L263 304 L240 295 Z",
  },
  {
    id: "daejeon",
    shortName: "대전",
    label: [257, 325],
    path: "M237 309 L271 306 L286 330 L267 350 L239 341 Z",
  },
  {
    id: "gyeongbuk",
    shortName: "경북",
    label: [408, 259],
    path: "M387 190 L449 194 L489 226 L493 285 L467 337 L409 336 L371 279 L386 219 Z",
  },
  {
    id: "daegu",
    shortName: "대구",
    label: [399, 344],
    path: "M377 323 L410 315 L431 338 L419 364 L388 366 L370 346 Z",
  },
  {
    id: "jeonbuk",
    shortName: "전북",
    label: [203, 363],
    path: "M145 307 L203 303 L246 337 L247 390 L218 421 L161 406 L132 362 Z",
  },
  {
    id: "gwangju",
    shortName: "광주",
    label: [167, 440],
    path: "M149 423 L182 418 L198 441 L188 462 L158 459 L141 443 Z",
  },
  {
    id: "jeonnam",
    shortName: "전남",
    label: [224, 488],
    path: "M112 400 L161 405 L219 422 L255 455 L242 509 L192 531 L140 511 L103 466 Z M84 456 L109 460 L110 479 L91 482 Z M89 498 L116 503 L109 520 L85 515 Z",
  },
  {
    id: "gyeongnam",
    shortName: "경남",
    label: [329, 444],
    path: "M247 376 L306 359 L366 365 L397 405 L382 461 L331 483 L278 465 L244 425 Z",
  },
  {
    id: "ulsan",
    shortName: "울산",
    label: [455, 380],
    path: "M432 350 L464 343 L482 366 L474 394 L448 397 L430 378 Z",
  },
  {
    id: "busan",
    shortName: "부산",
    label: [422, 435],
    path: "M393 410 L425 401 L447 421 L441 446 L416 455 L394 438 Z",
  },
  {
    id: "jeju",
    shortName: "제주",
    label: [224, 612],
    path: "M169 594 C187 577 241 576 281 591 C297 598 296 612 274 621 C232 638 183 628 165 614 C160 609 162 600 169 594 Z",
  },
];

const normalizeRegion = (region) => {
  if (typeof region === "string") return { id: region, name: region };
  return region || null;
};

const displayRegionName = (name, fallback) =>
  String(name || fallback)
    .replace("특별자치도", "")
    .replace("특별자치시", "")
    .replace("특별시", "")
    .replace("광역시", "");

export const KOREA_REGION_LAYOUT = REGION_LAYOUT;

export default function KoreaRegionMap({
  regions = [],
  selectedId = null,
  onSelect,
  ariaLabel = "대한민국 17개 시도 선택 지도",
}) {
  const regionById = new Map(
    regions
      .map(normalizeRegion)
      .filter(Boolean)
      .map((region) => [region.id, region]),
  );

  const visibleRegions = REGION_LAYOUT.filter((item) => regionById.size === 0 || regionById.has(item.id));

  const chooseRegion = (region) => {
    if (typeof onSelect === "function") onSelect(region);
  };

  const handleKeyDown = (event, region) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    chooseRegion(region);
  };

  return (
    <div className="korea-svg-map-shell">
      <svg
        className="korea-svg-map"
        viewBox="50 0 470 660"
        role="group"
        aria-label={ariaLabel}
        focusable="false"
      >
        <title>{ariaLabel}</title>
        <path
          className="korea-map-coastline"
          d="M99 113 C119 81 169 71 205 80 C250 45 324 10 382 26 C453 48 500 113 493 177 C518 228 514 292 484 337 C506 379 482 436 452 459 C438 498 386 515 347 504 C304 530 245 541 194 530 C134 529 94 481 87 427 C58 391 75 337 104 309 C82 254 91 196 104 173 C86 153 85 129 99 113 Z"
          aria-hidden="true"
        />
        {visibleRegions.map((layout) => {
          const region = regionById.get(layout.id) || { id: layout.id, name: layout.shortName };
          const selected = selectedId === layout.id || selectedId === region.id;
          const name = displayRegionName(region.name, layout.shortName);
          const districtCount = Array.isArray(region.districts) ? region.districts.length : null;

          return (
            <g
              key={layout.id}
              className={`korea-map-region${selected ? " is-selected" : ""}`}
              role="button"
              tabIndex={0}
              aria-label={`${region.name || layout.shortName}${selected ? ", 선택됨" : ""}`}
              aria-pressed={selected}
              onClick={() => chooseRegion(region)}
              onKeyDown={(event) => handleKeyDown(event, region)}
            >
              <title>{`${region.name || layout.shortName}${districtCount ? ` · 대표 세부 지역 ${districtCount}개` : ""}`}</title>
              <path d={layout.path} />
              <text x={layout.label[0]} y={layout.label[1] - (districtCount ? 4 : 0)}>
                {name}
              </text>
              {districtCount ? (
                <text className="korea-map-region-count" x={layout.label[0]} y={layout.label[1] + 15}>
                  {districtCount}개 지역
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
      <p className="korea-map-a11y-note">지역을 선택하면 세부 시·군·구를 고를 수 있어요.</p>
    </div>
  );
}
