import jejuCoastPhoto from "../assets/jeju-main-hero.jpeg";

// Mock catalog and state-independent planning helpers.
export const heroSlides = [
  {
    id: "santorini",
    label: "그리스 산토리니",
    src: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: "cappadocia",
    label: "튀르키예 카파도키아",
    src: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: "kyoto",
    label: "일본 교토 전통 거리",
    src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: "maldives",
    label: "몰디브 오버워터",
    src: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: "venice",
    label: "이탈리아 베네치아",
    src: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=2200&q=90",
  },
  {
    id: "lauterbrunnen",
    label: "스위스 라우터브루넨",
    src: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=2200&q=90",
  },
];

export const images = {
  jeju: jejuCoastPhoto,
  fukuoka:
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=90",
  bangkok:
    "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1600&q=90",
  newyork:
    "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1600&q=90",
  coast: "https://cdn.sisunnews.co.kr/news/photo/201810/91116_202218_2718.jpg",
};
export const destinations = [
  {
    id: "jeju",
    title: "제주도",
    city: "Jeju, Korea",
    tag: "돌하르방과 푸른 바다",
    image: images.jeju,
  },
  {
    id: "fukuoka",
    title: "후쿠오카",
    city: "Fukuoka, Japan",
    tag: "다자이후와 골목의 여유",
    image: images.fukuoka,
  },
  {
    id: "bangkok",
    title: "방콕",
    city: "Bangkok, Thailand",
    tag: "왓 아룬 너머의 노을",
    image: images.bangkok,
  },
  {
    id: "newyork",
    title: "뉴욕",
    city: "New York, USA",
    tag: "맨해튼의 화려한 하루",
    image: images.newyork,
  },
];
export const quickLinks = [
  {
    icon: "sparkles",
    title: "AI 일정 설계",
    text: "조건만 고르면 일정 완성",
    target: "#planner",
  },
  {
    icon: "plane",
    title: "항공권 비교",
    text: "출발지와 날짜별 비교",
    target: "#planner",
  },
  {
    icon: "home",
    title: "숙소 찾기",
    text: "취향에 맞는 숙소 한눈에",
    target: "#commerce-stays",
  },
  {
    icon: "ticket",
    title: "투어·액티비티",
    text: "테마파크부터 로컬 체험까지",
    target: "#commerce-tours",
  },
  {
    icon: "car",
    title: "교통·렌터카",
    text: "KTX부터 렌터카까지 편하게",
    target: "#commerce-passes",
  },
  {
    icon: "smartphone",
    title: "유심·eSIM",
    text: "데이터 끊김 없는 여행 준비",
    target: "#commerce-esim",
  },
];

const product = (id, title, location, tag, price, image, rating = "4.8", reviews = "2,410") => ({ id, title, location, tag, price, image, rating, reviews });
export const tourProducts = [
  product("tour-01", "스위스 알프스 패러글라이딩", "스위스 · 인터라켄", "하늘에서 만나는 알프스", 219000, "https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=600&auto=format&fit=crop"),
  product("tour-02", "도쿄 디즈니 리조트 패스", "일본 · 도쿄", "하루 종일 마법 같은 시간", 81000, "https://images.unsplash.com/photo-1560109947-543149eceb16?q=80&w=600&auto=format&fit=crop"),
  product("tour-03", "세부 프라이빗 호핑투어", "필리핀 · 세부", "에메랄드빛 섬 탐험", 65000, "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=600&auto=format&fit=crop"),
  product("tour-04", "파리 바토무슈 야경 크루즈", "프랑스 · 파리", "센강 위 파리의 밤", 32000, "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop"),
  product("tour-05", "런던 아이 패스트트랙", "영국 · 런던", "런던 스카이라인 한눈에", 74000, "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&auto=format&fit=crop"),
  product("tour-06", "도쿄 스카이트리 전망대", "일본 · 도쿄", "도쿄 최고층 파노라마", 28000, "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=600&auto=format&fit=crop"),
  product("tour-07", "뉴욕 탑오브더락 입장권", "미국 · 뉴욕", "맨해튼 대표 전망", 61000, "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?q=80&w=600&auto=format&fit=crop"),
  product("tour-08", "시드니 오페라하우스 투어", "호주 · 시드니", "아이코닉 건축 내부 탐방", 39000, "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=600&auto=format&fit=crop"),
  product("tour-09", "방콕 왕궁 & 에메랄드 사원", "태국 · 방콕", "태국 왕실 문화 산책", 25000, "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=600&auto=format&fit=crop"),
  product("tour-10", "오사카 유니버설 스튜디오", "일본 · 오사카", "인기 어트랙션 종일권", 89000, "https://images.unsplash.com/photo-1590559899731-a382839e5549?q=80&w=600&auto=format&fit=crop"),
  product("tour-11", "괌 돌핀 크루즈 & 스노클링", "미국 · 괌", "남태평양 가족 액티비티", 72000, "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop"),
  product("tour-12", "그랜드 캐년 헬기투어", "미국 · 애리조나", "대자연을 가장 가까이", 499000, "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop"),
  product("tour-13", "다낭 바나힐 왕복 투어", "베트남 · 다낭", "골든브리지와 테마파크", 58000, "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=600&auto=format&fit=crop"),
  product("tour-14", "사그라다 파밀리아 패스트트랙", "스페인 · 바르셀로나", "가우디 대표작 집중 관람", 54000, "https://images.unsplash.com/photo-1583779457094-ab6f77f7bf57?q=80&w=600&auto=format&fit=crop"),
  product("tour-15", "하와이 거북이 스노클링", "미국 · 하와이", "와이키키 바다 체험", 119000, "https://images.unsplash.com/photo-1507525428034-b723cf961d3e? q=80&w=600&auto=format&fit=crop".replace("? q", "?q")),
];
export const transportPasses = [
  product("pass-01", "유레일 글로벌 패스", "유럽 33개국", "모바일 연속 패스", 436000, "https://images.unsplash.com/photo-1473445361085-b9a07f55608b?q=80&w=600&auto=format&fit=crop"),
  product("pass-02", "오사카 메트로 패스", "일본 · 오사카", "지하철 무제한 탑승", 7500, "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=600&auto=format&fit=crop"),
  product("pass-03", "다낭 공항 단독 픽업", "베트남 · 다낭", "공항에서 숙소까지", 12000, "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=600&auto=format&fit=crop"),
  product("pass-04", "스위스 트래블 패스", "스위스 전역", "산악열차 할인 포함", 315000, "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=600&auto=format&fit=crop"),
  product("pass-05", "도쿄 서브웨이 티켓", "일본 · 도쿄", "24·48·72시간권", 8000, "https://images.unsplash.com/photo-1532236204992-f5e85c024202?q=80&w=600&auto=format&fit=crop"),
];
export const eSimProducts = [
  product("esim-01", "일본 데이터 eSIM", "일본 전역", "QR 즉시 발송", 5900, "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop"),
  product("esim-02", "유럽 33개국 쓰리심", "유럽 전역", "국가 이동에도 그대로", 27900, "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=600&auto=format&fit=crop"),
  product("esim-03", "베트남 공항수령 유심", "베트남 전역", "현지 번호 포함", 8900, "https://images.unsplash.com/photo-1526139334526-f591a54b477c?q=80&w=600&auto=format&fit=crop"),
  product("esim-04", "미국 무제한 데이터", "미국 전역", "5G 무제한 플랜", 43900, "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=600&auto=format&fit=crop"),
  product("esim-05", "대만 데이터 eSIM", "대만 전역", "개통부터 간편하게", 6900, "https://images.unsplash.com/photo-1470004914212-05527e49370b?q=80&w=600&auto=format&fit=crop"),
];
export const saleStays = [
  product("sale-01", "제주 신라호텔 오션뷰", "대한민국 · 제주", "무료 조식 · 오늘 마감", 280000, "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop"),
  product("sale-02", "반얀트리 방콕", "태국 · 방콕", "루프탑 · 무료 취소", 185000, "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=600&auto=format&fit=crop"),
  product("sale-03", "호시노야 도쿄", "일본 · 도쿄", "도심 온천 · 조식 포함", 650000, "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600&auto=format&fit=crop"),
  product("sale-04", "마리나 베이 샌즈", "싱가포르", "인피니티 풀 포함", 530000, "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600&auto=format&fit=crop"),
  product("sale-05", "파리 부티크 호텔", "프랑스 · 파리", "에펠탑 도보권", 249000, "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=600&auto=format&fit=crop"),
];
export const paceOptions = ["여유롭게", "보통", "빡빡하게"];
export const themeOptions = [
  {
    title: "맛집",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=88",
  },
  {
    title: "관광",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=500&q=88",
  },
  {
    title: "휴식",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=500&q=88",
  },
  {
    title: "자연",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=500&q=88",
  },
  {
    title: "액티비티",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=88",
  },
  {
    title: "쇼핑",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=500&q=88",
  },
];
export const jejuRegionOptions = [
  {
    area: "제주공항·시내",
    stayArea: "제주공항·시내",
    title: "제주공항·시내",
    description:
      "공항 10분 거리 도두동 무지개해안도로에서 제주의 바다를 먼저 만나요.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Yongduam_in_jeju.jpg?width=1600",
  },
  {
    area: "애월",
    stayArea: "애월",
    title: "애월",
    description: "애월 해안도로와 카페, 노을을 즐기기 좋아요.",
    image:
      "https://www.nexentire.com/webzine/201603/en/assets/images/contents/009_03.jpg?v=2",
  },
  {
    area: "협재·한림",
    stayArea: "협재·한림",
    title: "협재·한림",
    description: "협재 해변과 한림공원 중심의 서쪽 바다 여행이에요.",
    image: jejuCoastPhoto,
  },
  {
    area: "중문·서귀포",
    stayArea: "중문·서귀포",
    title: "중문·서귀포",
    description: "폭포·주상절리와 휴양을 함께 즐기는 남쪽 여행이에요.",
    image:
      "https://media.triple.guide/triple-cms/c_limit%2Cf_auto%2Ch_2048%2Cw_2048/897e9903-e344-47e1-93ea-b06a22b69ac9.jpeg",
  },
  {
    area: "성산·섭지코지",
    stayArea: "전체",
    title: "성산·섭지코지",
    description: "성산일출봉과 섭지코지의 동쪽 바다를 만나보세요.",
    image:
      "https://pimg.mk.co.kr/news/cms/202404/22/news-p.v1.20240422.7d69bb6b0f67423e8897b66d48dcfd1c_P1.jpg",
  },
  {
    area: "함덕·조천",
    stayArea: "전체",
    title: "함덕·조천",
    description: "에메랄드빛 함덕 바다와 조천 해안 풍경이에요.",
    image: "https://inblu.kr/uploads/place/640x/image_1637507654_56367.jpg",
  },
];
export const outboundOptions = [
  { id: "CAR", icon: "🚙", title: "자차", text: "유류비·통행료까지 계산" },
  { id: "KTX", icon: "🚆", title: "KTX", text: "철도 시간표 기반 비교" },
  { id: "FLIGHT", icon: "✈", title: "항공", text: "가는 편·오는 편 따로 비교" },
  { id: "BUS", icon: "🚌", title: "고속·시외버스", text: "노선과 환승 시간을 비교" },
];
export const localOptions = [
  { id: "RENTAL", icon: "🚗", title: "렌터카", text: "자유로운 동선 추천" },
  { id: "TRANSIT", icon: "🚌", title: "대중교통", text: "버스 중심으로 이동" },
  {
    id: "TAXI",
    icon: "🚕",
    title: "택시·카셰어링",
    text: "필요할 때만 편하게",
  },
  { id: "OTHER", icon: "＋", title: "기타", text: "직접 입력·나중에 결정" },
];
export const departureTimeOptions = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];
export const returnTimeOptions = [
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];
export const transportName = (id, options) =>
  options.find((option) => option.id === id)?.title || "미선택";

