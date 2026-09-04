import { useEffect, useMemo, useState } from "react";
import { requestTripPlan } from "../api/tripPlanApi";
import {
  destinationCoordinatesByName,
  jejuRegionCoordinates,
  koreanRegions,
  toApiLocation,
} from "../data/locationCatalog";
import jejuCoastPhoto from "../assets/jeju-main-hero.jpeg";
import {
  applyPlanEdits,
  demoRentalsForLocation,
  demoStaysForLocation,
  distanceBetween,
  estimateIntercityFare,
  eventPrice,
  flights,
  getDates,
  heroSlides,
  isSaleFlight,
  jejuRegionOptions,
  localOptions,
  makeDayPlans,
  minutesToTime,
  money,
  oneWayFare,
  oneWayOriginalFare,
  outboundOptions,
  placeEntryCost,
  stays,
  timeToMinutes,
  today,
  transportName,
} from "../data/mockData";

function useTripPlanner() {
  const [initialDraft] = useState(() => {
    try { return JSON.parse(window.localStorage.getItem("tripDraft") || "{}"); }
    catch { return {}; }
  });
  const [destinationType, setDestinationType] = useState(initialDraft.destinationType || "");
  const [destination, setDestination] = useState("");
  const [destinationLocation, setDestinationLocation] = useState(initialDraft.destinationLocation || null);
  const [destinationRegionId, setDestinationRegionId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [customDestination, setCustomDestination] = useState("");
  const [departureLocation, setDepartureLocation] = useState(initialDraft.departureLocation || null);
  const [departureRegionId, setDepartureRegionId] = useState("");
  const [departureMenuOpen, setDepartureMenuOpen] = useState(false);
  const [customDeparture, setCustomDeparture] = useState("");
  const [prompt, setPrompt] = useState(initialDraft.prompt || "");
  const [startDate, setStartDate] = useState(initialDraft.startDate || today);
  const [endDate, setEndDate] = useState(initialDraft.endDate || "");
  const [startTime, setStartTime] = useState(initialDraft.startTime || "09:00");
  const [endTime, setEndTime] = useState(initialDraft.endTime || "18:00");
  const [showTimeFields, setShowTimeFields] = useState(false);
  const [travelers, setTravelers] = useState(initialDraft.travelers || null);
  const [travelerInput, setTravelerInput] = useState("");
  const [travelerPromptOpen, setTravelerPromptOpen] = useState(false);
  const [budget, setBudget] = useState(initialDraft.budget || 900000);
  const [pace, setPace] = useState(initialDraft.pace || "보통");
  const [themes, setThemes] = useState(initialDraft.themes || ["맛집", "관광"]);
  useEffect(() => {
    try {
      window.localStorage.setItem("tripDraft", JSON.stringify({ destinationType, destinationLocation, departureLocation, prompt, startDate, endDate, startTime, endTime, travelers, budget, pace, themes }));
    } catch { /* Private browsing/storage restrictions should not block planning. */ }
  }, [destinationType, destinationLocation, departureLocation, prompt, startDate, endDate, startTime, endTime, travelers, budget, pace, themes]);
  const resetTripDraft = () => {
    try { window.localStorage.removeItem("tripDraft"); } catch { /* no-op */ }
    window.location.reload();
  };
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [transportPromptReady, setTransportPromptReady] = useState(false);
  const [jejuBaseArea, setJejuBaseArea] = useState("");
  const [jejuCustomArea, setJejuCustomArea] = useState("");
  const [jejuAreaModalOpen, setJejuAreaModalOpen] = useState(false);
  const [jejuRegionGuideOpen, setJejuRegionGuideOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  useEffect(() => {
    const slideTimer = window.setInterval(
      () => setHeroSlideIndex((current) => (current + 1) % heroSlides.length),
      4000,
    );
    return () => window.clearInterval(slideTimer);
  }, []);
  useEffect(() => {
    if (
      destinationLocation &&
      departureLocation &&
      endDate &&
      transportPromptReady
    ) {
      setTransportStep("mode");
      setTransportModalOpen(true);
      setTransportPromptReady(false);
    }
  }, [departureLocation, destinationLocation, endDate, transportPromptReady]);
  useEffect(() => {
    if (!jejuAreaModalOpen) return;
    setJejuAreaModalOpen(false);
    setJejuRegionGuideOpen(true);
  }, [jejuAreaModalOpen]);
  const [transport, setTransport] = useState("");
  const [localTransport, setLocalTransport] = useState("");
  const [transportModalOpen, setTransportModalOpen] = useState(false);
  const [transportStep, setTransportStep] = useState("mode");
  const [origin, setOrigin] = useState("GMP");
  const [flightOpen, setFlightOpen] = useState(false);
  const [flightPickerLeg, setFlightPickerLeg] = useState("outbound");
  const [flightTransitionOpen, setFlightTransitionOpen] = useState(false);
  const [flightSort, setFlightSort] = useState("time");
  const [flightId, setFlightId] = useState("");
  const [returnFlightId, setReturnFlightId] = useState("");
  const [rentalOpen, setRentalOpen] = useState(false);
  const [rentalId, setRentalId] = useState("");
  const [preferenceModalOpen, setPreferenceModalOpen] = useState(false);
  const [stayTransitionOpen, setStayTransitionOpen] = useState(false);
  const [budgetConfirmationOpen, setBudgetConfirmationOpen] = useState(false);
  const [planPromptOpen, setPlanPromptOpen] = useState(false);
  const [budgetStatus, setBudgetStatus] = useState(null);
  const [stayOpen, setStayOpen] = useState(false);
  const [stayArea, setStayArea] = useState("전체");
  const [stayCustomArea, setStayCustomArea] = useState("");
  const [priceBand, setPriceBand] = useState("10-20");
  const [staySearch, setStaySearch] = useState("");
  const [staySort, setStaySort] = useState("review");
  const [stayId, setStayId] = useState("");
  const [stayChange, setStayChange] = useState(null);
  const [stayChangePromptOpen, setStayChangePromptOpen] = useState(false);
  const [stayChangeCompareOpen, setStayChangeCompareOpen] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const [planViewOpen, setPlanViewOpen] = useState(false);
  const [planning, setPlanning] = useState(false);
  const [quickEditTarget, setQuickEditTarget] = useState("");
  const [planningStage, setPlanningStage] = useState("calculating");
  const [planningMode, setPlanningMode] = useState("create");
  const [planRevision, setPlanRevision] = useState(1);
  const [activeDay, setActiveDay] = useState(0);
  const [planEdits, setPlanEdits] = useState({});
  const [message, setMessage] = useState("");
  useEffect(() => {
    const filterBar = document.querySelector(".stay-picker .area-filters");
    if (!filterBar) return undefined;
    let field = document.querySelector(".stay-picker .custom-area-field");
    if (!field) {
      field = document.createElement("label");
      field.className = "custom-area-field";
      const icon = document.createElement("span");
      icon.textContent = "⌖";
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "지역 이름을 입력하세요";
      input.setAttribute("aria-label", "기타 숙소 지역 입력");
      const hint = document.createElement("small");
      hint.textContent = "입력한 지역은 AI 일정 재설계에 반영돼요.";
      input.addEventListener("input", (event) =>
        setStayCustomArea(event.currentTarget.value),
      );
      field.append(icon, input, hint);
      filterBar.insertAdjacentElement("afterend", field);
    }
    const input = field.querySelector("input");
    if (input && input.value !== stayCustomArea) input.value = stayCustomArea;
    return undefined;
  }, [stayArea, stayCustomArea, stayOpen]);
  const isJeju = destinationLocation?.regionCode === "KR-49";
  const hasDomesticDestination = destinationLocation?.countryCode === "KR";
  const destinationAirport =
    destinationLocation?.airportCode ||
    destinationLocation?.airportCodes?.[0] ||
    (hasDomesticDestination ? "CJU" : "INTL");
  const selectedOutboundFlight = flights.find(
    (flight) => flight.id === flightId,
  );
  const selectedReturnFlight = flights.find(
    (flight) => flight.id === returnFlightId,
  );
  const selectedFlight = useMemo(() => {
    if (!selectedOutboundFlight || !selectedReturnFlight) return null;
    const originalFare =
      oneWayOriginalFare(selectedOutboundFlight) +
      oneWayOriginalFare(selectedReturnFlight);
    const fare =
      oneWayFare(selectedOutboundFlight) + oneWayFare(selectedReturnFlight);
    return {
      id: `${selectedOutboundFlight.id}-${selectedReturnFlight.id}`,
      origin,
      airline:
        selectedOutboundFlight.airline === selectedReturnFlight.airline
          ? selectedOutboundFlight.airline
          : `${selectedOutboundFlight.airline} · ${selectedReturnFlight.airline}`,
      out: selectedOutboundFlight.out,
      back: selectedReturnFlight.back,
      fare,
      originalFare,
      discount: Math.max(0, Math.round((1 - fare / originalFare) * 100)),
      seats: Math.min(
        selectedOutboundFlight.seats || 9,
        selectedReturnFlight.seats || 9,
      ),
    };
  }, [origin, selectedOutboundFlight, selectedReturnFlight]);
  const stayCatalog = useMemo(
    () => demoStaysForLocation(destinationLocation),
    [destinationLocation],
  );
  const rentalCatalog = useMemo(
    () => demoRentalsForLocation(destinationLocation),
    [destinationLocation],
  );
  const selectedRental = rentalCatalog.find((rental) => rental.id === rentalId);
  const selectedStay = stayCatalog.find((stay) => stay.id === stayId);
  const isJungmunStay = selectedStay?.area === "중문·서귀포";
  const dates = getDates(startDate, endDate);
  const nights = Math.max(1, dates.length - 1);
  const party = travelers || 1;
  const rooms = selectedStay ? Math.ceil(party / 3) : 0;
  const scheduledStartTime = selectedFlight?.out.slice(0, 5) || startTime;
  const scheduledArrivalTime =
    selectedFlight?.out.slice(-5) ||
    minutesToTime(timeToMinutes(startTime) + 80);
  const scheduledEndTime = selectedFlight?.back.slice(0, 5) || endTime;
  const baseDayPlans = useMemo(
    () =>
      makeDayPlans(
        scheduledArrivalTime,
        scheduledEndTime,
        selectedStay,
        selectedFlight,
        destinationLocation,
        departureLocation,
        transport,
        dates.length,
      ),
    [
      scheduledArrivalTime,
      scheduledEndTime,
      selectedFlight,
      selectedStay,
      destinationLocation,
      departureLocation,
      transport,
      dates.length,
    ],
  );
  const dayPlans = useMemo(
    () => applyPlanEdits(baseDayPlans, planEdits),
    [baseDayPlans, planEdits],
  );
  const placeEditAdjustment = Object.entries(planEdits).reduce(
    (sum, [key, place]) => {
      const [dayIndex, stopIndex] = key.split("-").map(Number);
      const originalName = baseDayPlans[dayIndex]?.[2]?.[stopIndex]?.[2] || "";
      return sum + placeEntryCost(place.name) - placeEntryCost(originalName);
    },
    0,
  );
  const flightTimeForLeg = (flight) =>
    flightPickerLeg === "outbound"
      ? flight.out.slice(0, 5)
      : flight.back.slice(0, 5);
  const filteredFlights = flights.filter((flight) => flight.origin === origin);
  const saleFirstFlights = [...filteredFlights].sort((a, b) => {
    const saleOrder = Number(isSaleFlight(b)) - Number(isSaleFlight(a));
    if (saleOrder) return saleOrder;
    return flightSort === "price"
      ? oneWayFare(a) - oneWayFare(b)
      : timeToMinutes(flightTimeForLeg(a)) -
          timeToMinutes(flightTimeForLeg(b)) || oneWayFare(a) - oneWayFare(b);
  });
  const stayAreas = ["전체", ...new Set(stayCatalog.map((stay) => stay.area))];
  const isInPriceBand = (price) => {
    if (priceBand === "0-5") return price < 50000;
    if (priceBand === "5-10") return price >= 50000 && price < 100000;
    if (priceBand === "10-20") return price >= 100000 && price < 200000;
    if (priceBand === "20-30") return price >= 200000 && price < 300000;
    if (priceBand === "30+") return price >= 300000;
    return true;
  };
  const filteredStays = stayCatalog
    .filter(
      (stay) =>
        isInPriceBand(stay.price) &&
        (stayArea === "전체" ||
          stayArea === "기타 지역" ||
          stay.area === stayArea) &&
        stay.name.toLowerCase().includes(staySearch.toLowerCase()),
    )
    .sort((a, b) =>
      staySort === "price"
        ? a.price - b.price
        : Number(b.deal) - Number(a.deal) ||
          Number(b.rating) - Number(a.rating) ||
          b.reviewCount - a.reviewCount,
    );
  // 비용은 특정 지역·시나리오가 아니라 현재 선택한 출발지, 도착지, 이동수단을
  // 기준으로 계산합니다. 이후 백엔드에서는 동일한 출력 구조에 실제 견적 API만
  // 연결하면 되도록 더미 계산을 한 곳에 모았습니다.
  const originLabel =
    departureLocation?.detail ||
    departureLocation?.name ||
    departureLocation?.region ||
    "출발지";
  const destinationLabel =
    destinationLocation?.detail ||
    destinationLocation?.name ||
    destinationLocation?.region ||
    "선택한 여행지";
  const selectedTransportMode = transport || (selectedFlight ? "FLIGHT" : "");
  const selectedTransportLabel = transportName(
    selectedTransportMode,
    outboundOptions,
  );
  const selectedLocalTransportLabel = transportName(
    localTransport,
    localOptions,
  );
  const routeDistanceKm = distanceBetween(departureLocation, destinationLocation);
  const intercityTransportTotal =
    selectedTransportMode === "FLIGHT"
      ? selectedFlight?.fare || 0
      : selectedTransportMode
        ? estimateIntercityFare({
            mode: selectedTransportMode,
            origin: departureLocation,
            destination: destinationLocation,
            travelers: party,
          })
        : 0;
  const itineraryDistanceKm = Math.max(
    45,
    Math.round(nights * 72 + Object.keys(planEdits).length * 18),
  );
  const localFuelAndParkingTotal = Math.round(
    (itineraryDistanceKm / 11.5) * 1750 + nights * 9000,
  );
  const usesRental = localTransport === "RENTAL" && Boolean(selectedRental);
  const rentalFeePerPerson = usesRental ? selectedRental.price / party : 0;
  const localFuelAndParkingPerPerson =
    usesRental || selectedTransportMode === "CAR"
      ? localFuelAndParkingTotal / party
      : 0;
  const localTransitTotal =
    localTransport === "TRANSIT"
      ? Math.max(6000, nights * 12000 + 5000)
      : localTransport === "TAXI"
        ? Math.max(18000, nights * 28000 + 10000)
        : 0;
  const localTravelTotal =
    rentalFeePerPerson + localFuelAndParkingPerPerson + localTransitTotal;
  const tripDurationLabel = `${nights}박 ${Math.max(1, nights + 1)}일`;
  const mealRows = [
    [`${destinationLabel} 로컬 점심 · 1일차`, 23000, "현지 식당 1인 식사 예상"],
    [
      `${destinationLabel} 로컬 저녁 · 1일차`,
      33000,
      "숙소 또는 주요 동선 인근 1인 식사 예상",
    ],
    [`${destinationLabel} 카페·간식`, 12000, "음료와 간식 1회 기준"],
    [
      `${destinationLabel} 로컬 점심 · ${Math.max(2, nights)}일차`,
      22000,
      "둘째 날 이동 전 1인 식사 예상",
    ],
    [
      `${destinationLabel} 지역 특색 저녁`,
      35000,
      "여행지 대표 메뉴와 곁들임 1인 기준",
    ],
    [`${destinationLabel} 간식·기념품`, 15000, "간식과 소형 기념품 1인 예상"],
  ];
  const activityRows = [
    [
      `${destinationLabel} 대표 관광지 입장·체험`,
      12000,
      "대표 관광지 1곳의 입장 또는 체험 1인 기준",
    ],
    [
      `${destinationLabel} 지역 체험`,
      18000,
      "현지 문화·자연 체험 1회 1인 기준",
    ],
    [`${destinationLabel} 자유 산책`, 0, "공원·거리·자연 경관을 즐기는 무료 일정"],
  ];
  const foodTotal = mealRows.reduce((sum, [, value]) => sum + value, 0);
  const activityTotal = Math.max(
    0,
    activityRows.reduce((sum, [, value]) => sum + value, 0) +
      placeEditAdjustment,
  );
  const stayTotal = selectedStay
    ? (selectedStay.price * nights * rooms) / party
    : 0;
  const driveTotal = localTravelTotal;
  const items = useMemo(
    () => [
      {
        name:
          selectedTransportMode === "FLIGHT"
            ? "항공"
            : selectedTransportMode
              ? `${selectedTransportLabel} 이동`
              : "출발 이동",
        total: intercityTransportTotal,
        color: "flight",
      },
      { name: "숙소", total: stayTotal, color: "stay" },
      {
        name: usesRental
          ? "렌터카·현지 이동"
          : localTransport
            ? `${selectedLocalTransportLabel} 현지 이동`
            : "현지 이동",
        total: driveTotal,
        color: "drive",
      },
      { name: "식비", total: foodTotal, color: "food" },
      { name: "관광·체험", total: activityTotal, color: "play" },
    ],
    [
      activityTotal,
      driveTotal,
      foodTotal,
      intercityTransportTotal,
      localTransport,
      selectedLocalTransportLabel,
      selectedTransportLabel,
      selectedTransportMode,
      stayTotal,
      usesRental,
    ],
  );
  const costDetails = useMemo(
    () => [
      {
        group: "1인 이동·식사 비용",
        rows: [
          [
            selectedTransportMode === "FLIGHT"
              ? "왕복 항공권"
              : `${selectedTransportLabel} 이동`,
            intercityTransportTotal,
            selectedTransportMode === "FLIGHT"
              ? selectedFlight
                ? `${originLabel} ↔ ${destinationLabel} · 왕복 1인`
                : "가는 편과 오는 편을 모두 선택하면 반영됩니다."
              : selectedTransportMode === "CAR"
                ? `${originLabel} ↔ ${destinationLabel} · 왕복 약 ${routeDistanceKm * 2}km · 유류비·통행료 ${party}명 분할`
                : selectedTransportMode
                  ? `${originLabel} → ${destinationLabel} · 왕복 1인 예상`
                  : "출발 이동수단 미선택",
          ],
          ...(localTransport && !usesRental && localTravelTotal
            ? [
                [
                  `${destinationLabel} ${selectedLocalTransportLabel}`,
                  localTravelTotal,
                  `${tripDurationLabel} 현지 이동 1인 예상`,
                ],
              ]
            : []),
          ...mealRows,
          ...activityRows,
        ],
      },
      {
        group: `공통 비용 · ${party}명 N/1`,
        rows: [
          ...(usesRental
            ? [
                [
                  `${selectedRental.company} 렌터카 · ${tripDurationLabel}`,
                  rentalFeePerPerson,
                  `${selectedRental.car} · ${party}명 분할`,
                ],
                [
                  "현지 주유·주차",
                  localFuelAndParkingPerPerson,
                  `${destinationLabel} 일정 약 ${itineraryDistanceKm}km · ${party}명 분할`,
                ],
              ]
            : selectedTransportMode === "CAR"
              ? [
                  [
                    "현지 주유·주차",
                    localFuelAndParkingPerPerson,
                    `${destinationLabel} 일정 약 ${itineraryDistanceKm}km · ${party}명 분할`,
                  ],
                ]
              : []),
          [
            selectedStay ? `${selectedStay.name} · ${nights}박` : "선택 숙소",
            stayTotal,
            selectedStay
              ? `1박 ${money(selectedStay.price)}원 · 객실 ${rooms}개 · ${party}명 분할`
              : "숙소 미선택",
          ],
        ],
      },
      ...(Object.entries(planEdits).length
        ? [
            {
              group: "장소 변경 반영 · 1인",
              rows: Object.entries(planEdits).map(([key, place]) => {
                const [dayIndex, stopIndex] = key.split("-").map(Number);
                const originalName =
                  baseDayPlans[dayIndex]?.[2]?.[stopIndex]?.[2] || "기존 장소";
                return [
                  place.name,
                  placeEntryCost(place.name) - placeEntryCost(originalName),
                  `${originalName} 대신 선택한 입장·체험비 차이`,
                ];
              }),
            },
          ]
        : []),
    ],
    [
      activityRows,
      baseDayPlans,
      destinationLabel,
      intercityTransportTotal,
      itineraryDistanceKm,
      localFuelAndParkingPerPerson,
      localTransport,
      localTravelTotal,
      mealRows,
      money,
      nights,
      originLabel,
      party,
      planEdits,
      rentalFeePerPerson,
      rooms,
      routeDistanceKm,
      selectedFlight,
      selectedLocalTransportLabel,
      selectedRental,
      selectedStay,
      selectedTransportLabel,
      selectedTransportMode,
      stayTotal,
      tripDurationLabel,
      usesRental,
    ],
  );
  const total = items.reduce((sum, item) => sum + item.total, 0);
  const confirmedTotal = selectedStay ? total : budgetStatus?.total || total;
  const confirmedInBudget = budget >= confirmedTotal;
  const gap = Math.abs(budget - total);
  const inBudget = budget >= total;
  const notify = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2600);
  };
  const submitPrompt = () => {
    if (!prompt.trim()) return notify("원하는 여행을 한 문장으로 적어주세요.");
    notify("AI가 입력한 여행 취향을 일정 추천에 반영할게요.");
  };
  const resetRouteBookings = () => {
    setFlightId("");
    setReturnFlightId("");
    setRentalId("");
    setStayId("");
    setTransport("");
    setLocalTransport("");
    setPlanEdits({});
  };
  const chooseDepartureDistrict = (region, district) => {
    setDepartureLocation({
      ...district,
      region: region.name || region.region,
      name: district.name || district.detail,
      detail: district.detail || district.name,
      airportCode: district.airportCode || district.airportCodes?.[0] || region.airportCode || "GMP",
    });
    setDepartureRegionId(region.id);
    setDepartureMenuOpen(false);
    setOrigin(district.airportCode || district.airportCodes?.[0] || region.airportCode || "GMP");
    resetRouteBookings();
    setTransportPromptReady(false);
    notify(`${region.name || region.region} ${district.detail || district.name} 출발을 저장했어요. 날짜와 이동수단을 이어서 선택해 주세요.`);
  };
  const useCurrentDepartureLocation = () => {
    const geolocation = window.navigator?.geolocation;
    if (!geolocation) {
      notify("이 브라우저에서는 현재 위치를 사용할 수 없어요. 권역 또는 주소로 선택해 주세요.");
      return;
    }
    notify("현재 위치를 확인하고 있어요.");
    geolocation.getCurrentPosition(
      ({ coords }) => {
        const closest = koreanRegions
          .flatMap((region) => region.districts.map((district) => ({ region, district })))
          .reduce((best, candidate) => {
            const latitudeGap = candidate.district.latitude - coords.latitude;
            const longitudeGap = (candidate.district.longitude - coords.longitude) * 0.8;
            const distance = latitudeGap ** 2 + longitudeGap ** 2;
            return !best || distance < best.distance ? { ...candidate, distance } : best;
          }, null);
        const region = closest?.region;
        const district = closest?.district;
        const airportCode = district?.airportCode || district?.airportCodes?.[0] || region?.airportCode || "GMP";
        setDepartureLocation({
          ...(district || {}),
          id: `gps-${Date.now()}`,
          countryCode: "KR",
          region: region?.name || "현재 위치",
          name: "현재 위치",
          detail: "현재 위치",
          latitude: coords.latitude,
          longitude: coords.longitude,
          airportCode,
          airportCodes: district?.airportCodes || region?.airportCodes || [airportCode],
          apiSearchKeyword: district?.apiSearchKeyword || "현재 위치",
          needsGeocoding: false,
          needsReverseGeocoding: true,
          locationSource: "gps",
        });
        setDepartureRegionId(region?.id || "");
        setDepartureMenuOpen(false);
        setOrigin(airportCode);
        resetRouteBookings();
        setTransportPromptReady(false);
        notify("현재 GPS 좌표를 출발지로 저장했어요. 주소명은 지도 API 역지오코딩 연결 시 더 정확하게 표시됩니다.");
      },
      () => notify("현재 위치 권한을 허용한 뒤 다시 시도해 주세요."),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 120000 },
    );
  };
  const chooseCustomDeparture = () => {
    const detail = customDeparture.trim();
    if (!detail) return notify("출발할 지역을 입력해 주세요.");
    setDepartureLocation({
      id: `custom-departure-${detail}`,
      region: detail,
      detail,
      countryCode: "KR",
      regionCode: null,
      latitude: null,
      longitude: null,
      airportCode: "GMP",
      airportCodes: ["GMP", "ICN"],
      needsGeocoding: true,
    });
    setDepartureRegionId("");
    setCustomDeparture("");
    setDepartureMenuOpen(false);
    setOrigin("GMP");
    resetRouteBookings();
    setTransportPromptReady(false);
    notify(`${detail} 출발 정보를 저장했어요. API 연동 시 좌표를 자동으로 찾을 수 있어요.`);
  };
  const chooseDestinationDistrict = (region, district) => {
    const nextLocation = {
      ...district,
      region: region.name || region.region,
      name: district.name || district.detail,
      detail: district.detail || district.name,
      countryCode: district.countryCode || "KR",
      regionCode: district.regionCode || region.regionCode,
      airportCode: district.airportCode || district.airportCodes?.[0] || region.airportCode || null,
      airportCodes: district.airportCodes || region.airportCodes || [],
      apiSearchKeyword: district.apiSearchKeyword || `${region.name || region.region} ${district.detail || district.name}`,
      needsGeocoding: false,
    };
    setDestination(nextLocation.detail);
    setDestinationLocation(nextLocation);
    setDestinationType("국내");
    setDestinationRegionId(region.id);
    setMenuOpen(false);
    setJejuBaseArea(nextLocation.regionCode === "KR-49" ? nextLocation.detail : "");
    setStayArea(nextLocation.regionCode === "KR-49" ? nextLocation.detail : "전체");
    setStaySearch("");
    resetRouteBookings();
    setTransportPromptReady(Boolean(endDate && travelers && departureLocation));
    if (!travelers) setTravelerPromptOpen(true);
    notify(`${nextLocation.region} ${nextLocation.detail} 기준으로 이동·숙소·일정 검색 조건을 설정했어요.`);
  };
  const chooseDestination = (placeInput) => {
    const selection = typeof placeInput === "string" ? { title: placeInput } : placeInput || {};
    const place = selection.lookupName || selection.title || selection.name || selection.detail;
    if (!place) return notify("도착지를 선택해 주세요.");
    const catalogLocation = destinationCoordinatesByName[place] || destinationCoordinatesByName[selection.title];
    const suppliedLocation = selection.location || selection;
    const hasStructuredLocation = Boolean(
      suppliedLocation.regionCode
      || (Number.isFinite(suppliedLocation.latitude) && Number.isFinite(suppliedLocation.longitude)),
    );
    const locationBase = hasStructuredLocation ? suppliedLocation : catalogLocation;
    const displayName = selection.title || selection.name || locationBase?.detail || place;
    const nextLocation = locationBase
      ? {
          ...locationBase,
          id: locationBase.id || `custom-destination-${displayName}`,
          countryCode: locationBase.countryCode || selection.countryCode || "KR",
          region: locationBase.region || selection.region || displayName,
          name: locationBase.name || selection.name || displayName,
          detail: locationBase.detail || selection.detail || displayName,
          image: selection.image || locationBase.image,
          apiSearchKeyword: locationBase.apiSearchKeyword || selection.apiSearchKeyword || displayName,
          needsGeocoding: Boolean(locationBase.needsGeocoding),
        }
      : {
          id: `custom-destination-${displayName}`,
          countryCode: selection.countryCode || (selection.scope === "overseas" || destinationType === "해외" ? "INTL" : "KR"),
          regionCode: null,
          region: displayName,
          name: displayName,
          detail: displayName,
          latitude: null,
          longitude: null,
          airportCodes: [],
          apiSearchKeyword: displayName,
          needsGeocoding: true,
        };
    const matchedRegion = koreanRegions.find((region) => region.regionCode === nextLocation.regionCode);
    setDestination(displayName);
    setDestinationLocation(nextLocation);
    setDestinationType(nextLocation.countryCode === "KR" ? "국내" : "해외");
    setDestinationRegionId(matchedRegion?.id || "");
    setMenuOpen(false);
    setJejuBaseArea(nextLocation.regionCode === "KR-49" ? nextLocation.detail : "");
    setStayArea(nextLocation.regionCode === "KR-49" ? nextLocation.detail : "전체");
    resetRouteBookings();
    setTransportPromptReady(Boolean(endDate && travelers && departureLocation));
    if (!travelers) setTravelerPromptOpen(true);
    notify(`${nextLocation.region} ${nextLocation.detail} 도착지를 저장했어요. 이동수단과 숙소 조건을 이어서 고를 수 있어요.`);
  };
  const chooseJejuBaseArea = (area, linkedStayArea = area) => {
    const option = jejuRegionOptions.find((item) => item.area === area);
    setJejuBaseArea(area);
    setDestinationLocation({
      ...(jejuRegionCoordinates[area] || {
        id: `jeju-custom-${area}`,
        region: "제주특별자치도",
        detail: area,
        latitude: null,
        longitude: null,
        needsGeocoding: true,
      }),
      image: option?.image || jejuCoastPhoto,
    });
    setStayArea(linkedStayArea);
    setStaySearch("");
    setJejuAreaModalOpen(false);
    setJejuRegionGuideOpen(false);
    setTransportPromptReady(Boolean(endDate && travelers && departureLocation));
    if (!travelers) setTravelerPromptOpen(true);
    notify(`${area} 여행을 기준으로 숙소와 동선을 추천할게요.`);
  };
  const chooseJejuCustomArea = () => {
    const area = jejuCustomArea.trim();
    if (!area) return notify("방문하고 싶은 제주 세부지역을 입력해 주세요.");
    chooseJejuBaseArea(area, "기타 지역");
    setJejuCustomArea("");
  };
  const chooseCustomDestination = () => {
    const place = customDestination.trim();
    if (!place) return;
    chooseDestination(place);
    setCustomDestination("");
  };
  const askAiForDestination = () => {
    setPrompt((current) => current.trim() || "여행 취향에 맞는 여행지를 추천해 주세요.");
    setMenuOpen(false);
    setDestinationRegionId("");
    window.setTimeout(() => document.getElementById("prompt")?.focus(), 0);
    notify("메인 자유 입력창에 AI 추천 요청을 넣었어요. 원하는 분위기나 예산을 더 적어주세요.");
  };
  const commitTravelers = () => {
    if (!travelerInput.trim()) {
      setTravelers(null);
      return;
    }
    const next = Math.min(
      20,
      Math.max(1, Math.floor(Number(travelerInput)) || 1),
    );
    setTravelerInput(String(next));
    setTravelers(next);
  };
  const confirmTravelers = () => {
    if (!travelerInput.trim()) return notify("여행 인원을 입력해 주세요.");
    commitTravelers();
    setTravelerPromptOpen(false);
    window.setTimeout(() => {
      const dateInput = document.querySelector("#trip-start-date");
      dateInput?.scrollIntoView({ behavior: "smooth", block: "center" });
      dateInput?.focus();
    }, 180);
  };
  const toggleTheme = (theme) =>
    setThemes((current) =>
      current.includes(theme)
        ? current.filter((item) => item !== theme)
        : [...current, theme],
    );
  const beginOriginQuestion = () => {
    if (!travelers) {
      setTravelerPromptOpen(true);
      return;
    }
    if (!departureLocation) {
      setDepartureMenuOpen(true);
      return notify("출발지를 먼저 선택해 주세요.");
    }
    if (!destinationLocation) {
      setMenuOpen(true);
      return notify("도착지와 세부지역을 먼저 선택해 주세요.");
    }
    if (!endDate) {
      const dateInput = document.querySelector("#trip-end-date");
      dateInput?.scrollIntoView({ behavior: "smooth", block: "center" });
      dateInput?.focus();
      return notify("출발일과 귀국일을 먼저 선택해 주세요.");
    }
    setTransportStep("mode");
    setTransportModalOpen(true);
  };
  const confirmSeoulOrigin = () => {
    setTransportStep("mode");
  };
  const chooseTransportMode = (mode) => {
    const selectedMode = outboundOptions.find((option) => option.id === mode);
    setTransport(mode);
    setLocalTransport("");
    if (mode === "FLIGHT") {
      setTransport("FLIGHT");
      setShowTimeFields(false);
      setFlightPickerLeg("outbound");
      setTransportModalOpen(false);
      setFlightOpen(true);
      return;
    }
    if (mode === "CAR") {
      setLocalTransport("CAR");
      setShowTimeFields(true);
      setTransportModalOpen(false);
      setPreferenceModalOpen(true);
      notify("자차 이동으로 설정했어요. 현지 이동수단 선택은 생략하고 여행 취향으로 이어갈게요.");
      return;
    }
    setShowTimeFields(true);
    setTransportStep("local");
    notify(
      `${selectedMode?.title || "선택한 교통수단"} 기준으로 출발·귀국 시간을 설정해 주세요. 이후 현지 이동수단도 이어서 고를 수 있어요.`,
    );
  };
  const chooseLocal = (mode) => {
    setLocalTransport(mode);
    setTransportModalOpen(false);
    if (mode === "RENTAL") setRentalOpen(true);
  };
  const chooseFlight = (id) => {
    if (flightPickerLeg === "outbound") {
      setFlightId(id);
      setFlightOpen(false);
      setFlightTransitionOpen(true);
      return;
    }
    setReturnFlightId(id);
    setFlightOpen(false);
    if (quickEditTarget === "flight") {
      setQuickEditTarget("");
      notify("왕복 항공편 변경이 반영됐어요. 다른 선택은 그대로 유지합니다.");
      return;
    }
    setTransportStep("local");
    setTransportModalOpen(true);
  };
  const chooseRental = (id) => {
    setRentalId(id);
    setRentalOpen(false);
    if (showPlan || quickEditTarget === "rental") {
      setQuickEditTarget("");
      notify("렌터카 선택이 반영됐어요. 숙소와 여행 취향은 그대로 유지합니다.");
      return;
    }
    setPreferenceModalOpen(true);
  };
  const estimateTotalWithStay = (stay) => {
    const nextRooms = Math.ceil(party / 3);
    const nextStayTotal = stay ? (stay.price * nights * nextRooms) / party : 0;
    return (
      (selectedFlight?.fare || 0) +
      nextStayTotal +
      driveTotal +
      foodTotal +
      activityTotal
    );
  };
  const chooseStay = (id) => {
    const stay = stays.find((item) => item.id === id);
    const previousStay = selectedStay;
    const nextTotal = stay ? estimateTotalWithStay(stay) : 0;
    setStayId(id);
    setQuickEditTarget("");
    setPlanEdits({});
    setStayOpen(false);
    if (showPlan && stay) {
      const didChangeStay = Boolean(
        previousStay && previousStay.id !== stay.id,
      );
      if (didChangeStay) setStayChange({ from: previousStay, to: stay });
      setPlanViewOpen(false);
      setPlanningMode("stay-revision");
      setPlanningStage("calculating");
      setPlanning(true);
      window.setTimeout(() => setPlanningStage("ready"), 1900);
      window.setTimeout(() => {
        setActiveDay(0);
        setPlanRevision((current) => current + 1);
        setShowPlan(true);
        setPlanning(false);
        setPlanViewOpen(true);
        if (didChangeStay) setStayChangePromptOpen(true);
        notify(
          `${stay.name} 기준으로 숙소 권역과 세부 경비를 새로 설계했어요.`,
        );
      }, 3100);
      return;
    }
    if (stay) {
      setBudgetStatus({
        total: nextTotal,
        inBudget: budget >= nextTotal,
        stay,
      });
      setBudgetConfirmationOpen(true);
    }
  };
  const openQuickEdit = (target) => {
    if (target === "dates") {
      document
        .querySelector(".date-field")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => {
        document.querySelector("#trip-start-date")?.focus();
      }, 220);
      notify(
        "날짜만 다시 선택할 수 있어요. 날짜가 바뀌면 항공편은 새 일정 기준으로 다시 골라주세요.",
      );
      return;
    }
    if (target === "flight") {
      if (!startDate || !endDate)
        return notify("출발일과 귀국일을 먼저 선택해 주세요.");
      setQuickEditTarget("flight");
      setFlightPickerLeg("outbound");
      setFlightOpen(true);
      return;
    }
    if (target === "rental") {
      setQuickEditTarget("rental");
      setLocalTransport("RENTAL");
      setRentalOpen(true);
      return;
    }
    if (target === "stay") {
      setQuickEditTarget("stay");
      setStayArea(jejuBaseArea || "전체");
      setStayOpen(true);
    }
  };
  const focusBookingPrerequisite = (target) => {
    const targetName = {
      transport: "교통수단",
      flight: "항공편",
      rental: "렌터카",
      stay: "숙소",
    }[target] || "비교 항목";

    if (!departureLocation) {
      setMenuOpen(false);
      setDepartureMenuOpen(true);
      document
        .querySelector("#departure-route-picker")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      notify(`${targetName} 비교 전에 출발지를 먼저 선택해 주세요.`);
      return false;
    }
    if (!destinationLocation) {
      setDepartureMenuOpen(false);
      setMenuOpen(true);
      document
        .querySelector(".route-destination-picker")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      notify(`${targetName} 비교 전에 도착지와 세부지역을 먼저 선택해 주세요.`);
      return false;
    }
    if (!travelers) {
      setTravelerPromptOpen(true);
      notify(`${targetName} 견적을 정확히 계산하려면 총인원을 먼저 입력해 주세요.`);
      return false;
    }
    if (!startDate || !endDate) {
      document
        .querySelector("#trip-end-date")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => {
        document.querySelector("#trip-end-date")?.focus();
      }, 180);
      notify(`${targetName} 비교 전에 출발일과 귀국일을 먼저 선택해 주세요.`);
      return false;
    }
    return true;
  };
  const openIndependentBooking = (target) => {
    if (!focusBookingPrerequisite(target)) return;

    if (target === "transport") {
      setTransportStep("mode");
      setTransportModalOpen(true);
      return;
    }
    if (target === "flight") {
      setTransport("FLIGHT");
      setShowTimeFields(false);
      setFlightPickerLeg(selectedOutboundFlight ? "return" : "outbound");
      setFlightOpen(true);
      return;
    }
    if (target === "rental") {
      setLocalTransport("RENTAL");
      setRentalOpen(true);
      return;
    }
    if (target === "stay") {
      setStayArea(destinationLocation?.detail || destinationLocation?.region || "전체");
      setStayOpen(true);
    }
  };
  const changePlanStop = (dayIndex, stopIndex, place) => {
    setPlanEdits((current) => ({
      ...current,
      [`${dayIndex}-${stopIndex}`]: place,
    }));
    setPlanRevision((current) => current + 1);
    notify(
      `${place.name} 기준으로 이동 동선과 1인 예상 경비를 다시 계산했어요.`,
    );
  };
  const itineraryEventCost = (name) =>
    eventPrice(name, {
      selectedFlight,
      selectedRental,
      selectedStay,
      party,
      rooms,
      nights,
    });
  const generate = async () => {
    if (!departureLocation) {
      setDepartureMenuOpen(true);
      return notify("출발지를 먼저 선택해 주세요.");
    }
    if (!destinationLocation)
      return notify("도착지와 세부지역을 먼저 선택해 주세요.");
    if (!endDate) return notify("귀국일을 먼저 선택해 주세요.");
    if (!travelers) return notify("총인원을 입력해 주세요.");
    if (!transport || !localTransport)
      return notify("이동수단 선택에서 출발 이동과 현지 이동을 골라주세요.");
    if (transport === "FLIGHT" && !selectedFlight)
      return notify("가는 편과 오는 편 항공편을 모두 선택해 주세요.");
    if (!selectedStay) return notify("숙소를 선택해 주세요.");
    setPlanningMode("create");
    setPlanning(true);
    setPlanningStage("calculating");
    if (import.meta.env.VITE_USE_MOCK === "false")
      await requestTripPlan({
        destination,
        originLocation: toApiLocation(departureLocation),
        destinationLocation: toApiLocation(destinationLocation),
        mapSearch: {
          origin: toApiLocation(departureLocation),
          destination: toApiLocation(destinationLocation),
        },
        flightSearch: {
          departureAirportCode: departureLocation.airportCode || origin,
          arrivalAirportCode: destinationAirport,
        },
        staySearch: {
          near: toApiLocation(destinationLocation),
          nights,
          guests: travelers,
        },
        startDate,
        endDate,
        startTime: scheduledStartTime,
        endTime: scheduledEndTime,
        travelers,
        total,
        pace,
        themes,
        transport,
        localTransport,
      });
    window.setTimeout(() => setPlanningStage("ready"), 1900);
    window.setTimeout(() => {
      setActiveDay(0);
      setPlanRevision((current) => current + 1);
      setShowPlan(true);
      setPlanning(false);
      setPlanViewOpen(true);
    }, 3100);
  };


  return {
    setDestinationType,
    destination,
    destinationLocation,
    destinationRegionId,
    setDestinationRegionId,
    menuOpen,
    setMenuOpen,
    departureLocation,
    departureRegionId,
    setDepartureRegionId,
    departureMenuOpen,
    setDepartureMenuOpen,
    customDeparture,
    setCustomDeparture,
    prompt,
    setPrompt,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    showTimeFields,
    travelers,
    setTravelers,
    travelerInput,
    setTravelerInput,
    travelerPromptOpen,
    setTravelerPromptOpen,
    budget,
    setBudget,
    pace,
    setPace,
    themes,
    heroSlideIndex,
    setHeroSlideIndex,
    setTransportPromptReady,
    jejuBaseArea,
    jejuCustomArea,
    setJejuCustomArea,
    jejuRegionGuideOpen,
    setJejuRegionGuideOpen,
    loginOpen,
    setLoginOpen,
    transport,
    localTransport,
    transportModalOpen,
    setTransportModalOpen,
    transportStep,
    setTransportStep,
    origin,
    setOrigin,
    flightOpen,
    setFlightOpen,
    flightPickerLeg,
    setFlightPickerLeg,
    flightTransitionOpen,
    setFlightTransitionOpen,
    flightSort,
    setFlightSort,
    flightId,
    setFlightId,
    returnFlightId,
    setReturnFlightId,
    rentalOpen,
    setRentalOpen,
    rentalId,
    preferenceModalOpen,
    setPreferenceModalOpen,
    stayTransitionOpen,
    setStayTransitionOpen,
    budgetConfirmationOpen,
    setBudgetConfirmationOpen,
    planPromptOpen,
    setPlanPromptOpen,
    budgetStatus,
    stayOpen,
    setStayOpen,
    stayArea,
    setStayArea,
    priceBand,
    setPriceBand,
    staySearch,
    setStaySearch,
    staySort,
    setStaySort,
    stayId,
    stayChange,
    stayChangePromptOpen,
    setStayChangePromptOpen,
    stayChangeCompareOpen,
    setStayChangeCompareOpen,
    showPlan,
    planViewOpen,
    setPlanViewOpen,
    planning,
    setQuickEditTarget,
    planningStage,
    planningMode,
    planRevision,
    setPlanRevision,
    activeDay,
    setActiveDay,
    message,
    destinationAirport,
    selectedOutboundFlight,
    selectedReturnFlight,
    selectedFlight,
    selectedRental,
    selectedStay,
    dates,
    nights,
    party,
    rooms,
    scheduledStartTime,
    scheduledEndTime,
    dayPlans,
    saleFirstFlights,
    filteredStays,
    costDetails,
    total,
    confirmedTotal,
    confirmedInBudget,
    gap,
    inBudget,
    notify,
    submitPrompt,
    chooseDepartureDistrict,
    useCurrentDepartureLocation,
    chooseCustomDeparture,
    chooseDestination,
    chooseJejuBaseArea,
    chooseJejuCustomArea,
    askAiForDestination,
    commitTravelers,
    confirmTravelers,
    toggleTheme,
    beginOriginQuestion,
    chooseTransportMode,
    chooseLocal,
    chooseFlight,
    chooseRental,
    chooseStay,
    openIndependentBooking,
    changePlanStop,
    itineraryEventCost,
    generate,
    resetTripDraft,
  };
}

export default useTripPlanner;