// API가 붙기 전에도 선택값에 따라 서로 다른 견적을 보여 주는 계산용 기준입니다.
// 실서비스에서는 routingApi / costApi 응답으로 같은 출력 구조만 교체합니다.
export const toRadians = (value) => (Number(value) * Math.PI) / 180;
export const distanceBetween = (from, to) => {
  if (!from || !to || from.latitude == null || to.latitude == null) return 180;
  const earthRadiusKm = 6371;
  const latitudeDelta = toRadians(to.latitude - from.latitude);
  const longitudeDelta = toRadians(to.longitude - from.longitude);
  const a =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(toRadians(from.latitude)) *
      Math.cos(toRadians(to.latitude)) *
      Math.sin(longitudeDelta / 2) ** 2;
  return Math.max(25, Math.round(earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))));
};

export const estimateIntercityFare = ({ mode, origin, destination, travelers = 1 }) => {
  const distance = distanceBetween(origin, destination);
  const party = Math.max(1, Number(travelers) || 1);
  const roundTripDistance = distance * 2;
  if (mode === "CAR") {
    const fuel = Math.round((roundTripDistance / 12.5) * 1750);
    const toll = Math.round(roundTripDistance * 74);
    return Math.ceil((fuel + toll) / party);
  }
  if (mode === "KTX") return Math.max(18000, Math.round(distance * 210 + 13000));
  if (mode === "BUS") return Math.max(12000, Math.round(distance * 145 + 9000));
  if (mode === "FERRY") return Math.max(28000, Math.round(distance * 180 + 22000));
  if (mode === "OTHER") return Math.max(0, Math.round(distance * 125));
  return 0;
};

export const demoStayImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=90",
];

export const demoStaysForLocation = (location) => {
  if (!location || location.regionCode === "KR-49") return stays;
  const area = location.detail || location.region || "선택 지역";
  return demoStayImages.map((image, index) => ({
    id: `mock-stay-${location.id || area}-${index}`,
    area,
    name: `${area} ${["스테이", "호텔", "레지던스", "부티크 호텔"][index]}`,
    price: [126000, 148000, 171000, 196000][index],
    image,
    rating: (4.82 - index * 0.05).toFixed(2),
    reviewCount: 1240 + index * 853,
    deal: index === 0 || index === 2,
    left: 2 + index,
    insight: `${area} 동선과 선택한 여행 기간을 기준으로 만든 시연 숙소 견적이에요.`,
    isMock: true,
  }));
};

export const demoRentalsForLocation = (location) => {
  if (!location || location.regionCode === "KR-49") return rentals;
  const area = location.detail || location.region || "선택 지역";
  return [
    ["현지 렌터카 특가", "경차 · 2박 3일", 96800, "완전자차 선택 가능", "영업소 10분 내 인수", "24시간 전 무료", "4.71"],
    ["지역 제휴 렌터카", "준중형 · 2박 3일", 132000, "일반자차 · 면책 30만원", "도심 영업소 인수", "48시간 전 무료", "4.78"],
    ["프리미엄 모빌리티", "SUV · 2박 3일", 176000, "완전자차 · 면책 0원", "숙소 배송 옵션", "24시간 전 무료", "4.86"],
  ].map(([company, car, price, insurance, pickup, cancellation, score], index) => ({
    id: `mock-rental-${location.id || area}-${index}`,
    company,
    car,
    price,
    originalPrice: Math.round(price * 1.26),
    discount: index === 0 ? 21 : 0,
    badge: index === 0 ? "시연 특가" : index === 1 ? "균형 추천" : "편의 추천",
    left: 3 + index,
    note: "2박 3일 · 48시간 · 더미 견적",
    insurance,
    fuel: "동일 연료 또는 충전량 반납",
    pickup,
    cancellation,
    score,
    reviews: 1800 + index * 901,
    age: "만 21세 · 1년",
    benefit: `${area} 기준으로 생성한 시연 차량 견적입니다. 실제 계약 전 보장 범위와 반납 조건을 확인하세요.`,
    image: rentalImages[["billycar", "jeju-pass", "lotte-rent"][index]],
    isMock: true,
  }));
};
export const rentals = [
  {
    id: "billycar",
    company: "빌리카",
    car: "더 뉴 레이 · 경차",
    price: 89800,
    originalPrice: 133000,
    discount: 32,
    badge: "오늘만 특가",
    left: 3,
    note: "2박 3일 48시간 · 시연 계약 조건 기준",
    insurance: "완전자차 · 면책 0원",
    fuel: "동일 연료 반납",
    pickup: "공항 셔틀 8분",
    cancellation: "24시간 전 무료",
    score: "4.82",
    reviews: 4821,
    age: "만 21세 · 1년",
    benefit: "최저가인데 완전자차 포함 · 단, 휴차보상료는 현장 약관 확인",
  },
  {
    id: "jeju-pass",
    company: "제주패스 렌터카",
    car: "K3 · 준중형",
    price: 112000,
    badge: "제휴 특가",
    left: 5,
    note: "2박 3일 48시간 · 시연 계약 조건 기준",
    insurance: "일반자차 · 면책 30만원",
    fuel: "동일 연료 반납",
    pickup: "공항 셔틀 10분",
    cancellation: "48시간 전 무료",
    score: "4.76",
    reviews: 3926,
    age: "만 21세 · 1년",
    benefit:
      "준중형 공간이 장점 · 사고 시 면책금과 보장 제외 항목을 확인하세요",
  },
  {
    id: "sk-rent",
    company: "SK렌터카 제주",
    car: "캐스퍼 · 경형 SUV",
    price: 128000,
    badge: "빠른 인수",
    left: 4,
    note: "2박 3일 48시간 · 시연 계약 조건 기준",
    insurance: "일반자차 · 면책 50만원",
    fuel: "동일 연료 반납",
    pickup: "공항 셔틀 7분",
    cancellation: "24시간 전 무료",
    score: "4.79",
    reviews: 3670,
    age: "만 21세 · 1년",
    benefit: "공항 셔틀 7분으로 인수 시간이 짧아요 · 보장 범위는 상품별 확인",
  },
  {
    id: "lotte-rent",
    company: "롯데렌터카 제주",
    car: "코나 · SUV",
    price: 156000,
    badge: "인기 차종",
    left: 2,
    note: "2박 3일 48시간 · 시연 계약 조건 기준",
    insurance: "완전자차 · 면책 0원",
    fuel: "동일 연료 반납",
    pickup: "오토하우스 셔틀",
    cancellation: "24시간 전 무료",
    score: "4.88",
    reviews: 6452,
    age: "만 21세 · 1년",
    benefit:
      "SUV·완전자차·오토하우스 인수로 편의성 강화 · 비싼 이유를 한눈에 비교",
  },
  {
    id: "d-rent",
    company: "디렌트카",
    car: "아반떼 · 준중형",
    price: 119000,
    badge: "후기 추천",
    left: 6,
    note: "2박 3일 48시간 · 시연 계약 조건 기준",
    insurance: "일반자차 · 면책 30만원",
    fuel: "동일 연료 반납",
    pickup: "공항 셔틀 12분",
    cancellation: "48시간 전 무료",
    score: "4.71",
    reviews: 2814,
    age: "만 21세 · 1년",
    benefit: "48시간 전 무료 취소가 강점 · 사고 보장 한도는 예약 전 확인",
  },
  {
    id: "free-rent",
    company: "자유렌터카",
    car: "니로 EV · 전기차",
    price: 144000,
    badge: "친환경 픽",
    left: 3,
    note: "2박 3일 48시간 · 시연 계약 조건 기준",
    insurance: "완전자차 · 면책 0원",
    fuel: "충전 70% 이상 반납",
    pickup: "공항 셔틀 10분",
    cancellation: "24시간 전 무료",
    score: "4.75",
    reviews: 3198,
    age: "만 26세 · 2년",
    benefit: "충전카드·완전자차 포함 · 반납 전 충전 잔량 조건을 확인하세요",
  },
];
export const rentalImages = {
  billycar:
    "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=900&q=88",
  "jeju-pass":
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=88",
  "sk-rent":
    "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=900&q=88",
  "lotte-rent":
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=88",
  "d-rent":
    "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=900&q=88",
  "free-rent":
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=88",
};
export const domestic = [
  "서울",
  "부산",
  "제주도",
  "전주",
  "경주",
  "여수",
  "가평·춘천",
  "속초",
];
export const overseas = [
  "후쿠오카",
  "방콕",
  "뉴욕",
  "오사카",
  "다낭",
  "타이베이",
  "파리",
  "시드니",
];
export const placePhotos = [
  images.coast,
  images.fukuoka,
  images.newyork,
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=88",
  images.jeju,
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=88",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=88",
  "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=900&q=88",
];
export const carriers = [
  [
    "대한항공",
    "KE 1201 · KE 1248",
    "07:15 → 08:25",
    "19:50 → 21:00",
    218000,
    "navy",
  ],
  [
    "아시아나항공",
    "OZ 8111 · OZ 8142",
    "08:25 → 09:35",
    "20:10 → 21:20",
    205000,
    "brown",
  ],
  [
    "제주항공",
    "7C 401 · 7C 432",
    "10:15 → 11:25",
    "20:40 → 21:50",
    142800,
    "orange",
  ],
  [
    "티웨이항공",
    "TW 501 · TW 536",
    "11:30 → 12:40",
    "19:05 → 20:15",
    148900,
    "red",
  ],
  [
    "대한항공",
    "KE 1211 · KE 1158",
    "12:50 → 14:00",
    "18:30 → 19:40",
    238000,
    "navy",
  ],
  [
    "진에어",
    "LJ 401 · LJ 430",
    "13:40 → 14:50",
    "20:15 → 21:25",
    154600,
    "green",
  ],
  [
    "에어부산",
    "BX 401 · BX 432",
    "14:30 → 15:40",
    "19:30 → 20:40",
    149800,
    "blue",
  ],
  [
    "대한항공",
    "KE 1131 · KE 1168",
    "16:05 → 17:15",
    "20:35 → 21:45",
    245000,
    "navy",
  ],
  [
    "이스타항공",
    "ZE 401 · ZE 436",
    "17:20 → 18:30",
    "21:05 → 22:15",
    139900,
    "purple",
  ],
  [
    "제주항공",
    "7C 111 · 7C 136",
    "18:10 → 19:20",
    "21:25 → 22:35",
    135800,
    "orange",
  ],
];
export const incheonCarriers = [
  [
    "대한항공",
    "KE 1107 · KE 1160",
    "10:00 → 11:15",
    "18:15 → 19:25",
    264000,
    "navy",
  ],
  [
    "아시아나항공",
    "OZ 8911 · OZ 8924",
    "07:50 → 09:00",
    "20:20 → 21:30",
    221000,
    "brown",
  ],
  [
    "진에어",
    "LJ 531 · LJ 548",
    "09:15 → 10:25",
    "19:35 → 20:45",
    168000,
    "green",
  ],
  [
    "제주항공",
    "7C 871 · 7C 886",
    "10:50 → 12:00",
    "21:05 → 22:15",
    151000,
    "orange",
  ],
  [
    "티웨이항공",
    "TW 721 · TW 738",
    "12:15 → 13:25",
    "18:10 → 19:20",
    159000,
    "red",
  ],
  [
    "에어부산",
    "BX 821 · BX 836",
    "13:40 → 14:50",
    "20:40 → 21:50",
    163000,
    "blue",
  ],
  [
    "대한항공",
    "KE 1119 · KE 1172",
    "15:10 → 16:20",
    "21:20 → 22:30",
    278000,
    "navy",
  ],
  [
    "이스타항공",
    "ZE 721 · ZE 736",
    "16:35 → 17:45",
    "19:10 → 20:20",
    146000,
    "purple",
  ],
  [
    "제주항공",
    "7C 883 · 7C 898",
    "18:05 → 19:15",
    "20:55 → 22:05",
    154000,
    "orange",
  ],
  [
    "진에어",
    "LJ 539 · LJ 556",
    "19:25 → 20:35",
    "22:10 → 23:20",
    171000,
    "green",
  ],
  [
    "제주항공",
    "7C 841 · 7C 848",
    "06:35 → 07:45",
    "08:20 → 09:30",
    137000,
    "orange",
  ],
  [
    "아시아나항공",
    "OZ 8935 · OZ 8940",
    "14:45 → 15:55",
    "10:35 → 11:45",
    214000,
    "brown",
  ],
];
export const flightDeals = {
  "GMP-2": { fare: 89900, originalFare: 169000, discount: 47, seats: 3 },
  "GMP-3": { fare: 94900, originalFare: 160900, discount: 41, seats: 4 },
  "ICN-0": { fare: 149000, originalFare: 264000, discount: 44, seats: 2 },
  "ICN-7": { fare: 99900, originalFare: 169900, discount: 41, seats: 3 },
};
export const flights = [
  ...carriers.map(([airline, code, out, back, fare, tone], index) => ({
    id: `GMP-${index}`,
    origin: "GMP",
    airline,
    code,
    out,
    back,
    originalFare: fare,
    fare: fare - 6000,
    tone,
  })),
  ...incheonCarriers.map(([airline, code, out, back, fare, tone], index) => ({
    id: `ICN-${index}`,
    origin: "ICN",
    airline,
    code,
    out,
    back,
    originalFare: fare,
    fare: fare - 6000,
    tone,
  })),
].map((flight) => ({ ...flight, ...(flightDeals[flight.id] || {}) }));
export const saleFlightIds = new Set(Object.keys(flightDeals));
export const isSaleFlight = (flight) => saleFlightIds.has(flight.id);
export const oneWayFare = (flight) => Math.round((flight?.fare || 0) / 2);
export const oneWayOriginalFare = (flight) =>
  Math.round((flight?.originalFare || flight?.fare || 0) / 2);
export const hotelImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1562790351-d273a961e0e9?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=90",
];
export const hotelPhotoOverrides = {
  "메종 글래드 제주":
    "https://tong.visitkorea.or.kr/cms/resource/59/2476659_image2_1.jpg",
  "롯데시티호텔 제주":
    "https://d2pyzcqibfhr70.cloudfront.net/images/0/2023-07-19/KEJG1T2NOrFDhHNeFzMmXzvjmlMk5WrYI7oTviX1.jpg",
  "호텔 난타 제주":
    "https://images.trvl-media.com/lodging/18000000/17370000/17363100/17363086/66e16674.jpg?impolicy=resizecrop&ra=fill&rh=575&rw=575",
  "호텔 리젠트마린 제주":
    "https://yaimg.yanolja.com/v5/2022/09/27/11/1280/6332e0447706b9.59126938.jpg",
  "마레보 비치 호텔":
    "https://yaimg.yanolja.com/v5/2024/12/17/03/1280/6760f4fe5d3889.80696667.jpg",
  "탐라스테이 호텔 제주":
    "https://yaimg.yanolja.com/v5/2022/09/01/14/1280/6310c11a953111.27194708.jpg",
  한림리조트:
    "https://images.trvl-media.com/lodging/6000000/5970000/5963800/5963738/9836e8c1.jpg?impolicy=resizecrop&ra=fill&rh=575&rw=575",
  "호텔 더 그랑 중문":
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/269097594.jpg?k=a71d4e65e24de3e8b631d897c8fa2a31670721618dcbed438d95c136a50e8aa1&o=",
  "제주 부영호텔&리조트":
    "https://cdn.ostrovok.ru/t/1200x616/content/75/72/7572c5144344c41e4c9d8f59411ca562a2e98c14.jpeg",
  "히든 클리프 호텔&네이쳐":
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/230411426.jpg?k=efef58e0d78db08d22efa503dfa12d003cd4631404646576c00567d777374fdc&o=",
};
export const hotelGroups = [
  [
    "제주공항·시내",
    [
      ["메종 글래드 제주", 185000],
      ["롯데시티호텔 제주", 198000],
      ["신라스테이 제주", 178000],
      ["호텔 난타 제주", 142000],
      ["호텔 리젠트마린 제주", 164000],
    ],
  ],
  [
    "애월",
    [
      ["마레보 비치 호텔", 190000],
      ["다인오세아노 호텔", 176000],
      ["탐라스테이 호텔 제주", 154000],
      ["스탠포드 호텔앤리조트 제주", 198000],
      ["애월 스테이 인 제주", 138000],
    ],
  ],
  [
    "협재·한림",
    [
      ["블루스프링 부띠끄 호텔", 168000],
      ["한림리조트", 149000],
      ["라온 호텔 앤 리조트", 156000],
      ["제주 라온프라이빗타운", 192000],
      ["한림오션캐슬", 134000],
    ],
  ],
  [
    "중문·서귀포",
    [
      ["호텔 더 그랑 중문", 172000],
      ["제주 부영호텔&리조트", 198000],
      ["히든 클리프 호텔&네이쳐", 199000],
      ["골든데이지 서귀포 오션 호텔", 139000],
      ["호텔 케니 서귀포", 126000],
    ],
  ],
];
hotelGroups.push(["기타 지역", []]);
export const stays = hotelGroups.flatMap(([area, list], region) =>
  list.map(([name, price], index) => {
    const order = region * 5 + index;
    return {
      id: `${region}-${index}`,
      area,
      name,
      price,
      image:
        hotelPhotoOverrides[name] || hotelImages[order % hotelImages.length],
      rating: (4.97 - order * 0.021).toFixed(2),
      reviewCount: 3460 + ((order * 317) % 4210),
      deal: [0, 6, 11, 17].includes(order),
      left: 2 + (order % 5),
      insight:
        region === 1
          ? "애월 해안 동선과 노을 시간에 잘 맞아요."
          : region === 2
            ? "협재·한림 해변을 둘러보기 좋은 위치예요."
            : region === 3
              ? "중문 관광지와 휴식 일정을 함께 즐기기 좋아요."
              : "공항 접근성과 첫날 동선이 편리해요.",
    };
  }),
);
export const days = [
  [
    "공항에서 애월의 노을까지",
    "첫날은 이동 시간을 여유롭게 두고 서쪽 바다를 만나요.",
    [
      [
        "10:10",
        "✈",
        "제주국제공항 도착",
        "수하물 수령 후, 미리 선택한 현지 이동 수단으로 여행을 시작해요.",
        "50분",
      ],
      [
        "11:05",
        "🚗",
        "렌터카 수령 · 출발 준비",
        "차량 상태와 보험을 확인하고 애월 방향으로 출발해요.",
        "35분",
      ],
      [
        "11:50",
        "🍚",
        "이춘옥 원조고등어쌈밥",
        "애월의 실제 고등어쌈밥 식당에서 첫 끼를 여유롭게 즐겨요.",
        "70분",
      ],
      [
        "13:25",
        "◌",
        "한담해안산책로",
        "곽지에서 한담까지 이어지는 바닷길을 천천히 걸어요.",
        "90분",
      ],
      [
        "15:20",
        "☕",
        "애월 카페 거리",
        "노을 시간 전, 바다 전망 카페에서 휴식과 사진 시간을 가져요.",
        "75분",
      ],
      [
        "17:20",
        "⌂",
        "선택한 숙소 체크인",
        "선택한 숙소 위치를 기준으로 동선을 마무리하고 잠시 쉬어가요.",
        "80분",
      ],
      [
        "19:10",
        "🍊",
        "애월 저녁 · 로컬 메뉴",
        "숙소와 가까운 지역 맛집에서 제주 첫날의 저녁을 즐겨요.",
        "90분",
      ],
    ],
  ],
  [
    "협재의 물빛과 제주 숲",
    "바다·초록·노을을 한 번에 담는 서쪽 중심의 하루예요.",
    [
      [
        "08:30",
        "🥐",
        "숙소 조식 · 출발 준비",
        "조식과 이동 시간을 고려해 여유롭게 하루를 열어요.",
        "60분",
      ],
      [
        "09:50",
        "⌇",
        "협재 해수욕장",
        "비양도가 보이는 얕고 맑은 바다에서 산책과 물빛을 즐겨요.",
        "100분",
      ],
      [
        "11:40",
        "◌",
        "금능해변 산책",
        "협재와 이어지는 조용한 해변에서 사진을 남겨요.",
        "55분",
      ],
      [
        "12:50",
        "🍜",
        "한림 로컬 점심",
        "오후 숲·오름 동선 전, 한림에서 가볍게 점심을 즐겨요.",
        "70분",
      ],
      [
        "14:20",
        "🌿",
        "오설록 티 뮤지엄",
        "녹차밭과 티 라운지에서 제주만의 쉼을 경험해요.",
        "95분",
      ],
      [
        "16:30",
        "◌",
        "새별오름",
        "해 질 무렵 가벼운 오름 산책으로 서쪽 풍경을 바라봐요.",
        "80분",
      ],
      [
        "18:30",
        "🍽",
        "제주 흑돼지 저녁",
        "하루의 마지막은 이동 동선을 줄인 저녁 식사로 마무리해요.",
        "100분",
      ],
    ],
  ],
  [
    "제주를 담아 돌아가는 날",
    "체크아웃부터 공항까지 여유 시간을 확보한 귀가 동선이에요.",
    [
      [
        "08:40",
        "⌂",
        "체크아웃 · 짐 정리",
        "출발 전 짐을 싣고 마지막 바다를 보기 위한 준비를 해요.",
        "35분",
      ],
      [
        "09:30",
        "◌",
        "곽지해수욕장",
        "체크아웃 뒤 마지막 바다 산책과 기념 사진을 남겨요.",
        "55분",
      ],
      [
        "10:45",
        "☕",
        "제주 로컬 카페",
        "공항 이동 전, 제주 감성이 남은 카페에서 잠시 쉬어가요.",
        "50분",
      ],
      [
        "11:50",
        "🍊",
        "동문시장",
        "선물과 제주 간식을 한곳에서 고르고 포장 시간을 확보해요.",
        "85분",
      ],
      [
        "13:30",
        "🍜",
        "제주시 로컬 점심",
        "공항 근처에서 가볍게 제주 한 끼를 즐겨요.",
        "65분",
      ],
      [
        "14:50",
        "🚗",
        "렌터카 반납 · 공항 이동",
        "주유와 차량 반납 시간을 여유 있게 포함했어요.",
        "50분",
      ],
      [
        "16:00",
        "✈",
        "제주국제공항 출발 준비",
        "수하물 위탁과 면세 쇼핑을 위한 여유 시간 후 귀가해요.",
        "출발",
      ],
    ],
  ],
];
export const money = (value) =>
  new Intl.NumberFormat("ko-KR").format(
    Math.round(Number.isFinite(value) ? value : 0),
  );
export const today = (() => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
})();
export const dateLabel = (date) => (date ? date.replaceAll("-", ". ") : "날짜 미선택");
export const timeLabel = (time) => time || "시간 미선택";
export const timeToMinutes = (time) => {
  const [hour = 0, minute = 0] = String(time || "00:00")
    .split(":")
    .map(Number);
  return hour * 60 + minute;
};
export const minutesToTime = (minutes) => {
  const normalized = ((Math.round(minutes) % 1440) + 1440) % 1440;
  return `${String(Math.floor(normalized / 60)).padStart(2, "0")}:${String(normalized % 60).padStart(2, "0")}`;
};
export const durationToMinutes = (duration) => Number.parseInt(duration, 10) || 55;
export const shiftDayTimes = (day, fromTime, toTime) => {
  const base = timeToMinutes(fromTime);
  const target = timeToMinutes(toTime);
  const delta = target - base;
  return [
    day[0],
    day[1],
    day[2].map(([time, ...rest]) => [
      minutesToTime(timeToMinutes(time) + delta),
      ...rest,
    ]),
  ];
};
export const scheduleEvent = (icon, name, detail, duration, travel = 15) => ({
  icon,
  name,
  detail,
  duration,
  travel,
});
export const makeSequentialPlan = (title, description, firstTime, rows) => {
  let cursor = timeToMinutes(firstTime);
  return [
    title,
    description,
    rows.map((row) => {
      const event = [
        minutesToTime(cursor),
        row.icon,
        row.name,
        row.detail,
        row.duration,
        row.travel,
      ];
      cursor += durationToMinutes(row.duration) + row.travel;
      return event;
    }),
  ];
};
export const stayProfileFor = (stay) => {
  const isHallim = stay?.area === "협재·한림";
  const isAewol = stay?.area === "애월";
  const isJungmun = stay?.area === "중문·서귀포";
  const stayName = stay?.name || "선택한 숙소";
  if (isHallim)
    return {
      key: "hallim",
      stayName,
      areaLabel: "한림",
      arrivalPlace: "협재해수욕장",
      arrivalDetail:
        "한림 숙소 체크인 전, 비양도가 보이는 해변에서 서쪽 바다를 먼저 만나요.",
      dinner: "한림 로컬 저녁",
      dinnerDetail: "협재·한림 권역 안에서 이동을 줄인 저녁 식사예요.",
      secondDay: [
        scheduleEvent(
          "🥐",
          "숙소 조식 · 출발 준비",
          "한림 숙소에서 조식 후, 해변과 숲 동선을 시작해요.",
          "60분",
          20,
        ),
        scheduleEvent(
          "◌",
          "금능해변 산책",
          "협재 바로 옆의 조용한 해변을 여유롭게 걸어요.",
          "80분",
          15,
        ),
        scheduleEvent(
          "🌿",
          "한림공원",
          "야자수 길과 정원을 천천히 둘러봐요.",
          "95분",
          20,
        ),
        scheduleEvent(
          "🍜",
          "한림 로컬 점심",
          "오설록 방향으로 이동 전, 한림에서 점심을 즐겨요.",
          "70분",
          40,
        ),
        scheduleEvent(
          "🍵",
          "오설록 티 뮤지엄",
          "녹차밭과 티 라운지에서 제주만의 쉼을 경험해요.",
          "100분",
          35,
        ),
        scheduleEvent(
          "◌",
          "새별오름",
          "노을 시간에 맞춰 서쪽 풍경을 바라봐요.",
          "80분",
          35,
        ),
        scheduleEvent(
          "🍽",
          "한림 흑돼지 저녁",
          "숙소 권역으로 돌아와 이동 없이 하루를 마무리해요.",
          "95분",
          15,
        ),
      ],
      departurePlace: "협재해수욕장",
      departureDetail: "체크아웃 뒤 숙소와 가까운 마지막 바다 산책이에요.",
    };
  if (isAewol)
    return {
      key: "aewol",
      stayName,
      areaLabel: "애월",
      arrivalPlace: "한담해안산책로",
      arrivalDetail:
        "애월 숙소 체크인 전, 곽지에서 한담까지 이어지는 바닷길을 걸어요.",
      dinner: "애월 로컬 저녁",
      dinnerDetail: "애월 숙소와 가까운 로컬 식당에서 첫날을 마무리해요.",
      secondDay: [
        scheduleEvent(
          "🥐",
          "숙소 조식 · 출발 준비",
          "애월 숙소에서 여유롭게 하루를 시작해요.",
          "60분",
          20,
        ),
        scheduleEvent(
          "◌",
          "곽지해수욕장",
          "한담과 이어지는 맑은 바다에서 산책과 사진을 즐겨요.",
          "85분",
          20,
        ),
        scheduleEvent(
          "☕",
          "애월 카페 거리",
          "오전 바다 전망 카페에서 잠시 쉬어가요.",
          "70분",
          45,
        ),
        scheduleEvent(
          "🌿",
          "오설록 티 뮤지엄",
          "녹차밭과 티 라운지에서 제주만의 쉼을 경험해요.",
          "100분",
          35,
        ),
        scheduleEvent(
          "◌",
          "새별오름",
          "해 질 무렵 가벼운 오름 산책을 해요.",
          "80분",
          35,
        ),
        scheduleEvent(
          "🍽",
          "애월 흑돼지 저녁",
          "숙소로 돌아가는 길에 저녁을 즐겨요.",
          "95분",
          15,
        ),
      ],
      departurePlace: "한담해안산책로",
      departureDetail: "체크아웃 후, 공항으로 향하기 전 마지막 바다를 만나요.",
    };
  if (isJungmun)
    return {
      key: "jungmun",
      stayName,
      areaLabel: "중문",
      arrivalPlace: "중문색달해수욕장",
      arrivalDetail:
        "히든 클리프 체크인 전, 중문색달의 해안 풍경을 보며 첫날 이동 피로를 가볍게 풀어요.",
      dinner: "중문 로컬 저녁",
      dinnerDetail:
        "숙소와 가까운 중문권 식당에서 이동을 줄여 첫날을 마무리해요.",
      firstDay: [
        scheduleEvent(
          "🍜",
          "중문 로컬 점심",
          "제주공항에서 렌터카를 인수한 뒤, 중문으로 이동해 첫 식사를 해요.",
          "75분",
          10,
        ),
        scheduleEvent(
          "⌂",
          "히든 클리프 호텔&네이쳐 체크인",
          "15시 체크인 시간에 맞춰 짐을 풀고, 중문·서귀포 중심 동선을 시작해요.",
          "50분",
          15,
        ),
        scheduleEvent(
          "💧",
          "천제연폭포",
          "히든 클리프에서 가까운 천제연폭포 산책로를 먼저 둘러봐요.",
          "75분",
          12,
        ),
        scheduleEvent(
          "🌊",
          "중문색달해수욕장",
          "해 질 무렵 색달해변의 파도와 해안 풍경을 즐겨요.",
          "70분",
          15,
        ),
        scheduleEvent(
          "🍽",
          "중문 흑돼지 저녁",
          "숙소와 가까운 중문권에서 이동을 줄여 첫날을 마무리해요.",
          "90분",
          15,
        ),
      ],
      secondDay: [
        scheduleEvent(
          "🥐",
          "숙소 조식 · 출발 준비",
          "중문 숙소에서 조식 후, 서귀포 핵심 명소를 시계 방향으로 둘러봐요.",
          "65분",
          18,
        ),
        scheduleEvent(
          "💧",
          "천제연폭포",
          "개장 시간에 맞춰 폭포 산책로를 먼저 둘러보고 혼잡을 피해요.",
          "85분",
          15,
        ),
        scheduleEvent(
          "🪨",
          "주상절리대",
          "중문에서 가까운 해안 절벽과 산책로를 여유 있게 즐겨요.",
          "75분",
          25,
        ),
        scheduleEvent(
          "🍜",
          "중문 로컬 점심",
          "오후 서귀포 동선 전, 중문권에서 식사와 휴식 시간을 확보해요.",
          "75분",
          35,
        ),
        scheduleEvent(
          "🌺",
          "카멜리아힐",
          "계절 정원 산책과 사진 촬영 시간을 충분히 배정해요.",
          "100분",
          45,
        ),
        scheduleEvent(
          "🌅",
          "산방산·용머리 해안",
          "노을 전 서귀포 서남부 해안 풍경을 보고 숙소 방향으로 돌아와요.",
          "90분",
          35,
        ),
        scheduleEvent(
          "🍽",
          "중문 흑돼지 저녁",
          "히든 클리프와 가까운 중문권에서 하루를 마무리해요.",
          "95분",
          15,
        ),
      ],
      departurePlace: "외돌개·황우지 해안",
      departureDetail:
        "체크아웃 뒤 서귀포 해안 산책을 짧게 즐긴 후 공항으로 향해요.",
    };
  return stayProfileFor({ area: "애월", name: stayName });
};
export const makeJejuDayPlans = (arrivalTime, endTime, stay, flight, dayCount = 3) => {
  const profile = stayProfileFor(stay);
  const arrivalAt = timeToMinutes(arrivalTime);
  const outboundCode = flight?.code?.split("·")[0]?.trim();
  const flightName = flight
    ? `제주국제공항 도착 · ${flight.airline}${outboundCode ? ` ${outboundCode}` : ""}`
    : "제주국제공항 도착";
  const flightDetail = flight
    ? `${flight.origin === "ICN" ? "인천" : "김포"} ${flight.out.slice(0, 5)} 출발 · 제주 ${flight.out.slice(-5)} 도착 항공편을 기준으로 수하물 수령과 현지 이동을 시작해요.`
    : "수하물 수령 후, 선택한 제주 이동 수단으로 여행을 시작해요.";
  const arrivalRows = [
    scheduleEvent("✈", flightName, flightDetail, "30분", 25),
    scheduleEvent(
      "🚗",
      "렌터카 수령 · 출발 준비",
      "차량 상태와 보험을 확인한 뒤 숙소 권역으로 출발해요.",
      "35분",
      profile.key === "jungmun" ? 45 : 35,
    ),
  ];
  if (profile.firstDay) arrivalRows.push(...profile.firstDay);
  else {
    if (arrivalAt <= 11 * 60 + 30)
      arrivalRows.push(
        scheduleEvent(
          "🍚",
          "이춘옥 원조고등어쌈밥",
          "늦지 않은 도착 시간이라 첫 끼를 먼저 즐긴 뒤 서쪽으로 이동해요.",
          "70분",
          20,
        ),
      );
    if (arrivalAt <= 15 * 60 + 30)
      arrivalRows.push(
        scheduleEvent(
          "◌",
          profile.arrivalPlace,
          profile.arrivalDetail,
          "85분",
          20,
        ),
      );
    arrivalRows.push(
      scheduleEvent(
        "⌂",
        `${profile.stayName} 체크인`,
        `${profile.areaLabel} 숙소를 기준으로 짐을 풀고 잠시 쉬어가요.`,
        "55분",
        20,
      ),
      scheduleEvent("🍽", profile.dinner, profile.dinnerDetail, "90분", 15),
    );
    if (arrivalAt <= 13 * 60)
      arrivalRows.splice(
        arrivalRows.length - 2,
        0,
        scheduleEvent(
          "☕",
          profile.key === "hallim" ? "협재 오션 카페" : "애월 카페 거리",
          "숙소 체크인 전, 바다를 보며 잠시 쉬어가요.",
          "60분",
          15,
        ),
      );
  }

  const departureMinutes = timeToMinutes(endTime);
  const earlyReturn = departureMinutes <= 13 * 60;
  const departureRows = earlyReturn
    ? [
        scheduleEvent(
          "⌂",
          "체크아웃 · 짐 정리",
          "귀국 시간이 이른 편이라 짐과 차량을 먼저 정리해요.",
          "35분",
          20,
        ),
        scheduleEvent(
          "🚗",
          "렌터카 반납 · 공항 이동",
          "주유와 차량 반납, 셔틀 이동 시간을 포함했어요.",
          "50분",
          10,
        ),
        scheduleEvent(
          "✈",
          "제주국제공항 출발 준비",
          "출발 90분 전 수하물 위탁과 탑승 준비를 마쳐요.",
          "출발",
          0,
        ),
      ]
    : [
        scheduleEvent(
          "⌂",
          "체크아웃 · 짐 정리",
          "숙소에서 짐을 정리한 뒤 마지막 제주 동선을 시작해요.",
          "35분",
          20,
        ),
        scheduleEvent(
          "◌",
          profile.departurePlace,
          profile.departureDetail,
          "65분",
          45,
        ),
        scheduleEvent(
          "🍊",
          "동문시장",
          "선물과 제주 간식을 한곳에서 고르고 포장 시간을 확보해요.",
          "80분",
          15,
        ),
        scheduleEvent(
          "🍜",
          "제주시 로컬 점심",
          "공항 근처에서 가볍게 제주 한 끼를 즐겨요.",
          "65분",
          35,
        ),
        scheduleEvent(
          "🚗",
          "렌터카 반납 · 공항 이동",
          "주유와 차량 반납, 셔틀 이동 시간을 포함했어요.",
          "50분",
          10,
        ),
        scheduleEvent(
          "✈",
          "제주국제공항 출발 준비",
          "출발 90분 전 수하물 위탁과 탑승 준비를 마쳐요.",
          "출발",
          0,
        ),
      ];
  const departureStart = earlyReturn
    ? Math.max(7 * 60 + 30, departureMinutes - 210)
    : Math.max(8 * 60 + 30, departureMinutes - 510);
  const firstDay = makeSequentialPlan(
      `공항에서 ${profile.areaLabel}의 첫날까지`,
      flight
        ? `${flight.airline} ${flight.out} 항공편 도착 후, 렌터카·체크인 순서를 현실적으로 배치했어요.`
        : "도착·인수·체크인 순서를 현실적으로 배치했어요.",
      minutesToTime(arrivalAt),
      arrivalRows,
    );
  const middleDays = Array.from({ length: Math.max(0, dayCount - 2) }, (_, index) =>
    makeSequentialPlan(
      `${profile.areaLabel} 중심의 제주 ${index + 2}일차`,
      "선택한 숙소 권역을 중심으로 대표 장소를 연결하고, 장기 일정에서도 하루 동선이 비지 않도록 구성했어요.",
      "08:30",
      profile.secondDay.map((row, rowIndex) =>
        rowIndex === 0 && index > 0
          ? { ...row, name: `${row.name} · 새로운 동선` }
          : { ...row },
      ),
    ),
  );
  const lastDay = makeSequentialPlan(
      "제주를 담아 돌아가는 날",
      "귀국 시각 90분 전 공항 도착을 기준으로 마지막 동선을 설계했어요.",
      minutesToTime(departureStart),
      departureRows,
    );
  return dayCount <= 1 ? [firstDay] : [firstDay, ...middleDays, lastDay];
};

// 지역을 선택한 뒤에는 특정 발표 시나리오가 아니라, 선택한 권역을 중심으로
// 기본 동선을 만듭니다. 실제 서비스에서는 이 프로필을 한국관광공사·지도 경로
// API 응답으로 대체할 수 있도록 장소/이동 시간을 분리해 두었습니다.
export const regionalTripProfiles = {
  "서울특별시": {
    focus: "서울 도심",
    arrival: ["🏯", "경복궁", "궁궐과 북촌을 한 동선으로 둘러보기 좋아요.", "85분", 20],
    dinner: ["🍽", "익선동 저녁", "도보 이동이 편한 골목 식당가에서 첫날을 마무리해요.", "90분", 15],
    dayTwo: [
      ["☕", "성수동 카페 거리", "서울숲과 함께 여유롭게 둘러보는 오전 동선이에요.", "75분", 25],
      ["🌿", "서울숲", "도심 속 산책과 휴식 시간을 확보해요.", "80분", 30],
      ["🍜", "한강 인근 점심", "오후 동선 전, 이동이 편한 권역에서 식사해요.", "70분", 35],
      ["🌇", "남산서울타워", "해 질 무렵 서울 전경을 감상하는 일정이에요.", "95분", 25],
      ["🍽", "을지로 저녁", "숙소 복귀가 편한 도심 식당가를 추천해요.", "90분", 15],
    ],
    departure: ["🛍", "광장시장", "귀가 전 간식과 선물을 둘러보기 좋은 마지막 동선이에요.", "75분", 35],
  },
  "부산광역시": {
    focus: "부산 해안",
    arrival: ["🌊", "해운대해수욕장", "바다를 보며 첫날 이동 피로를 가볍게 풀어요.", "80분", 25],
    dinner: ["🍽", "해운대 로컬 저녁", "숙소와 가까운 해운대권 식당가에서 마무리해요.", "90분", 15],
    dayTwo: [
      ["🏘", "감천문화마을", "아침 혼잡을 피해 골목 풍경을 먼저 둘러봐요.", "95분", 40],
      ["🌉", "송도해상케이블카", "해안 경관을 즐기며 이동 시간을 줄인 코스예요.", "75분", 35],
      ["🍜", "남포동 점심", "시장과 관광지 사이에서 식사 시간을 확보해요.", "70분", 30],
      ["🌁", "광안리 해변", "노을 전 광안대교 풍경을 즐겨요.", "85분", 20],
      ["🍽", "광안리 저녁", "해변 인근에서 하루를 마무리해요.", "90분", 20],
    ],
    departure: ["🛍", "국제시장", "귀가 전 부산 간식과 선물을 살펴봐요.", "75분", 35],
  },
  "대구광역시": {
    focus: "대구 도심",
    arrival: ["🎵", "김광석다시그리기길", "도심 산책으로 여행의 첫 리듬을 만들어요.", "75분", 20],
    dinner: ["🍽", "동성로 저녁", "숙소와 이동이 편한 중심 상권에서 마무리해요.", "90분", 15],
    dayTwo: [
      ["🌿", "앞산전망대", "오전 시간대에 대구 전경을 여유롭게 감상해요.", "95분", 35],
      ["🏛", "대구근대골목", "도보로 이어지는 근대문화 동선을 즐겨요.", "85분", 25],
      ["🍜", "서문시장 점심", "시장 먹거리와 함께 점심 시간을 확보해요.", "75분", 30],
      ["💡", "수성못", "저녁 전 호수 산책으로 이동 피로를 풀어요.", "80분", 25],
      ["🍽", "수성구 저녁", "숙소 복귀 동선을 고려한 저녁이에요.", "90분", 20],
    ],
    departure: ["🛍", "서문시장", "귀가 전 지역 먹거리와 선물을 둘러봐요.", "70분", 30],
  },
  "인천광역시": {
    focus: "인천 항구 도시",
    arrival: ["🏮", "인천 차이나타운", "개항장 역사 거리부터 가볍게 둘러봐요.", "80분", 20],
    dinner: ["🍽", "개항로 저녁", "개항장 인근 식당가에서 첫날을 마무리해요.", "90분", 15],
    dayTwo: [
      ["🏛", "개항장 문화지구", "역사 건축과 전시를 한 동선으로 둘러봐요.", "85분", 25],
      ["🌳", "송도센트럴파크", "수변 산책과 휴식 시간을 확보해요.", "90분", 25],
      ["🍜", "송도 점심", "공원 인근에서 이동을 줄여 식사해요.", "70분", 35],
      ["🌉", "월미도", "바다 전망과 야경을 즐기기 좋은 오후 코스예요.", "85분", 25],
      ["🍽", "인천항 저녁", "항구 인근에서 하루를 마무리해요.", "90분", 20],
    ],
    departure: ["🛍", "신포국제시장", "공항·역 이동 전 간식과 선물을 준비해요.", "70분", 30],
  },
  "광주광역시": {
    focus: "광주 문화",
    arrival: ["🏘", "양림동 역사문화마을", "고즈넉한 골목에서 첫날을 시작해요.", "80분", 20],
    dinner: ["🍽", "동명동 저녁", "카페·식당이 모인 동명동에서 여유롭게 마무리해요.", "90분", 15],
    dayTwo: [
      ["🏛", "국립아시아문화전당", "전시 관람 시간을 충분히 확보한 오전 일정이에요.", "100분", 20],
      ["🌿", "푸른길공원", "도심 산책으로 전시 뒤 휴식을 이어가요.", "70분", 30],
      ["🍜", "충장로 점심", "중심 상권에서 식사와 이동을 함께 해결해요.", "75분", 35],
      ["🏯", "무등산 증심사", "오후의 자연·문화 동선을 가볍게 즐겨요.", "95분", 35],
      ["🍽", "광주 로컬 저녁", "숙소 복귀가 편한 권역에서 마무리해요.", "90분", 15],
    ],
    departure: ["🛍", "1913송정역시장", "이동 전 시장 먹거리와 기념품을 둘러봐요.", "75분", 35],
  },
  "대전광역시": {
    focus: "대전 과학·도심",
    arrival: ["🌳", "한밭수목원", "도심 속 산책으로 가볍게 여행을 시작해요.", "75분", 20],
    dinner: ["🍽", "둔산동 저녁", "숙소와 가까운 중심 상권에서 첫날을 마무리해요.", "90분", 15],
    dayTwo: [
      ["🔬", "국립중앙과학관", "관람 시간을 넉넉히 잡은 과학 문화 코스예요.", "100분", 20],
      ["🌿", "엑스포과학공원", "수변 산책과 사진 시간을 함께 확보해요.", "80분", 25],
      ["🍜", "대전역 인근 점심", "오후 동선 전, 이동이 편한 곳에서 식사해요.", "70분", 30],
      ["☕", "소제동 카페 거리", "근대 건축과 카페를 함께 즐기는 휴식 코스예요.", "80분", 20],
      ["🍽", "은행동 저녁", "도심에서 하루를 여유롭게 마무리해요.", "90분", 20],
    ],
    departure: ["🥖", "성심당 본점", "이동 전 대표 빵과 선물을 준비해요.", "55분", 30],
  },
  "울산광역시": {
    focus: "울산 바다·산업",
    arrival: ["🌊", "대왕암공원", "해안 산책로를 따라 첫날 바다 풍경을 즐겨요.", "85분", 25],
    dinner: ["🍽", "일산해수욕장 저녁", "바다 인근에서 이동을 줄여 마무리해요.", "90분", 15],
    dayTwo: [
      ["🌊", "간절곶", "해가 좋은 오전에 동해안 풍경을 감상해요.", "95분", 40],
      ["🏛", "장생포고래문화마을", "울산만의 해양·산업 이야기를 만나는 코스예요.", "90분", 35],
      ["🍜", "태화강 점심", "강변 인근에서 여유롭게 식사해요.", "70분", 25],
      ["🌿", "태화강국가정원", "오후 산책과 휴식을 위한 코스예요.", "85분", 25],
      ["🍽", "삼산동 저녁", "숙소 복귀가 편한 중심 상권에서 마무리해요.", "90분", 20],
    ],
    departure: ["🛍", "울산중앙시장", "귀가 전 지역 먹거리와 선물을 둘러봐요.", "65분", 30],
  },
  "세종특별자치시": {
    focus: "세종 호수·정원",
    arrival: ["🌊", "세종호수공원", "수변 산책으로 여유롭게 첫날을 시작해요.", "80분", 20],
    dinner: ["🍽", "나성동 저녁", "생활권 중심 식당가에서 첫날을 마무리해요.", "90분", 15],
    dayTwo: [
      ["🌿", "국립세종수목원", "온실과 정원을 충분히 즐기는 오전 코스예요.", "100분", 25],
      ["🏛", "국립세종도서관", "건축과 전시를 함께 즐기는 휴식 일정이에요.", "65분", 20],
      ["🍜", "어진동 점심", "이동이 편한 정부청사 인근에서 식사해요.", "70분", 25],
      ["🌳", "금강보행교", "금강 풍경을 따라 오후 산책을 즐겨요.", "75분", 25],
      ["🍽", "세종 로컬 저녁", "숙소 주변에서 편안하게 마무리해요.", "90분", 15],
    ],
    departure: ["🛍", "세종전통시장", "이동 전 지역 먹거리와 선물을 살펴봐요.", "60분", 25],
  },
  "경기도": {
    focus: "경기 근교",
    arrival: ["🌳", "지역 대표 공원", "선택한 시·군과 가까운 산책 명소부터 가볍게 시작해요.", "80분", 25],
    dinner: ["🍽", "지역 로컬 저녁", "숙소와 가까운 생활권 식당에서 첫날을 마무리해요.", "90분", 15],
    dayTwo: [
      ["🏛", "지역 문화 명소", "선택한 시·군의 대표 문화 공간을 여유롭게 둘러봐요.", "90분", 30],
      ["🌿", "지역 자연 산책", "도심과 자연을 함께 즐기는 동선으로 구성했어요.", "80분", 25],
      ["🍜", "지역 로컬 점심", "오후 이동 전 가까운 권역에서 식사해요.", "70분", 35],
      ["☕", "지역 카페 거리", "여행 취향에 맞춘 휴식 시간을 확보해요.", "70분", 25],
      ["🍽", "지역 특색 저녁", "숙소 복귀 동선을 고려한 저녁이에요.", "90분", 20],
    ],
    departure: ["🛍", "지역 전통시장", "귀가 전 기념품과 간식을 둘러봐요.", "65분", 30],
  },
  "강원특별자치도": {
    focus: "강원 자연",
    arrival: ["🌊", "속초해변", "동해 바다를 보며 첫날 이동 피로를 풀어요.", "80분", 25],
    dinner: ["🍽", "속초 로컬 저녁", "숙소와 가까운 해안권 식당에서 마무리해요.", "90분", 15],
    dayTwo: [
      ["🏔", "설악산 국립공원", "오전 시간대에 자연 풍경을 여유롭게 즐겨요.", "110분", 45],
      ["🌊", "영금정", "동해안 전망과 산책을 이어가는 코스예요.", "75분", 25],
      ["🍜", "속초 중앙시장 점심", "시장 먹거리로 식사와 간식을 함께 해결해요.", "75분", 30],
      ["☕", "청초호 카페", "호수 전망을 보며 오후 휴식을 가져요.", "70분", 25],
      ["🍽", "강원 로컬 저녁", "숙소 권역에서 이동을 줄여 마무리해요.", "90분", 15],
    ],
    departure: ["🛍", "속초관광수산시장", "귀가 전 강원 특산품을 살펴봐요.", "65분", 30],
  },
  "충청북도": {
    focus: "충북 호수·도시",
    arrival: ["🌊", "청남대", "대청호 풍경과 함께 여유롭게 첫날을 시작해요.", "85분", 30],
    dinner: ["🍽", "청주 로컬 저녁", "숙소와 가까운 청주 중심권에서 마무리해요.", "90분", 15],
    dayTwo: [
      ["🏛", "국립청주박물관", "지역 역사와 문화를 만나는 오전 일정이에요.", "90분", 25],
      ["🌿", "상당산성", "성곽 산책과 도시 전망을 함께 즐겨요.", "85분", 25],
      ["🍜", "성안길 점심", "도심 상권에서 식사와 휴식을 이어가요.", "70분", 30],
      ["🍷", "청주공예비엔날레 권역", "전시·카페 등 취향에 맞춘 오후 시간을 보내요.", "80분", 25],
      ["🍽", "충북 로컬 저녁", "숙소 복귀 동선을 고려한 저녁이에요.", "90분", 15],
    ],
    departure: ["🛍", "육거리종합시장", "이동 전 지역 먹거리와 선물을 둘러봐요.", "65분", 30],
  },
  "충청남도": {
    focus: "충남 바다·역사",
    arrival: ["🏛", "공주 공산성", "역사 유적을 따라 가볍게 첫날을 시작해요.", "85분", 25],
    dinner: ["🍽", "공주 로컬 저녁", "숙소와 가까운 지역 식당에서 마무리해요.", "90분", 15],
    dayTwo: [
      ["🏛", "국립부여박물관", "백제 문화권을 이해하는 오전 코스예요.", "90분", 25],
      ["🌿", "궁남지", "호수 산책과 사진 시간을 확보해요.", "75분", 25],
      ["🍜", "부여 로컬 점심", "오후 이동 전 가까운 권역에서 식사해요.", "70분", 35],
      ["🌊", "대천해수욕장", "서해 풍경을 즐기며 여유로운 오후를 보내요.", "85분", 35],
      ["🍽", "충남 로컬 저녁", "숙소 복귀가 편한 곳에서 마무리해요.", "90분", 15],
    ],
    departure: ["🛍", "공주산성시장", "귀가 전 지역 특산품을 둘러봐요.", "65분", 30],
  },
  "전북특별자치도": {
    focus: "전북 한옥·미식",
    arrival: ["🏯", "전주한옥마을", "골목 산책으로 전주의 첫 풍경을 만나봐요.", "90분", 20],
    dinner: ["🍽", "전주 한정식 저녁", "한옥마을과 가까운 곳에서 첫날을 마무리해요.", "90분", 15],
    dayTwo: [
      ["🏛", "경기전", "한옥마을 안에서 역사와 건축을 함께 즐겨요.", "75분", 15],
      ["🌿", "전주향교", "조용한 골목으로 이어지는 오전 산책이에요.", "70분", 20],
      ["🍜", "남부시장 점심", "지역 먹거리로 식사와 간식을 함께 해결해요.", "75분", 30],
      ["☕", "자만벽화마을", "오후 사진·카페 시간을 확보해요.", "80분", 25],
      ["🍽", "전주 로컬 저녁", "숙소와 가까운 권역에서 마무리해요.", "90분", 15],
    ],
    departure: ["🛍", "전주남부시장", "귀가 전 전주 간식과 기념품을 살펴봐요.", "65분", 25],
  },
  "전라남도": {
    focus: "전남 해안",
    arrival: ["🌊", "여수 해상케이블카", "바다와 섬 풍경을 보며 첫날을 시작해요.", "80분", 25],
    dinner: ["🍽", "여수 낭만포차 거리", "해안 야경과 함께 첫날을 마무리해요.", "90분", 15],
    dayTwo: [
      ["🌿", "오동도", "동백숲과 해안 산책을 여유롭게 즐겨요.", "95분", 30],
      ["🏛", "여수 예술랜드", "바다 전망과 체험을 함께 즐기는 코스예요.", "85분", 25],
      ["🍜", "여수 게장 점심", "지역 대표 메뉴로 점심 시간을 확보해요.", "75분", 35],
      ["🌉", "돌산대교 전망", "노을 전 해안 드라이브·산책을 즐겨요.", "75분", 25],
      ["🍽", "전남 로컬 저녁", "숙소 권역에서 편안하게 마무리해요.", "90분", 15],
    ],
    departure: ["🛍", "여수수산시장", "귀가 전 해산물 간식과 선물을 둘러봐요.", "65분", 30],
  },
  "경상북도": {
    focus: "경북 역사",
    arrival: ["🏯", "불국사", "고즈넉한 사찰 풍경으로 첫날을 시작해요.", "90분", 25],
    dinner: ["🍽", "황리단길 저녁", "숙소와 가까운 경주 중심 상권에서 마무리해요.", "90분", 15],
    dayTwo: [
      ["🏛", "대릉원", "오전 산책으로 신라 문화권을 천천히 둘러봐요.", "80분", 20],
      ["🏯", "첨성대", "도보로 이어지는 대표 유적 동선이에요.", "65분", 20],
      ["🍜", "황리단길 점심", "오후 이동 전 지역 식사를 즐겨요.", "75분", 25],
      ["🌊", "동궁과 월지", "해질 무렵 야경이 아름다운 역사 명소예요.", "80분", 25],
      ["🍽", "경주 로컬 저녁", "숙소 복귀 동선을 고려한 저녁이에요.", "90분", 15],
    ],
    departure: ["🛍", "경주중앙시장", "귀가 전 지역 먹거리와 선물을 둘러봐요.", "65분", 30],
  },
  "경상남도": {
    focus: "경남 항구·자연",
    arrival: ["🌊", "동피랑 벽화마을", "항구를 내려다보는 골목에서 첫날을 시작해요.", "80분", 20],
    dinner: ["🍽", "통영 중앙시장 저녁", "해산물과 지역 음식을 즐기며 마무리해요.", "90분", 15],
    dayTwo: [
      ["🌊", "미륵산 케이블카", "오전 바다와 섬 풍경을 감상하는 코스예요.", "100분", 35],
      ["🏛", "통영 강구안", "항구 풍경과 문화공간을 둘러봐요.", "75분", 20],
      ["🍜", "통영 로컬 점심", "시장 인근에서 지역 메뉴를 즐겨요.", "75분", 30],
      ["🌿", "이순신공원", "바다 전망 산책으로 오후 여유를 가져요.", "85분", 25],
      ["🍽", "경남 로컬 저녁", "숙소와 가까운 권역에서 마무리해요.", "90분", 15],
    ],
    departure: ["🛍", "통영중앙시장", "귀가 전 지역 특산품을 살펴봐요.", "65분", 30],
  },
  default: {
    focus: "선택한 여행지",
    arrival: ["📍", "지역 대표 명소", "도착 후 선택한 여행지의 중심 명소부터 시작해요.", "80분", 25],
    dinner: ["🍽", "지역 로컬 저녁", "숙소와 가까운 식당에서 첫날을 마무리해요.", "90분", 15],
    dayTwo: [
      ["🌿", "지역 자연 명소", "여행지의 대표 자연 경관을 여유롭게 즐겨요.", "90분", 30],
      ["🏛", "지역 문화 명소", "문화·역사 공간을 한 동선으로 묶었어요.", "85분", 25],
      ["🍜", "지역 로컬 점심", "오후 일정 전 가까운 곳에서 식사해요.", "70분", 35],
      ["☕", "지역 카페 거리", "취향에 맞춘 휴식 시간을 확보해요.", "75분", 25],
      ["🍽", "지역 특색 저녁", "숙소 복귀가 편한 곳에서 마무리해요.", "90분", 15],
    ],
    departure: ["🛍", "지역 전통시장", "귀가 전 지역 먹거리와 기념품을 둘러봐요.", "65분", 30],
  },
};

export const locationLabel = (location, fallback = "선택한 여행지") =>
  location?.detail || location?.name || location?.region || fallback;

export const profileForLocation = (destinationLocation) => {
  const region = destinationLocation?.region || destinationLocation?.name;
  const detail = destinationLocation?.detail || "";
  if (region === "경기도" && detail.includes("파주")) {
    return {
      ...regionalTripProfiles["경기도"],
      focus: "파주 평화·예술",
      arrival: ["🕊", "임진각 평화누리", "파주의 대표 평화 문화 공간에서 여행을 시작해요.", "85분", 25],
      dinner: ["🍽", "헤이리 로컬 저녁", "예술마을 인근에서 이동을 줄여 마무리해요.", "90분", 15],
      dayTwo: [
        ["🏛", "헤이리 예술마을", "전시·서점·카페를 취향에 맞춰 즐겨요.", "100분", 25],
        ["🌳", "마장호수 출렁다리", "호수 전망 산책을 충분히 즐기는 자연 코스예요.", "90분", 35],
        ["🍜", "파주 로컬 점심", "오후 이동 전 가까운 권역에서 식사해요.", "70분", 30],
        ["☕", "출판도시 카페", "책과 건축을 함께 즐기는 휴식 시간이에요.", "75분", 20],
        ["🍽", "파주 로컬 저녁", "숙소 복귀가 편한 동선으로 마무리해요.", "90분", 15],
      ],
      departure: ["🛍", "파주 프리미엄 아울렛", "귀가 전 쇼핑·휴식 시간을 선택할 수 있어요.", "65분", 30],
    };
  }
  if (region === "경기도" && detail.includes("수원")) {
    return {
      ...regionalTripProfiles["경기도"],
      focus: "수원 역사·도심",
      arrival: ["🏯", "수원화성", "성곽 산책으로 수원의 첫 풍경을 만나봐요.", "85분", 20],
      dinner: ["🍽", "행궁동 저녁", "행리단길 인근에서 첫날을 마무리해요.", "90분", 15],
      dayTwo: [
        ["🏛", "화성행궁", "오전 관람으로 역사 동선을 여유 있게 시작해요.", "90분", 20],
        ["☕", "행궁동 카페 거리", "골목 카페와 편집숍을 함께 즐겨요.", "80분", 20],
        ["🍜", "수원 로컬 점심", "오후 이동 전 지역 메뉴를 즐겨요.", "70분", 25],
        ["🌿", "광교호수공원", "호수 산책으로 휴식 시간을 확보해요.", "85분", 25],
        ["🍽", "수원 갈비 저녁", "숙소 복귀 동선을 고려한 대표 메뉴 저녁이에요.", "90분", 15],
      ],
      departure: ["🛍", "팔달문시장", "귀가 전 지역 먹거리와 선물을 둘러봐요.", "65분", 25],
    };
  }
  return regionalTripProfiles[region] || regionalTripProfiles.default;
};

export const makeRegionalDayPlans = (
  arrivalTime,
  endTime,
  stay,
  flight,
  destinationLocation,
  originLocation,
  transport,
  dayCount = 3,
) => {
  const profile = profileForLocation(destinationLocation);
  const destination = locationLabel(destinationLocation);
  const origin = locationLabel(originLocation, "출발지");
  const arrivalAt = timeToMinutes(arrivalTime || "10:00");
  const arrivalTransport = transport || (flight ? "항공" : "선택한 교통수단");
  const flightCode = flight?.code?.split("·")[0]?.trim();
  const arrivalName = flight
    ? `${destination} 도착 · ${flight.airline}${flightCode ? ` ${flightCode}` : ""}`
    : `${destination} 도착`;
  const arrivalDetail = flight
    ? `${origin}에서 출발한 ${flight.out || "선택 항공편"}을 기준으로 도착·수하물 수령 시간을 반영했어요.`
    : `${origin}에서 ${arrivalTransport}으로 이동한 뒤, 선택한 지역의 실제 이동 시간을 반영해 여행을 시작해요.`;
  const arrivalRows = [scheduleEvent("✈", arrivalName, arrivalDetail, "30분", 25)];
  if (stay) {
    arrivalRows.push(
      scheduleEvent(
        stay?.area ? "🚗" : "🧭",
        stay?.area ? "현지 이동 · 체크인 준비" : "숙소 권역 이동 준비",
        "교통수단·숙소 위치를 기준으로 첫 이동 시간을 연결해요.",
        "35분",
        30,
      ),
    );
  }
  if (arrivalAt <= 15 * 60 + 30) {
    arrivalRows.push(
      scheduleEvent(profile.arrival[0], profile.arrival[1], profile.arrival[2], profile.arrival[3], profile.arrival[4]),
    );
  }
  if (stay) {
    arrivalRows.push(
      scheduleEvent(
        "⌂",
        `${stay.name} 체크인`,
        `${stay.area || destination} 숙소를 기준으로 짐을 풀고 잠시 쉬어가요.`,
        "55분",
        15,
      ),
    );
  }
  arrivalRows.push(
    scheduleEvent(profile.dinner[0], profile.dinner[1], profile.dinner[2], profile.dinner[3], profile.dinner[4]),
  );

  const departureMinutes = timeToMinutes(endTime || "18:00");
  const earlyReturn = departureMinutes <= 13 * 60;
  const departureRows = earlyReturn
    ? [
        scheduleEvent("⌂", "체크아웃 · 짐 정리", "귀국·귀가 시간이 이른 편이라 짐과 이동 준비를 먼저 마쳐요.", "35분", 25),
        scheduleEvent("🧭", "마지막 이동 · 출발지 이동", `${destination}에서 출발지로 돌아가기 위한 이동 시간을 반영했어요.`, "65분", 0),
      ]
    : [
        scheduleEvent("⌂", "체크아웃 · 짐 정리", "숙소에서 짐을 정리한 뒤 마지막 동선을 시작해요.", "35분", 20),
        scheduleEvent(profile.departure[0], profile.departure[1], profile.departure[2], profile.departure[3], profile.departure[4]),
        scheduleEvent("🍜", "출발 전 로컬 점심", "터미널·역·공항 이동 전 여유 있게 식사 시간을 확보해요.", "65분", 40),
        scheduleEvent("🧭", "출발지 이동 준비", `${origin}으로 돌아가는 ${arrivalTransport} 탑승·환승 시간을 반영했어요.`, "50분", 0),
      ];
  const departureStart = earlyReturn
    ? Math.max(7 * 60 + 30, departureMinutes - 190)
    : Math.max(8 * 60 + 30, departureMinutes - 420);

  const firstDay = makeSequentialPlan(
      `${destination}에 도착한 첫날`,
      `${origin}에서 출발한 ${arrivalTransport} 일정과 ${destination} 권역의 첫 이동을 연결했어요.`,
      minutesToTime(arrivalAt),
      arrivalRows,
    );
  const middleDays = Array.from({ length: Math.max(0, dayCount - 2) }, (_, index) =>
    makeSequentialPlan(
      `${profile.focus} 중심의 ${index + 2}일차`,
      "선택한 여행지의 대표 명소를 되돌아가지 않도록 같은 권역으로 묶었어요.",
      "09:00",
      [
        scheduleEvent("🥐", "숙소 조식 · 출발 준비", "숙소 위치와 다음 관광지의 이동 시간을 고려해 여유 있게 시작해요.", "60분", 20),
        ...profile.dayTwo.map(([icon, name, detail, duration, travel]) => scheduleEvent(icon, name, detail, duration, travel)),
      ],
    ),
  );
  const lastDay = makeSequentialPlan(
      `${destination}을 담아 돌아가는 날`,
      `${arrivalTransport} 출발 시각 전 이동·탑승 준비 시간을 반영해 마지막 동선을 설계했어요.`,
      minutesToTime(departureStart),
      departureRows,
    );
  return dayCount <= 1 ? [firstDay] : [firstDay, ...middleDays, lastDay];
};

export const makeDayPlans = (
  arrivalTime,
  endTime,
  stay,
  flight,
  destinationLocation,
  originLocation,
  transport,
  dayCount = 3,
) => {
  const isJejuDestination =
    destinationLocation?.regionCode === "KR-49" ||
    /제주/.test(`${destinationLocation?.region || ""} ${destinationLocation?.detail || ""}`);
  if (isJejuDestination || !destinationLocation)
    return makeJejuDayPlans(arrivalTime, endTime, stay, flight, dayCount);
  return makeRegionalDayPlans(
    arrivalTime,
    endTime,
    stay,
    flight,
    destinationLocation,
    originLocation,
    transport,
    dayCount,
  );
};

export const regionalPlaceAlternatives = {
  "서울특별시": [
    { icon: "🏯", name: "북촌한옥마을", detail: "궁궐과 가까운 전통 골목으로 동선을 다시 계산해요.", duration: "80분", travel: 25 },
    { icon: "🌳", name: "서울숲", detail: "성수권 자연 산책을 넣어 휴식 시간을 조정해요.", duration: "85분", travel: 30 },
    { icon: "🌇", name: "남산서울타워", detail: "도심 전망 코스로 바꾸고 이동·입장 시간을 반영해요.", duration: "95분", travel: 35 },
    { icon: "🛍", name: "광장시장", detail: "시장 먹거리와 간식 비용을 포함해 다시 설계해요.", duration: "75분", travel: 25 },
  ],
  "부산광역시": [
    { icon: "🌊", name: "해운대해수욕장", detail: "해안 산책을 넣어 부산 동선을 조정해요.", duration: "85분", travel: 25 },
    { icon: "🏘", name: "감천문화마을", detail: "골목 관광과 이동 시간을 함께 반영해요.", duration: "95분", travel: 40 },
    { icon: "🌉", name: "광안리 해변", detail: "야경·해변 산책 중심으로 오후 동선을 바꿔요.", duration: "80분", travel: 30 },
    { icon: "🛍", name: "국제시장", detail: "시장 방문과 간식 예산을 반영해요.", duration: "75분", travel: 25 },
  ],
  "경기도": [
    { icon: "🕊", name: "임진각 평화누리", detail: "파주 평화 문화권으로 이동 시간을 다시 계산해요.", duration: "85분", travel: 35 },
    { icon: "🏛", name: "헤이리 예술마을", detail: "전시·카페 중심으로 오후 동선을 조정해요.", duration: "95분", travel: 30 },
    { icon: "🌳", name: "마장호수 출렁다리", detail: "호수 산책을 넣어 자연 체험 시간을 반영해요.", duration: "90분", travel: 45 },
    { icon: "🏯", name: "수원화성", detail: "수원 역사 동선과 입장·이동 시간을 다시 계산해요.", duration: "90분", travel: 35 },
  ],
  default: [
    { icon: "📍", name: "지역 대표 관광지", detail: "한국관광공사 기반 대표 관광지 후보로 동선을 다시 계산해요.", duration: "90분", travel: 35 },
    { icon: "🌿", name: "지역 자연 명소", detail: "자연·휴식 취향을 반영해 이동 시간을 조정해요.", duration: "85분", travel: 30 },
    { icon: "🏛", name: "지역 문화 명소", detail: "전시·역사 공간을 포함해 일정과 경비를 재계산해요.", duration: "90분", travel: 30 },
    { icon: "🛍", name: "지역 전통시장", detail: "시장 식사·간식·선물 예산을 포함해 반영해요.", duration: "75분", travel: 25 },
  ],
};

export const getPlaceAlternatives = (destinationLocation) => {
  const region = destinationLocation?.region || destinationLocation?.name;
  const fallback = regionalPlaceAlternatives.default;
  return regionalPlaceAlternatives[region] || fallback;
};

export const placeAlternatives = [
  {
    icon: "🌅",
    name: "성산일출봉",
    image:
      "https://api.cdn.visitjeju.net/photomng/imgpath/201810/17/654ec69c-ca81-443d-9b10-3cfe4a8e98f0.webp",
    detail: "동부권 대표 명소를 중심으로 동선과 체험 예산을 다시 계산해요.",
    duration: "100분",
    travel: 65,
  },
  {
    icon: "🌺",
    name: "카멜리아힐",
    image:
      "https://api.cdn.visitjeju.net/photomng/imgpath/202410/15/fb2d2739-5e8e-4a87-9d1d-0281d95efeb7.jpg",
    detail: "계절 정원 산책을 넣어 서귀포권 이동 시간까지 반영해요.",
    duration: "95분",
    travel: 45,
  },
  {
    icon: "🖼",
    name: "아르떼뮤지엄 제주",
    image:
      "https://api.cdn.visitjeju.net/photomng/imgpath/202608/24/6d5b6c9d-8335-4442-979c-2f0cbb5504d4.webp",
    detail: "실내 전시 관람 시간과 입장권 예산을 포함해 다시 설계해요.",
    duration: "100분",
    travel: 35,
  },
  {
    icon: "🌊",
    name: "함덕해수욕장",
    image:
      "https://api.cdn.visitjeju.net/photomng/imgpath/201804/30/f4bb8c53-a598-4523-a34b-e591aa0f0a0e.webp",
    detail: "동부 바다 산책으로 바꾸고 공항·숙소 이동 거리를 재계산해요.",
    duration: "85분",
    travel: 55,
  },
  {
    icon: "🛍",
    name: "동문시장",
    image:
      "https://api.cdn.visitjeju.net/photomng/imgpath/202410/16/bdf6c336-fde3-4312-92be-7db8f3a37fbc.webp",
    detail: "제주시 시장 동선을 넣고 간식·선물 예상비용을 반영해요.",
    duration: "80분",
    travel: 25,
  },
  {
    icon: "☕",
    name: "애월 카페 거리",
    image:
      "https://storage.googleapis.com/public.firstage.ai/images/spots/KR/cafe/jeju-aewol-cafe-street-0.webp",
    detail: "바다 전망 카페 휴식 시간을 넣어 서부권 동선으로 조정해요.",
    duration: "70분",
    travel: 30,
  },
];

export const stayChangeSummaryFor = (change) => {
  const isJungmun = change?.to?.area === "중문·서귀포";
  if (isJungmun)
    return [
      {
        category: "숙소",
        title: "베이스캠프",
        before: change.from.name,
        after: change.to.name,
        note: "한림·협재 권역에서 중문·서귀포 권역으로 숙소 중심을 옮겼어요.",
      },
      {
        category: "식당",
        title: "식사 동선",
        before: "한림 로컬 점심 · 한림 흑돼지",
        after: "중문 로컬 점심 · 중문 흑돼지",
        note: "숙소와 가까운 식당으로 바꿔 저녁 이동과 대기 시간을 줄였어요.",
      },
      {
        category: "볼거리",
        title: "핵심 관광지",
        before: "협재해수욕장 · 한림공원 · 금능해변",
        after: "천제연폭포 · 주상절리대 · 중문색달해수욕장",
        note: "서쪽 해변 위주에서 중문 해안·폭포 중심 일정으로 새로 구성했어요.",
      },
      {
        category: "체험·휴식",
        title: "오후 프로그램",
        before: "오설록 티 뮤지엄 · 새별오름",
        after: "카멜리아힐 · 산방산·용머리 해안",
        note: "숙소 이동을 줄이면서 정원 산책과 서귀포 해안 풍경을 추가했어요.",
      },
    ];
  return [
    {
      category: "숙소",
      title: "베이스캠프",
      before: change?.from?.name || "기존 숙소",
      after: change?.to?.name || "새 숙소",
      note: "새 숙소 권역을 중심으로 체크인·식사·관광 순서를 다시 정리했어요.",
    },
    {
      category: "식당",
      title: "식사 동선",
      before: "기존 숙소 인근 식당",
      after: "새 숙소 인근 식당",
      note: "숙소와 식사 장소 사이의 불필요한 왕복을 줄였어요.",
    },
    {
      category: "볼거리",
      title: "관광지 구성",
      before: "기존 권역 관광지",
      after: "새 권역 관광지",
      note: "새 숙소와 가까운 대표 관광지를 중심으로 다시 묶었어요.",
    },
    {
      category: "체험·휴식",
      title: "여유 시간",
      before: "기존 휴식 장소",
      after: "새 숙소 주변 휴식 장소",
      note: "이동 시간을 줄여 실제 머무는 시간을 더 확보했어요.",
    },
  ];
};
export const applyPlanEdits = (plans, edits) =>
  plans.map((day, dayIndex) => {
    let cursor = timeToMinutes(day[2][0]?.[0] || "08:30");
    const rows = day[2].map((event, stopIndex) => {
      const replacement = edits[`${dayIndex}-${stopIndex}`];
      const source = replacement
        ? [
            event[0],
            replacement.icon,
            replacement.name,
            replacement.detail,
            replacement.duration,
            replacement.travel,
          ]
        : event;
      const next = [minutesToTime(cursor), ...source.slice(1)];
      cursor += durationToMinutes(source[4]) + (source[5] ?? 15);
      return next;
    });
    return [day[0], day[1], rows];
  });
export const placeEntryCost = (name) => {
  if (/아르떼뮤지엄|케이블카|서울타워|과학관|수목원/.test(name)) return 20000;
  if (/카멜리아힐|한림공원|박물관|화성행궁|경기전|공산성|불국사/.test(name)) return 10000;
  if (/동문시장|국제시장|광장시장|서문시장|남부시장|전통시장|중앙시장/.test(name)) return 14000;
  if (/오설록|카페/.test(name)) return 10000;
  if (/성산일출봉|공원|해수욕장|해안|호수|산책|전망/.test(name)) return 5000;
  return 0;
};
export const eventPrice = (
  name,
  { selectedFlight, selectedRental, selectedStay, party, rooms, nights },
) => {
  // 항공·렌터카·숙소는 해당 비용이 처음 발생하는 지점에서 한 번만 보여 줍니다.
  // 이렇게 해야 일정 카드의 금액과 오른쪽 1인 예산의 합계가 달라지지 않습니다.
  if ((name.includes("도착 ·") || name.includes("공항 도착")) && selectedFlight)
    return selectedFlight.fare || 0;
  if (name.includes("렌터카 수령") || name.includes("현지 이동 ·"))
    return selectedRental ? selectedRental.price / party : 0;
  if (name.includes("렌터카 반납")) return selectedRental ? 52000 / party : 0;
  if (name.includes("체크인"))
    return selectedStay ? (selectedStay.price * nights * rooms) / party : 0;
  if (name.includes("숙소 조식")) return 0;
  if (name.includes("이춘옥")) return 26000;
  if (name.includes("카페")) return 10000;
  if (name.includes("점심")) return 22000;
  if (name.includes("저녁")) return 30000;
  if (name.includes("한림 로컬 저녁") || name.includes("중문 로컬 저녁"))
    return 30000;
  if (name.includes("한림 로컬 점심") || name.includes("중문 로컬 점심"))
    return 20000;
  if (name.includes("흑돼지")) return 55000;
  if (name.includes("제주시 로컬 점심")) return 26000;
  if (name.includes("동문시장")) return 14000;
  if (name.includes("새별오름")) return 20000;
  return placeEntryCost(name);
};
export const getDates = (start, end) => {
  if (!start) return [];
  if (!end) return [start];
  const dates = [];
  const last = new Date(`${end}T00:00:00`);
  for (
    const day = new Date(`${start}T00:00:00`);
    day <= last && dates.length < 12;
    day.setDate(day.getDate() + 1)
  )
    dates.push(
      `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`,
    );
  return dates;
};
export const destinationImageByName = {
  서울: "https://anniehoa.com/Korea/Gyeongbokgung/Hall/3.jpg",
  경주:
    "https://cdn.welfarehello.com/naver-blog/production/gyeongju_e/2025-05/223857733508/gyeongju_e_223857733508_2.jpg?f=webp&q=80&w=1200",
  전주: "https://tour.jeonju.go.kr/images/visitjj/contents/streetmap/img_hanok00.jpg",
  제주도: jejuCoastPhoto,
  부산: "https://media.grandvoyage.com/__sized__/voyages/Viaje_a_Corea_del_Sur_de_9_dias__de_Seul_a_Busan_pM5Y5VD_urjfjJv-thumbnail_webp-1920x960.webp",
  // 실제 관광지의 분위기가 바로 느껴지도록 오동도와 남이섬 사진으로 교체했습니다.
  여수: "https://img.einet.kr/P202101006/travel/42924/01.jpg?v=1684740236",
  "가평·춘천":
    "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/463000/463964-Nami-Island.jpg?h=500&impolicy=fcrop&q=medium&w=1200",
  속초: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=90",
  후쿠오카:
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=90",
  방콕: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1400&q=90",
  뉴욕: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1400&q=90",
  오사카:
    "https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=1400&q=90",
  다낭: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1400&q=90",
  타이베이:
    "https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=1400&q=90",
  파리: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=90",
  시드니:
    "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1400&q=90",
};

// 도착지 모달용 UI 데이터입니다. 실제 좌표·공항 코드는 locationCatalog의 표준 데이터를 사용하고,
// 이 배열은 여행자가 빠르게 이해할 수 있는 사진·테마·검색 별칭만 담당합니다.
export const destinationExplorerItems = [
  { id: "destination-jeju", title: "제주도", lookupName: "제주도", subtitle: "제주시 · 협재 · 성산", tags: ["바다", "휴식", "맛집"], image: destinationImageByName["제주도"], countryCode: "KR", scope: "domestic" },
  { id: "busan-haeundae", title: "부산", lookupName: "부산", subtitle: "해운대 · 광안리", tags: ["바다", "맛집", "야경"], image: destinationImageByName["부산"], countryCode: "KR", scope: "domestic" },
  { id: "gangwon-gangneung", title: "강릉", lookupName: "강릉시", subtitle: "경포 · 안목", tags: ["바다", "카페", "드라이브"], image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=90", countryCode: "KR", scope: "domestic" },
  { id: "gangwon-sokcho", title: "속초", lookupName: "속초", subtitle: "설악산 · 영랑호", tags: ["자연", "바다", "힐링"], image: destinationImageByName["속초"], countryCode: "KR", scope: "domestic" },
  { id: "jeonnam-yeosu", title: "여수", lookupName: "여수", subtitle: "오동도 · 낭만포차", tags: ["바다", "야경", "맛집"], image: destinationImageByName["여수"], countryCode: "KR", scope: "domestic" },
  { id: "gyeongbuk-gyeongju", title: "경주", lookupName: "경주", subtitle: "황리단길 · 대릉원", tags: ["역사", "감성", "카페"], image: destinationImageByName["경주"], countryCode: "KR", scope: "domestic" },
  { id: "jeonbuk-jeonju", title: "전주", lookupName: "전주", subtitle: "한옥마을 · 남부시장", tags: ["맛집", "한옥", "산책"], image: destinationImageByName["전주"], countryCode: "KR", scope: "domestic" },
  { id: "destination-gapyeong-chuncheon", title: "가평·춘천", lookupName: "가평·춘천", subtitle: "남이섬 · 의암호", tags: ["자연", "데이트", "드라이브"], image: destinationImageByName["가평·춘천"], countryCode: "KR", scope: "domestic" },
  { id: "destination-fukuoka", title: "후쿠오카", lookupName: "후쿠오카", subtitle: "하카타 · 다자이후", tags: ["미식", "온천", "쇼핑"], image: destinationImageByName["후쿠오카"], countryCode: "JP", scope: "overseas" },
  { id: "destination-osaka", title: "오사카", lookupName: "오사카", subtitle: "난바 · 유니버설", tags: ["맛집", "쇼핑", "액티비티"], image: destinationImageByName["오사카"], countryCode: "JP", scope: "overseas" },
  { id: "destination-bangkok", title: "방콕", lookupName: "방콕", subtitle: "왓 아룬 · 짜오프라야", tags: ["도시", "미식", "힐링"], image: destinationImageByName["방콕"], countryCode: "TH", scope: "overseas" },
  { id: "destination-danang", title: "다낭", lookupName: "다낭", subtitle: "미케비치 · 호이안", tags: ["휴양", "바다", "가성비"], image: destinationImageByName["다낭"], countryCode: "VN", scope: "overseas" },
  { id: "destination-taipei", title: "타이베이", lookupName: "타이베이", subtitle: "시먼딩 · 야시장", tags: ["미식", "도시", "쇼핑"], image: destinationImageByName["타이베이"], countryCode: "TW", scope: "overseas" },
  { id: "destination-paris", title: "파리", lookupName: "파리", subtitle: "에펠탑 · 마레", tags: ["예술", "도시", "감성"], image: destinationImageByName["파리"], countryCode: "FR", scope: "overseas" },
  { id: "destination-sydney", title: "시드니", lookupName: "시드니", subtitle: "오페라하우스 · 본다이", tags: ["도시", "바다", "자연"], image: destinationImageByName["시드니"], countryCode: "AU", scope: "overseas" },
  { id: "destination-newyork", title: "뉴욕", lookupName: "뉴욕", subtitle: "맨해튼 · 센트럴파크", tags: ["도시", "문화", "쇼핑"], image: destinationImageByName["뉴욕"], countryCode: "US", scope: "overseas" },
];
