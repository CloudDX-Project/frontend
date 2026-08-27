import { useEffect, useMemo, useState } from "react";
import {
  BadgeDollarSign,
  CalendarCheck2,
  Hotel,
  Plane,
  UsersRound,
} from "lucide-react";
import { requestTripPlan } from "./api/tripPlanApi";
import {
  departureRegions,
  destinationCoordinatesByName,
  jejuRegionCoordinates,
  toApiLocation,
} from "./data/locationCatalog";
import jejuCoastPhoto from "./assets/jeju-main-hero.jpeg";

const heroSlides = [
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

const images = {
  jeju: jejuCoastPhoto,
  fukuoka:
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=90",
  bangkok:
    "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1600&q=90",
  newyork:
    "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1600&q=90",
  coast: "https://cdn.sisunnews.co.kr/news/photo/201810/91116_202218_2718.jpg",
};
const destinations = [
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
const quickLinks = [
  {
    icon: "✦",
    title: "AI 일정 설계",
    text: "조건만 고르면 일정 완성",
    target: "#planner",
  },
  {
    icon: "✈",
    title: "항공권 비교",
    text: "출발지와 날짜별 비교",
    target: "#planner",
  },
  {
    icon: "⌂",
    title: "숙소 찾기",
    text: "국내·해외 숙소 한눈에",
    target: "#planner",
  },
  {
    icon: "🚗",
    title: "렌터카·교통",
    text: "이동 수단부터 편하게",
    target: "#planner",
  },
  {
    icon: "☕",
    title: "맛집·카페",
    text: "여행지별 취향 추천",
    target: "#planner",
  },
  {
    icon: "♨",
    title: "온천·힐링",
    text: "온전한 쉼을 위한 여행",
    target: "#planner",
  },
];
const paceOptions = ["여유롭게", "보통", "빡빡하게"];
const themeOptions = [
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
const jejuRegionOptions = [
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
const outboundOptions = [
  { id: "CAR", icon: "🚙", title: "자차·선박", text: "내 차와 함께 이동" },
  { id: "FLIGHT", icon: "✈", title: "항공", text: "가장 빠른 제주 이동" },
  { id: "KTX", icon: "🚆", title: "KTX", text: "기차와 선박 연계" },
  { id: "BUS", icon: "🚌", title: "고속버스", text: "버스와 선박 연계" },
  { id: "OTHER", icon: "＋", title: "기타", text: "직접 입력·나중에 결정" },
];
const localOptions = [
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
const departureTimeOptions = [
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
const returnTimeOptions = [
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
const transportName = (id, options) =>
  options.find((option) => option.id === id)?.title || "미선택";
const rentals = [
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
const rentalImages = {
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
const domestic = [
  "서울",
  "부산",
  "제주도",
  "전주",
  "경주",
  "여수",
  "가평·춘천",
  "속초",
];
const overseas = [
  "후쿠오카",
  "방콕",
  "뉴욕",
  "오사카",
  "다낭",
  "타이베이",
  "파리",
  "시드니",
];
const placePhotos = [
  images.coast,
  images.fukuoka,
  images.newyork,
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=88",
  images.jeju,
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=88",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=88",
  "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=900&q=88",
];
const carriers = [
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
const incheonCarriers = [
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
const flightDeals = {
  "GMP-2": { fare: 89900, originalFare: 169000, discount: 47, seats: 3 },
  "GMP-3": { fare: 94900, originalFare: 160900, discount: 41, seats: 4 },
  "ICN-0": { fare: 149000, originalFare: 264000, discount: 44, seats: 2 },
  "ICN-7": { fare: 99900, originalFare: 169900, discount: 41, seats: 3 },
};
const flights = [
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
const saleFlightIds = new Set(Object.keys(flightDeals));
const isSaleFlight = (flight) => saleFlightIds.has(flight.id);
const oneWayFare = (flight) => Math.round((flight?.fare || 0) / 2);
const oneWayOriginalFare = (flight) =>
  Math.round((flight?.originalFare || flight?.fare || 0) / 2);
const hotelImages = [
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
const hotelPhotoOverrides = {
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
const hotelGroups = [
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
const stays = hotelGroups.flatMap(([area, list], region) =>
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
const days = [
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
const money = (value) =>
  new Intl.NumberFormat("ko-KR").format(
    Math.round(Number.isFinite(value) ? value : 0),
  );
const today = (() => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
})();
const dateLabel = (date) => (date ? date.replaceAll("-", ". ") : "날짜 미선택");
const timeLabel = (time) => time || "시간 미선택";
const timeToMinutes = (time) => {
  const [hour = 0, minute = 0] = String(time || "00:00")
    .split(":")
    .map(Number);
  return hour * 60 + minute;
};
const minutesToTime = (minutes) => {
  const normalized = ((Math.round(minutes) % 1440) + 1440) % 1440;
  return `${String(Math.floor(normalized / 60)).padStart(2, "0")}:${String(normalized % 60).padStart(2, "0")}`;
};
const durationToMinutes = (duration) => Number.parseInt(duration, 10) || 55;
const shiftDayTimes = (day, fromTime, toTime) => {
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
const scheduleEvent = (icon, name, detail, duration, travel = 15) => ({
  icon,
  name,
  detail,
  duration,
  travel,
});
const makeSequentialPlan = (title, description, firstTime, rows) => {
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
const stayProfileFor = (stay) => {
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
const makeDayPlans = (arrivalTime, endTime, stay, flight) => {
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
  return [
    makeSequentialPlan(
      `공항에서 ${profile.areaLabel}의 첫날까지`,
      flight
        ? `${flight.airline} ${flight.out} 항공편 도착 후, 렌터카·체크인 순서를 현실적으로 배치했어요.`
        : "도착·인수·체크인 순서를 현실적으로 배치했어요.",
      minutesToTime(arrivalAt),
      arrivalRows,
    ),
    makeSequentialPlan(
      `${profile.areaLabel} 중심의 제주 하루`,
      "선택한 숙소 권역을 중심으로 되돌아가는 이동을 줄였어요.",
      "08:30",
      profile.secondDay,
    ),
    makeSequentialPlan(
      "제주를 담아 돌아가는 날",
      "귀국 시각 90분 전 공항 도착을 기준으로 마지막 동선을 설계했어요.",
      minutesToTime(departureStart),
      departureRows,
    ),
  ];
};
const placeAlternatives = [
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

const stayChangeSummaryFor = (change) => {
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
const applyPlanEdits = (plans, edits) =>
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
const placeEntryCost = (name) => {
  if (name.includes("아르떼뮤지엄")) return 20000;
  if (name.includes("카멜리아힐")) return 10000;
  if (name.includes("동문시장")) return 14000;
  if (name.includes("오설록")) return 12000;
  if (name.includes("카페")) return 10000;
  if (name.includes("성산일출봉")) return 8000;
  return 0;
};
const eventPrice = (
  name,
  { selectedFlight, selectedRental, selectedStay, party, rooms, nights },
) => {
  // 항공·렌터카·숙소는 해당 비용이 처음 발생하는 지점에서 한 번만 보여 줍니다.
  // 이렇게 해야 일정 카드의 금액과 오른쪽 1인 예산의 합계가 달라지지 않습니다.
  if (name.includes("제주국제공항 도착")) return selectedFlight?.fare || 0;
  if (name.includes("렌터카 수령"))
    return selectedRental ? selectedRental.price / party : 0;
  if (name.includes("렌터카 반납")) return selectedRental ? 52000 / party : 0;
  if (name.includes("체크인"))
    return selectedStay ? (selectedStay.price * nights * rooms) / party : 0;
  if (name.includes("숙소 조식")) return 0;
  if (name.includes("이춘옥")) return 26000;
  if (name.includes("카페")) return 10000;
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
const getDates = (start, end) => {
  if (!start) return [];
  if (!end) return [start];
  const dates = [];
  const last = new Date(`${end}T00:00:00`);
  for (
    const day = new Date(`${start}T00:00:00`);
    day <= last && dates.length < 3;
    day.setDate(day.getDate() + 1)
  )
    dates.push(
      `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`,
    );
  return dates;
};
const destinationImageByName = {
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
function RouteMap({ activeDay, dayPlans }) {
  const selectedDay = dayPlans[activeDay] || dayPlans[0];
  const route = {
    label: selectedDay?.[0] || "제주 여행 동선",
    stops: (selectedDay?.[2] || [])
      .map(([, , name]) => name)
      .filter(
        (name) => !name.includes("체크아웃") && !name.includes("출발 준비"),
      )
      .slice(0, 6),
  };
  const encodedStops = route.stops.map((stop) =>
    encodeURIComponent(`${stop}, 제주특별자치도`),
  );
  const mapUrl = `https://www.google.com/maps?output=embed&f=d&saddr=${encodedStops[0]}&daddr=${encodedStops.slice(1).join("+to:")}`;
  const openMapUrl = `https://www.google.com/maps/dir/${route.stops.map((stop) => encodeURIComponent(`${stop}, 제주특별자치도`)).join("/")}`;

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
          title={`DAY ${activeDay + 1} 제주 동선 지도`}
          loading="lazy"
        />
        <b>DAY {activeDay + 1} ROUTE</b>
        <div className="route-stop-list">
          {route.stops.map((stop, index) => (
            <span key={stop}>
              <i>{index + 1}</i>
              {stop}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CampusTimetable({ dates, dayPlans }) {
  const hours = Array.from({ length: 16 }, (_, index) => index + 8);
  return (
    <div className="campus-timetable" aria-label="3일 통합 시간표">
      <div className="timetable-top">
        <span>TIME</span>
        {dates.map((date, index) => (
          <b key={date}>
            DAY {index + 1}
            <small>{date.slice(5).replace("-", ".")}</small>
          </b>
        ))}
      </div>
      <div className="timetable-content">
        <div className="timetable-hours">
          {hours.map((hour) => (
            <span key={hour}>{String(hour).padStart(2, "0")}:00</span>
          ))}
        </div>
        {dayPlans.map((day, dayIndex) => (
          <div className="timetable-day" key={day[0]}>
            {hours.map((hour) => (
              <i key={hour} />
            ))}
            {day[2].map(([time, icon, name, detail, duration]) => {
              const top = Math.max(0, timeToMinutes(time) - 8 * 60);
              const height = Math.max(46, durationToMinutes(duration));
              return (
                <article
                  key={`${dayIndex}-${time}-${name}`}
                  style={{ top: `${top}px`, height: `${height}px` }}
                >
                  <span>{icon}</span>
                  <b>{name}</b>
                  <small>
                    {time} · {duration}
                  </small>
                </article>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function TransitionIcon({ type }) {
  const Icon =
    type === "stay"
      ? Hotel
      : type === "budget"
        ? BadgeDollarSign
        : type === "flight"
          ? Plane
          : CalendarCheck2;

  return (
    <span
      className={`transition-icon transition-icon-${type}`}
      aria-hidden="true"
    >
      <Icon />
    </span>
  );
}

function PlanFullscreen({
  activeDay,
  costDetails,
  dates,
  dayPlans,
  endTime,
  eventCost,
  money,
  onChangeStop,
  onOpenStay,
  onOpenStayComparison,
  placeOptions,
  planRevision,
  selectedFlight,
  selectedRental,
  selectedStay,
  setActiveDay,
  setPlanRevision,
  setPlanViewOpen,
  startTime,
  stayChange,
  total,
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
  const isJungmunStay = selectedStay?.area === "중문·서귀포";
  const tripTitle = isJungmunStay ? (
    <>
      폭포와 바다를 담은
      <br />
      중문·서귀포 제주 여행
    </>
  ) : (
    <>
      바다와 맛집을 담은
      <br />
      친구들과의 제주 여행
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
          title: dayPlans[0]?.[0] || "제주 2박 3일 여행",
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
    const text = `얼마길 여행 일정 · ${dayPlans[0]?.[0] || "제주 2박 3일"}\n1인 예상 경비 ${money(total)}원 · ${travelers}명 여행`;
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
      aria-label="제주 전체 여행 일정"
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
          <b>제주 2박 3일 상세 일정</b>
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
          <p>JEJU, KOREA</p>
          <h2>{tripTitle}</h2>
          <span>
            {dateLabel(dates[0])} {timeLabel(startTime)} —{" "}
            {dateLabel(dates[dates.length - 1])} {timeLabel(endTime)}
          </span>
          <div className="full-booking-list">
            <b>
              ✈{" "}
              {selectedFlight
                ? `${selectedFlight.airline} 왕복`
                : "항공편 미선택"}
            </b>
            <b>
              ⌂{" "}
              {selectedStay
                ? `${selectedStay.name} · ${dates.length - 1}박`
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
          <RouteMap activeDay={activeDay} dayPlans={dayPlans} />
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
function BrandPolygon() {
  return (
    <span className="brand-mark brand-tri-pin" aria-hidden="true">
      <svg viewBox="0 0 64 64">
        <path
          className="tri-pin-a"
          d="M20 9c-6.4 0-11.5 5.1-11.5 11.5C8.5 30.7 20 42 20 42s11.5-11.3 11.5-21.5C31.5 14.1 26.4 9 20 9Z"
        />
        <circle className="tri-pin-hole" cx="20" cy="20.5" r="3.4" />
        <path className="tri-route" d="M24 43c6.2-7.3 12.4-6.1 17.1-1.7" />
        <path
          className="tri-pin-b"
          d="M45 26c-5.8 0-10.5 4.7-10.5 10.5C34.5 45.8 45 56 45 56s10.5-10.2 10.5-19.5C55.5 30.7 50.8 26 45 26Z"
        />
        <circle className="tri-pin-hole" cx="45" cy="36.5" r="3.1" />
      </svg>
    </span>
  );
}
function JejuRegionModal({
  currentArea,
  customArea,
  onClose,
  onChoose,
  onCustomAreaChange,
  onChooseCustom,
}) {
  return (
    <div className="ai-modal-backdrop" role="presentation">
      <section
        className="ai-modal jeju-area-modal jeju-region-guide"
        role="dialog"
        aria-modal="true"
        aria-labelledby="jeju-area-title"
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="제주 세부지역 선택 닫기"
        >
          ×
        </button>
        <p>✦ 얼마길 AI · JEJU REGION GUIDE</p>
        <h3 id="jeju-area-title">
          제주를 선택하셨네요!
          <br />
          제주 어느 지역을 방문하고 싶으세요?
        </h3>
        <span>
          머무를 지역을 먼저 고르면 관광지·숙소·이동 동선을 더 자연스럽게 이어서
          추천할 수 있어요.
        </span>
        <div className="jeju-area-options">
          {jejuRegionOptions.map((option) => (
            <button
              type="button"
              key={option.area}
              className={currentArea === option.area ? "active" : ""}
              onClick={() => onChoose(option.area, option.stayArea)}
            >
              <img
                src={option.image}
                alt={`${option.title} 관광지`}
                loading="lazy"
              />
              <div>
                <b>{option.title}</b>
                <small>{option.description}</small>
              </div>
            </button>
          ))}
          <button
            type="button"
            className="jeju-other-option"
            onClick={() =>
              document.querySelector("#jeju-custom-region")?.focus()
            }
          >
            <i>＋</i>
            <div>
              <b>기타 지역</b>
              <small>원하는 제주 세부지역을 직접 입력할 수 있어요.</small>
            </div>
          </button>
        </div>
        <label className="jeju-custom-field">
          <span>원하는 제주 세부지역 직접 입력</span>
          <div>
            <input
              id="jeju-custom-region"
              value={customArea}
              onChange={(event) => onCustomAreaChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  onChooseCustom();
                }
              }}
              placeholder="예: 표선, 우도, 안덕"
            />
            <button type="button" onClick={onChooseCustom}>
              이 지역으로 선택
            </button>
          </div>
        </label>
      </section>
    </div>
  );
}

function DepartureRegionMenu({
  activeRegionId,
  customDeparture,
  onBack,
  onChooseCustom,
  onChooseDistrict,
  onChooseRegion,
  onCustomDepartureChange,
}) {
  const activeRegion = departureRegions.find(
    (region) => region.id === activeRegionId,
  );

  return (
    <section
      className="route-location-menu departure-location-menu"
      aria-label="출발지 선택"
    >
      {activeRegion ? (
        <>
          <header className="location-menu-heading detail-heading">
            <button type="button" onClick={onBack}>
              ← 권역 다시 고르기
            </button>
            <div>
              <small>출발지 세부 선택</small>
              <b>{activeRegion.region}에서 어디서 출발하시나요?</b>
            </div>
          </header>
          <div className="departure-detail-grid">
            {activeRegion.districts.map((district) => (
              <button
                type="button"
                key={district.id}
                onClick={() => onChooseDistrict(activeRegion, district)}
              >
                <img src={district.image || activeRegion.image} alt="" />
                <span>
                  <b>{district.detail}</b>
                  <small>
                    {district.airportCode === "ICN" ? "인천공항" : "김포공항"} 기준
                    항공편 비교
                  </small>
                </span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <header className="location-menu-heading">
            <div>
              <small>출발지 권역</small>
              <b>어디서 출발하시나요?</b>
            </div>
            <span>시·도 → 세부 지역 순서로 선택</span>
          </header>
          <div className="departure-region-grid">
            {departureRegions.map((region) => (
              <button
                type="button"
                key={region.id}
                onClick={() => onChooseRegion(region.id)}
              >
                <img src={region.image} alt={`${region.region} 대표 관광지`} />
                <span>
                  <b>{region.region}</b>
                  <small>{region.districts.length}개 세부 지역 선택</small>
                </span>
                <i>→</i>
              </button>
            ))}
          </div>
        </>
      )}
      <label className="departure-custom">
        <span>원하는 출발지를 직접 입력할 수도 있어요.</span>
        <div>
          <input
            value={customDeparture}
            onChange={(event) => onCustomDepartureChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                onChooseCustom();
              }
            }}
            placeholder="예: 충청남도 천안시"
          />
          <button type="button" onClick={onChooseCustom}>
            직접 선택
          </button>
        </div>
      </label>
    </section>
  );
}

function App() {
  const [destinationType, setDestinationType] = useState("");
  const [destination, setDestination] = useState("");
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [customDestination, setCustomDestination] = useState("");
  const [departureLocation, setDepartureLocation] = useState(null);
  const [departureRegionId, setDepartureRegionId] = useState("");
  const [departureMenuOpen, setDepartureMenuOpen] = useState(false);
  const [customDeparture, setCustomDeparture] = useState("");
  const [prompt, setPrompt] = useState("");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");
  const [showTimeFields, setShowTimeFields] = useState(false);
  const [travelers, setTravelers] = useState(null);
  const [travelerInput, setTravelerInput] = useState("");
  const [travelerPromptOpen, setTravelerPromptOpen] = useState(false);
  const [budget, setBudget] = useState(900000);
  const [pace, setPace] = useState("보통");
  const [themes, setThemes] = useState(["맛집", "관광"]);
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
      destination === "제주도" &&
      departureLocation &&
      endDate &&
      transportPromptReady
    ) {
      setTransportStep("flight-question");
      setTransportModalOpen(true);
      setTransportPromptReady(false);
    }
  }, [departureLocation, destination, endDate, transportPromptReady]);
  useEffect(() => {
    if (!jejuAreaModalOpen) return;
    setJejuAreaModalOpen(false);
    setJejuRegionGuideOpen(true);
  }, [jejuAreaModalOpen]);
  const [transport, setTransport] = useState("");
  const [localTransport, setLocalTransport] = useState("");
  const [transportModalOpen, setTransportModalOpen] = useState(false);
  const [transportStep, setTransportStep] = useState("flight-question");
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
  const isJeju = destination === "제주도";
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
  const selectedRental = rentals.find((rental) => rental.id === rentalId);
  const selectedStay = stays.find((stay) => stay.id === stayId);
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
      ),
    [scheduledArrivalTime, scheduledEndTime, selectedFlight, selectedStay],
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
  const filteredStays = stays
    .filter(
      (stay) =>
        priceBand === "10-20" &&
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
  const mealRows = isJungmunStay
    ? [
        ["중문 로컬 점심 · 1일차", 26000, "중문권 1인 식사 예상"],
        [
          "중문 흑돼지 저녁 · 1일차",
          55000,
          "첫날 숙소 인근 흑돼지 180g + 곁들임 기준",
        ],
        ["중문 로컬 점심 · 2일차", 20000, "둘째 날 이동 전 가벼운 식사 기준"],
        ["중문 흑돼지 저녁 · 2일차", 55000, "중문 숙소 인근 저녁 1인 기준"],
        ["동문시장 간식·선물", 14000, "간식과 소형 기념품 1인 예상"],
        ["제주시 로컬 점심", 26000, "공항 이동 전 1인 식사 기준"],
      ]
    : [
        ["이춘옥 원조고등어쌈밥", 26000, "고등어쌈밥 1인 정식 예상"],
        ["애월 카페 · 음료", 10000, "바다 전망 카페 음료 1잔 기준"],
        ["한림 로컬 저녁", 30000, "첫날 숙소 인근 로컬 메뉴 1인 기준"],
        ["한림 로컬 점심", 20000, "국수·해산물 식사 1회 기준"],
        ["한림 흑돼지 저녁", 55000, "흑돼지 180g + 곁들임 1인 기준"],
        ["동문시장 간식·선물", 14000, "간식과 소형 기념품 1인 예상"],
        ["제주시 로컬 점심", 26000, "공항 이동 전 1인 식사 기준"],
      ];
  const activityRows = isJungmunStay
    ? [
        ["카멜리아힐 입장·체험", 10000, "계절 정원 입장권 1인 기준"],
        ["천제연폭포·색달해변", 0, "산책 중심의 무료 관광 일정"],
      ]
    : [
        ["오설록 티 체험", 12000, "티 라운지 시음·디저트 1인 기준"],
        ["새별오름 노을 산책", 20000, "주차·간식·현지 체험비 포함"],
        ["협재·금능 해변 산책", 0, "해변 산책 중심의 무료 일정"],
      ];
  const foodTotal = isJeju
    ? mealRows.reduce((sum, [, value]) => sum + value, 0)
    : 0;
  const activityTotal = isJeju
    ? Math.max(
        0,
        activityRows.reduce((sum, [, value]) => sum + value, 0) +
          placeEditAdjustment,
      )
    : 0;
  const stayTotal = selectedStay
    ? (selectedStay.price * nights * rooms) / party
    : 0;
  const driveTotal = selectedRental
    ? (selectedRental.price + 52000) / party
    : 0;
  const items = useMemo(
    () => [
      {
        name: "항공",
        total: selectedFlight ? selectedFlight.fare : 0,
        color: "flight",
      },
      { name: "숙소", total: stayTotal, color: "stay" },
      { name: "렌터카·주유", total: driveTotal, color: "drive" },
      { name: "식비", total: foodTotal, color: "food" },
      { name: "관광·체험", total: activityTotal, color: "play" },
    ],
    [activityTotal, driveTotal, foodTotal, selectedFlight, stayTotal],
  );
  const costDetails = useMemo(
    () => [
      {
        group: "개인 비용",
        rows: [
          [
            "왕복 항공권",
            selectedFlight ? selectedFlight.fare : 0,
            selectedFlight
              ? `${selectedFlight.origin === "GMP" ? "김포" : "인천"} ↔ 제주 · 왕복 1인`
              : "항공편 미선택",
          ],
          ...mealRows,
          ...activityRows,
        ],
      },
      {
        group: `공통 비용 · ${party}명 N/1`,
        rows: [
          [
            "렌터카 48시간",
            selectedRental ? selectedRental.price / party : 0,
            selectedRental
              ? `${selectedRental.company} · ${selectedRental.car} · ${party}명 분할`
              : "렌터카 미선택",
          ],
          [
            "주유·주차",
            selectedRental ? 52000 / party : 0,
            `${isJungmunStay ? "중문·서귀포권 약 150km" : "서부권 약 120km"} · 공항·관광지 주차 포함 · ${party}명 분할`,
          ],
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
      isJungmunStay,
      mealRows,
      money,
      nights,
      party,
      planEdits,
      rooms,
      selectedFlight,
      selectedRental,
      selectedStay,
      stayTotal,
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
  const chooseDepartureDistrict = (region, district) => {
    setDepartureLocation({
      ...district,
      region: region.region,
      image: district.image || region.image,
    });
    setDepartureRegionId(region.id);
    setDepartureMenuOpen(false);
    setOrigin(district.airportCode || "GMP");
    setFlightId("");
    setReturnFlightId("");
    setTransport("");
    setLocalTransport("");
    setTransportPromptReady(false);
    notify(`${region.region} ${district.detail} 출발 기준으로 항공편을 이어서 비교할게요.`);
  };
  const chooseCustomDeparture = () => {
    const detail = customDeparture.trim();
    if (!detail) return notify("출발할 지역을 입력해 주세요.");
    setDepartureLocation({
      id: `custom-departure-${detail}`,
      region: detail,
      detail,
      latitude: null,
      longitude: null,
      airportCode: "GMP",
      needsGeocoding: true,
      image: departureRegions[0].image,
    });
    setDepartureRegionId("");
    setCustomDeparture("");
    setDepartureMenuOpen(false);
    setOrigin("GMP");
    setTransportPromptReady(false);
    notify(`${detail} 출발 정보를 저장했어요. API 연동 시 좌표를 자동으로 찾을 수 있어요.`);
  };
  const chooseDestination = (place) => {
    if (!departureLocation) {
      setMenuOpen(false);
      setDepartureMenuOpen(true);
      return notify("도착지보다 먼저 출발지를 선택해 주세요.");
    }
    setDestination(place);
    setDestinationLocation(
      destinationCoordinatesByName[place] || {
        id: `custom-destination-${place}`,
        region: place,
        detail: place,
        latitude: null,
        longitude: null,
        needsGeocoding: true,
      },
    );
    setMenuOpen(false);
    if (place === "제주도") {
      setJejuBaseArea("");
      setJejuRegionGuideOpen(true);
      setTransportPromptReady(false);
      return;
    }
    setJejuBaseArea("");
    setStayArea("전체");
    setTransportPromptReady(false);
    if (!travelers) setTravelerPromptOpen(true);
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
    setTransportStep("flight-question");
    setTransportModalOpen(true);
  };
  const confirmSeoulOrigin = () => {
    setTransportStep("flight-question");
  };
  const chooseFlightQuestion = (isFlight) => {
    if (isFlight) {
      setTransport("FLIGHT");
      setShowTimeFields(false);
      setFlightPickerLeg("outbound");
      setTransportModalOpen(false);
      setFlightOpen(true);
    } else {
      setTransport("OTHER");
      setShowTimeFields(true);
      setTransportModalOpen(false);
      notify(
        "출발·귀국 시간을 직접 설정한 뒤 원하는 교통수단을 이어서 고를 수 있어요.",
      );
    }
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
    if (!isJeju) return notify("국내 여행지에서 제주도를 먼저 선택해 주세요.");
    if (!endDate) return notify("귀국일을 먼저 선택해 주세요.");
    if (!travelers) return notify("총인원을 입력해 주세요.");
    if (!transport || !localTransport)
      return notify("AI 교통편 질문에서 출발과 제주 현지 이동을 골라주세요.");
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
          arrivalAirportCode: isJeju ? "CJU" : null,
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
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="얼마길 처음으로">
          <BrandPolygon />
          <strong>얼마길</strong>
        </a>
        <nav>
          <a href="#inspiration">인기 여행지</a>
          <a href="#inspiration">가이드 추천</a>
          <a href="#how">이용 방법</a>
        </nav>
        <button className="outline-button" onClick={() => setLoginOpen(true)}>
          로그인
        </button>
        <button
          className="header-button"
          onClick={() =>
            document
              .querySelector("#planner")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          여행 만들기 <span>→</span>
        </button>
      </header>
      {loginOpen && (
        <div className="ai-modal-backdrop login-backdrop" role="presentation">
          <section
            className="ai-modal login-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-modal-title"
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setLoginOpen(false)}
              aria-label="로그인 닫기"
            >
              ×
            </button>
            <p>얼마길 계정</p>
            <h3 id="login-modal-title">다시 만나 반가워요.</h3>
            <span>아이디와 비밀번호를 입력해 로그인하세요.</span>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setLoginOpen(false);
                notify(
                  "발표용 데모 화면입니다. 로그인 기능은 백엔드 연동 후 제공됩니다.",
                );
              }}
            >
              <label>
                아이디
                <input
                  name="id"
                  autoComplete="username"
                  placeholder="아이디 또는 이메일"
                  required
                />
              </label>
              <label>
                비밀번호
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="비밀번호를 입력하세요"
                  required
                />
              </label>
              <button type="submit">로그인</button>
            </form>
          </section>
        </div>
      )}
      <section className="hero" id="top">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-image hero-image--${slide.id} ${index === heroSlideIndex ? "is-active" : ""}`}
            style={{ backgroundImage: `url(${slide.src})` }}
            aria-hidden={index !== heroSlideIndex}
          />
        ))}
        <div className="hero-shade" />
        <div className="hero-inner">
          <p className="eyebrow light">YOUR BUDGET, YOUR ROUTE</p>
          <h1>
            내 예산에 딱 맞춘
            <br />
            <i>단 하나의 길, 얼마길.</i>
          </h1>
          <p className="hero-copy">
            가고 싶은 곳과 사용할 수 있는 예산만 알려주세요.
            <br />
            AI가 현실적인 동선과 머무를 이유를 함께 설계합니다.
          </p>
          <div className="hero-tags">
            <span>예산 우선 설계</span>
            <span>취향 기반 추천</span>
            <span>낭비 없는 동선</span>
          </div>
        </div>
        <div className="hero-pagination" aria-label="메인 배경 이미지 선택">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={index === heroSlideIndex ? "active" : ""}
              onClick={() => setHeroSlideIndex(index)}
              aria-label={`${slide.label} 보기`}
            />
          ))}
        </div>
      </section>
      <section className="quick-access" aria-label="여행 바로가기">
        <div className="quick-access-inner">
          {quickLinks.map((link) => (
            <button
              type="button"
              key={link.title}
              onClick={() =>
                document
                  .querySelector(link.target)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span>{link.icon}</span>
              <b>{link.title}</b>
              <small>{link.text}</small>
            </button>
          ))}
        </div>
      </section>
      <section className="planner-section" id="planner">
        <div className="section-title">
          <div>
            <p className="eyebrow">TRIP PLANNING, MADE PERSONAL</p>
            <h2>
              내 예산 안에서
              <br />
              어디로 떠날까요?
            </h2>
          </div>
          <p>
            여행의 조건을 알려주면 AI가 비용을 먼저 계산하고,
            <br />그 안에서 가장 좋은 하루를 찾아드려요.
          </p>
        </div>
        <div className="planner-card">
          <div className="form-area">
            <div className="prompt-area">
              <label htmlFor="prompt">여행을 자유롭게 설명해 주세요</label>
              <div className="prompt-box">
                <span>●</span>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      submitPrompt();
                    }
                  }}
                  rows="2"
                  placeholder="예: 2박 3일 도쿄 여행, 50만원 예산으로 맛집과 야경을 즐기고 싶어요."
                />
                <div className="prompt-actions">
                  <button
                    type="button"
                    className="prompt-send"
                    onClick={submitPrompt}
                    aria-label="여행 요청 전송"
                  >
                    ↵
                  </button>
                  <button
                    type="button"
                    className="prompt-clear"
                    onClick={() => setPrompt("")}
                    aria-label="입력 내용 지우기"
                  >
                    ×
                  </button>
                </div>
              </div>
              <small className="prompt-tip">
                Enter로 전송 · 줄바꿈은 Shift + Enter
              </small>
            </div>
            <section className="budget-input-card early-budget">
              <div className="budget-input-heading">
                <div>
                  <span>₩</span>
                  <b>1인 여행 예산</b>
                  <small>
                    모든 개인 비용과 공통 비용의 N/1 금액을 기준으로 비교해요.
                  </small>
                </div>
                <em className={inBudget ? "safe" : "over"}>
                  {inBudget
                    ? `예산 안 · ${money(gap)}원 여유`
                    : `예산 초과 · ${money(gap)}원 부족`}
                </em>
              </div>
              <div className="budget-number">
                <span>₩</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={money(budget)}
                  onChange={(e) =>
                    setBudget(
                      Number(e.target.value.replaceAll(/[^0-9]/g, "")) || 0,
                    )
                  }
                />
                <b>원</b>
                <div>
                  <small>1인 현재 예상</small>
                  <strong>{money(total)}원</strong>
                </div>
              </div>
              <div className="budget-meter">
                <i
                  className={inBudget ? "safe" : "over"}
                  style={{
                    width: `${Math.min((total / Math.max(budget, 1)) * 100, 100)}%`,
                  }}
                />
              </div>
            </section>
            <div className="form-fields">
              <section className="route-field">
                <header className="route-field-heading">
                  <div>
                    <small>여정</small>
                    <b>어디서 출발해 어디로 떠날까요?</b>
                  </div>
                  <span>STEP 01 · ROUTE</span>
                </header>
                <div className="route-picker-grid">
                  <div className="route-picker route-origin-picker">
                    <small>출발지</small>
                    <button
                      id="departure-route-picker"
                      type="button"
                      className={`route-picker-trigger ${departureLocation ? "chosen" : ""}`}
                      onClick={() => {
                        setDepartureMenuOpen(!departureMenuOpen);
                        setMenuOpen(false);
                      }}
                    >
                      {departureLocation ? (
                        <span className="route-location-label">
                          <img src={departureLocation.image} alt="" />
                          <span>
                            <b>{departureLocation.region}</b>
                            <em>{departureLocation.detail}</em>
                          </span>
                        </span>
                      ) : (
                        <span className="route-empty-label">
                          <i>⌖</i>
                          <b>출발지를 선택해 주세요</b>
                        </span>
                      )}
                      <i className="route-chevron">⌄</i>
                    </button>
                    {departureMenuOpen && (
                      <DepartureRegionMenu
                        activeRegionId={departureRegionId}
                        customDeparture={customDeparture}
                        onBack={() => setDepartureRegionId("")}
                        onChooseCustom={chooseCustomDeparture}
                        onChooseDistrict={chooseDepartureDistrict}
                        onChooseRegion={setDepartureRegionId}
                        onCustomDepartureChange={setCustomDeparture}
                      />
                    )}
                  </div>
                  <i className="route-direction" aria-hidden="true">
                    →
                  </i>
                  <div className="route-picker route-destination-picker">
                    <small>도착지</small>
                    <button
                      type="button"
                      className={`route-picker-trigger ${destination ? "chosen" : ""}`}
                      onClick={() => {
                        if (!departureLocation) {
                          setDepartureMenuOpen(true);
                          setMenuOpen(false);
                          notify("먼저 출발지를 선택해 주세요.");
                          return;
                        }
                        if (destination === "제주도" && jejuBaseArea) {
                          setMenuOpen(false);
                          setJejuRegionGuideOpen(true);
                        } else {
                          setMenuOpen(!menuOpen);
                          setDepartureMenuOpen(false);
                        }
                      }}
                    >
                      {destination ? (
                        <span className="route-location-label">
                          <img
                            src={
                              destinationLocation?.image ||
                              destinationCoordinatesByName[destination]?.image ||
                              destinationImageByName[destination] ||
                              jejuCoastPhoto
                            }
                            alt=""
                          />
                          <span>
                            <b>
                              {destination === "제주도"
                                ? "제주도"
                                : destinationLocation?.region || destination}
                            </b>
                            <em>
                              {destination === "제주도" && jejuBaseArea
                                ? jejuBaseArea
                                : destinationLocation?.detail || destination}
                            </em>
                          </span>
                        </span>
                      ) : (
                        <span className="route-empty-label">
                          <i>✦</i>
                          <b>도착지를 선택해 주세요</b>
                        </span>
                      )}
                      <i className="route-chevron">⌄</i>
                    </button>
                    {menuOpen && (
                      <div className="destination-menu route-destination-menu">
                        <div className="destination-types">
                          <button
                            type="button"
                            className={destinationType === "국내" ? "active" : ""}
                            onClick={() => setDestinationType("국내")}
                          >
                            국내
                          </button>
                          <button
                            type="button"
                            className={destinationType === "해외" ? "active" : ""}
                            onClick={() => setDestinationType("해외")}
                          >
                            해외
                          </button>
                        </div>
                        {destinationType ? (
                          <>
                            <div className="destination-cities">
                              {(destinationType === "국내"
                                ? domestic
                                : overseas
                              ).map((place, index) => (
                                <button
                                  type="button"
                                  key={place}
                                  onClick={() => chooseDestination(place)}
                                >
                                  <img
                                    src={
                                      destinationCoordinatesByName[place]
                                        ?.image ||
                                      destinationImageByName[place] ||
                                      placePhotos[index % placePhotos.length]
                                    }
                                    alt={`${place} 대표 관광지`}
                                    loading="lazy"
                                  />
                                  <b>{place}</b>
                                </button>
                              ))}
                            </div>
                            <div className="destination-custom">
                              <input
                                value={customDestination}
                                onChange={(event) =>
                                  setCustomDestination(event.target.value)
                                }
                                onKeyDown={(event) => {
                                  if (event.key === "Enter") {
                                    event.preventDefault();
                                    chooseCustomDestination();
                                  }
                                }}
                                placeholder={
                                  destinationType === "국내"
                                    ? "원하는 국내 여행지를 입력하세요"
                                    : "원하는 해외 여행지를 입력하세요"
                                }
                              />
                              <button
                                type="button"
                                onClick={chooseCustomDestination}
                              >
                                직접 선택
                              </button>
                            </div>
                          </>
                        ) : (
                          <p>국내 또는 해외를 먼저 선택해 주세요.</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </section>
              <label className="date-field">
                <small>
                  언제 · 인원을 먼저 정한 뒤 출발일과 귀국일을 선택해 주세요
                </small>
                {travelers && !endDate && (
                  <aside className="date-ai-guide" role="status">
                    <span>AI 안내</span>
                    <b>출발일과 귀국일을 정해주세요!</b>
                  </aside>
                )}
                <span>▣</span>
                <div
                  className={`date-time-range ${showTimeFields ? "with-time" : ""}`}
                >
                  <div>
                    <b>출발</b>
                    <label>
                      <span>날짜</span>
                      <input
                        id="trip-start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => {
                          if (!travelers) {
                            setTravelerPromptOpen(true);
                            return;
                          }
                          setStartDate(e.target.value);
                          if (endDate && endDate < e.target.value)
                            setEndDate("");
                          setFlightId("");
                          setReturnFlightId("");
                          if (showPlan) {
                            setTransportPromptReady(false);
                            notify(
                              "날짜가 바뀌어 항공편을 새 날짜 기준으로 다시 선택해 주세요.",
                            );
                          }
                        }}
                      />
                    </label>
                    {showTimeFields && (
                      <label>
                        <span>시간</span>
                        <select
                          value={startTime}
                          onChange={(e) => {
                            setStartTime(e.target.value);
                            setFlightId("");
                            setReturnFlightId("");
                          }}
                          aria-label="출발 희망 시간"
                        >
                          {departureTimeOptions.map((time) => (
                            <option value={time} key={time}>
                              {time} 이후
                            </option>
                          ))}
                        </select>
                      </label>
                    )}
                  </div>
                  <i>→</i>
                  <div>
                    <b>귀국</b>
                    <label>
                      <span>날짜</span>
                      <input
                        type="date"
                        value={endDate}
                        min={startDate}
                        onChange={(e) => {
                          if (!travelers) {
                            setTravelerPromptOpen(true);
                            return;
                          }
                          setEndDate(e.target.value);
                          setFlightId("");
                          setReturnFlightId("");
                          setTransportPromptReady(
                            !showPlan &&
                              destination === "제주도" &&
                              Boolean(jejuBaseArea) &&
                              Boolean(travelers) &&
                              Boolean(departureLocation),
                          );
                          if (showPlan) {
                            notify(
                              "날짜가 바뀌어 항공편을 새 날짜 기준으로 다시 선택해 주세요.",
                            );
                          }
                        }}
                      />
                    </label>
                    {showTimeFields && (
                      <label>
                        <span>시간</span>
                        <select
                          value={endTime}
                          onChange={(e) => {
                            setEndTime(e.target.value);
                            setFlightId("");
                            setReturnFlightId("");
                          }}
                          aria-label="귀국 희망 시간"
                        >
                          {returnTimeOptions.map((time) => (
                            <option value={time} key={time}>
                              {time} 이전
                            </option>
                          ))}
                        </select>
                      </label>
                    )}
                  </div>
                </div>
                {showTimeFields && (
                  <small className="direct-time-note">
                    항공 외 이동을 선택해 직접 출발·귀국 시간을 설정했어요.
                  </small>
                )}
              </label>
              <div
                className={`traveler-field ${!travelers && destination ? "needs-input" : ""}`}
              >
                <small>총인원</small>
                <label className="traveler-input">
                  <input
                    id="trip-travelers"
                    type="number"
                    min="1"
                    max="20"
                    inputMode="numeric"
                    value={travelerInput}
                    onChange={(event) => {
                      const value = event.target.value;
                      setTravelerInput(value);
                      setTravelers(
                        value.trim()
                          ? Math.min(
                              20,
                              Math.max(1, Math.floor(Number(value)) || 1),
                            )
                          : null,
                      );
                    }}
                    onBlur={commitTravelers}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        event.currentTarget.blur();
                      }
                    }}
                    placeholder="3"
                    aria-label="총인원 입력"
                  />
                  <span>명</span>
                </label>
              </div>
            </div>
            {!isJeju && (
              <div className="waiting-booking">
                <b>지역을 선택하면 항공편과 숙소를 비교할 수 있어요.</b>
              </div>
            )}
            <section className="preference-area">
              <div className="pace-preference">
                <div>
                  <small>여행일정</small>
                  <b>하루를 어떤 속도로 보낼까요?</b>
                </div>
                <span>
                  {paceOptions.map((option) => (
                    <button
                      type="button"
                      key={option}
                      className={pace === option ? "active" : ""}
                      onClick={() => setPace(option)}
                    >
                      {option}
                    </button>
                  ))}
                </span>
              </div>
              <div className="theme-preference">
                <div>
                  <small>여행 테마</small>
                  <b>마음에 드는 테마를 골라주세요.</b>
                </div>
                <span className="theme-cards">
                  {themeOptions.map((theme) => (
                    <button
                      type="button"
                      key={theme.title}
                      className={themes.includes(theme.title) ? "active" : ""}
                      onClick={() => toggleTheme(theme.title)}
                    >
                      <img src={theme.image} alt="" />
                      <b>{theme.title}</b>
                      {themes.includes(theme.title) && (
                        <span
                          className="theme-selected"
                          aria-label={`${theme.title} 선택됨`}
                        >
                          선택
                        </span>
                      )}
                    </button>
                  ))}
                </span>
              </div>
            </section>
            {showPlan && (
              <section className="quick-edit-panel" aria-label="여행 조건 빠른 수정">
                <div className="quick-edit-heading">
                  <div>
                    <p>AI PLAN · QUICK EDIT</p>
                    <h3>필요한 항목만 다시 선택하세요.</h3>
                    <span>
                      이미 고른 다른 조건은 유지하고, 수정한 항목만 일정과 1인
                      경비에 반영해요.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPlanViewOpen(true)}
                  >
                    현재 일정 보기 →
                  </button>
                </div>
                <div className="quick-edit-actions">
                  <button type="button" onClick={() => openQuickEdit("dates")}>
                    <CalendarCheck2 aria-hidden="true" />
                    <span>
                      <b>여행 날짜</b>
                      <small>
                        {endDate
                          ? `${dateLabel(startDate)} ~ ${dateLabel(endDate)}`
                          : "날짜 미선택"}
                      </small>
                    </span>
                    <em>수정</em>
                  </button>
                  <button type="button" onClick={() => openQuickEdit("flight")}>
                    <Plane aria-hidden="true" />
                    <span>
                      <b>왕복 항공편</b>
                      <small>
                        {selectedFlight
                          ? `${selectedOutboundFlight.airline} · ${selectedReturnFlight.airline}`
                          : "항공편 재선택 필요"}
                      </small>
                    </span>
                    <em>변경</em>
                  </button>
                  <button type="button" onClick={() => openQuickEdit("rental")}>
                    <BadgeDollarSign aria-hidden="true" />
                    <span>
                      <b>제주 렌터카</b>
                      <small>
                        {selectedRental
                          ? `${selectedRental.company} · ${money(selectedRental.price)}원`
                          : "렌터카 미선택"}
                      </small>
                    </span>
                    <em>변경</em>
                  </button>
                  <button type="button" onClick={() => openQuickEdit("stay")}>
                    <Hotel aria-hidden="true" />
                    <span>
                      <b>숙소</b>
                      <small>
                        {selectedStay
                          ? `${selectedStay.area} · ${selectedStay.name}`
                          : "숙소 미선택"}
                      </small>
                    </span>
                    <em>변경</em>
                  </button>
                </div>
              </section>
            )}
            {isJeju ? (
              <>
                <section className="transport-choice">
                  <div>
                    <p>1. AI 교통편 설계</p>
                    <small>
                      출발지는 서울인지 먼저 확인하고, 항공을 고르면 가는
                      편·오는 편을 각각 비교해요.
                    </small>
                  </div>
                  <div className="transport-result">
                    <span>
                      출발{" "}
                      <b>
                        {transport === "FLIGHT"
                          ? "항공"
                          : transportName(transport, outboundOptions)}
                      </b>
                    </span>
                    <i>→</i>
                    <span>
                      제주 <b>{transportName(localTransport, localOptions)}</b>
                    </span>
                    <button type="button" onClick={beginOriginQuestion}>
                      AI에게 교통편 물어보기
                    </button>
                  </div>
                </section>
                {transport === "FLIGHT" && (
                  <section className="booking-section">
                    <div className="booking-heading">
                      <div>
                        <p>2. 왕복 항공편 선택</p>
                        <small>
                          {dateLabel(startDate)} 가는 편 · {dateLabel(endDate)}{" "}
                          오는 편을 각각 고르면 실제 비행시간에 맞춰 일정이
                          조율돼요.
                        </small>
                      </div>
                      <em>
                        {selectedFlight
                          ? `${selectedFlight.origin} → CJU 왕복 선택됨`
                          : `${selectedOutboundFlight ? "오는 편 선택 필요" : "가는 편 미선택"}`}
                      </em>
                    </div>
                    <div className="booking-summary flight-summary">
                      <div>
                        <span>✈</span>
                        <div>
                          <small>
                            {selectedFlight
                              ? `${selectedFlight.origin === "GMP" ? "김포" : "인천"} ↔ 제주 · 왕복`
                              : "서울 출발 · 가는 편과 오는 편 각각 선택"}
                          </small>
                          <b>
                            {selectedFlight
                              ? `${selectedOutboundFlight.airline} ${selectedFlight.out} · ${selectedReturnFlight.airline} ${selectedFlight.back}`
                              : selectedOutboundFlight
                                ? `${selectedOutboundFlight.airline} 가는 편 선택 완료 · 오는 편을 골라주세요`
                                : "AI가 두 편의 항공권을 따로 비교해 드릴게요"}
                          </b>
                        </div>
                      </div>
                      {selectedFlight && (
                        <strong>
                          {money(selectedFlight.fare)}원<small>1인 왕복</small>
                        </strong>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          if (showPlan) setQuickEditTarget("flight");
                          setFlightPickerLeg(
                            selectedOutboundFlight ? "return" : "outbound",
                          );
                          setFlightOpen(true);
                        }}
                      >
                        {selectedFlight
                          ? "왕복편 변경"
                          : selectedOutboundFlight
                            ? "오는 편 고르기"
                            : "가는 편 고르기"}{" "}
                        →
                      </button>
                    </div>
                  </section>
                )}
                {localTransport === "RENTAL" && (
                  <section className="rental-section">
                    <div className="booking-heading">
                      <div>
                        <p>
                          {transport === "FLIGHT" ? "3." : "2."} 제주 렌터카
                          선택
                        </p>
                        <small>
                          {selectedFlight
                            ? `${selectedFlight.airline} 항공 선택 뒤, AI가 2박 3일 동선에 맞춰 비교했어요.`
                            : "AI가 2박 3일 동선과 여행 인원을 기준으로 비교했어요."}
                        </small>
                      </div>
                      <em>2박 3일 · 48시간 비교</em>
                    </div>
                    <div className="rental-ai-tip">
                      <span>✦</span>
                      <p>
                        <b>AI 추천</b> 애월·협재·중문까지 이동하는 일정이라면
                        렌터카가 가장 유연해요. <strong>빌리카</strong>는 현재
                        비교 목록 중 가장 낮은 가격입니다.
                      </p>
                    </div>
                    <div className="booking-summary rental-summary">
                      <div>
                        <span>🚗</span>
                        <div>
                          <small>
                            {selectedRental
                              ? `${selectedRental.car} · 2박 3일 48시간 총 대여료`
                              : "제주 현지 이동 수단"}
                          </small>
                          <b>
                            {selectedRental
                              ? `${selectedRental.company} · 총 ${money(selectedRental.price)}원`
                              : "2박 3일 특가 렌터카를 팝업에서 비교해 보세요"}
                          </b>
                        </div>
                      </div>
                      {selectedRental && (
                        <strong>
                          총 {money(selectedRental.price)}원
                          <small>2박 3일 · 48시간</small>
                        </strong>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          if (showPlan) setQuickEditTarget("rental");
                          setRentalOpen(true);
                        }}
                      >
                        {selectedRental ? "렌터카 변경" : "렌터카 고르기"} →
                      </button>
                    </div>
                  </section>
                )}
              </>
            ) : (
              <div className="waiting-booking">
                <b>지역을 선택하면 항공편과 숙소를 비교할 수 있어요.</b>
              </div>
            )}
            {isJeju && (
              <section className="booking-section">
                <div className="booking-heading">
                  <div>
                    <p>
                      {transport === "FLIGHT" && localTransport === "RENTAL"
                        ? "4."
                        : "3."}{" "}
                      숙소 선택
                    </p>
                    <small>
                      가격대와 제주 권역을 고른 뒤 숙소를 선택하세요.
                    </small>
                  </div>
                  <em>
                    {selectedStay
                      ? `${selectedStay.area} · ${nights}박`
                      : "숙소 미선택"}
                  </em>
                </div>
                <div className="booking-summary">
                  <div>
                    <span>⌂</span>
                    <div>
                      <small>
                        {selectedStay
                          ? `${selectedStay.area} · 객실 ${rooms}개`
                          : "제주 전역 숙소"}
                      </small>
                      <b>
                        {selectedStay
                          ? selectedStay.name
                          : "가격대와 지역으로 숙소를 찾아보세요"}
                      </b>
                    </div>
                  </div>
                  {selectedStay && (
                    <strong>1박 {money(selectedStay.price)}원</strong>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      if (showPlan) setQuickEditTarget("stay");
                      setStayOpen(true);
                    }}
                  >
                    숙소 전체 비교 →
                  </button>
                </div>
                {stayOpen && (
                  <div
                    className="booking-picker stay-picker"
                    role="dialog"
                    aria-modal="true"
                    aria-label="숙소 전체 비교"
                  >
                    <header className="stay-modal-head">
                      <div>
                        <p>✦ 얼마길 AI · STAY MATCH</p>
                        <h3>
                          여행 동선에 맞는 숙소를
                          <br />
                          넓은 화면에서 비교해 보세요.
                        </h3>
                        <span>
                          특가세일 객실을 먼저 보여드리고, 가격·권역·후기 점수를
                          한 번에 비교해요.
                        </span>
                      </div>
                      <button
                        type="button"
                        className="modal-close"
                        onClick={() => {
                          setStayOpen(false);
                          setQuickEditTarget("");
                        }}
                        aria-label="숙소 비교 닫기"
                      >
                        ×
                      </button>
                    </header>
                    <div className="stay-ai-recommendation">
                      <span>✦</span>
                      <p>
                        <b>AI 숙소 추천</b>{" "}
                        {selectedStay
                          ? `${selectedStay.name}은 ${selectedStay.insight}`
                          : "특가세일 객실을 먼저 보여드리고, 선택한 동선과 인원에 맞는 숙소를 추천할게요."}
                      </p>
                      <em>특가세일 객실은 빠르게 마감돼요.</em>
                    </div>
                    <label className="stay-search">
                      <span>⌕</span>
                      <input
                        value={staySearch}
                        onChange={(event) => setStaySearch(event.target.value)}
                        placeholder="원하는 숙소 이름을 입력하세요"
                      />
                    </label>
                    <div className="stay-toolbar">
                      <div className="price-filters">
                        {[
                          ["0-5", "0 ~ 5만원대"],
                          ["5-10", "5 ~ 10만원대"],
                          ["10-20", "10 ~ 20만원대"],
                          ["20-30", "20 ~ 30만원대"],
                          ["30+", "30만원 이상"],
                        ].map(([id, label]) => (
                          <button
                            type="button"
                            className={priceBand === id ? "active" : ""}
                            onClick={() => setPriceBand(id)}
                            key={id}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                      <label className="stay-sort">
                        <span>정렬</span>
                        <select
                          value={staySort}
                          onChange={(event) => setStaySort(event.target.value)}
                          aria-label="숙소 정렬 기준"
                        >
                          <option value="review">리뷰순</option>
                          <option value="price">최저가순</option>
                        </select>
                      </label>
                    </div>
                    <div className="area-filters">
                      {["전체", ...hotelGroups.map(([area]) => area)].map(
                        (area) => (
                          <button
                            type="button"
                            className={stayArea === area ? "active" : ""}
                            onClick={() => setStayArea(area)}
                            key={area}
                          >
                            {area}
                          </button>
                        ),
                      )}
                    </div>
                    {filteredStays.length ? (
                      <div className="hotel-catalog">
                        {filteredStays.map((stay) => (
                          <button
                            type="button"
                            key={stay.id}
                            className={`${stay.id === stayId ? "selected" : ""} ${stay.deal ? "deal-item" : ""}`}
                            onClick={() => chooseStay(stay.id)}
                          >
                            <img src={stay.image} alt={`${stay.name} 숙소`} />
                            {stay.deal && (
                              <em className="stay-deal">특가세일</em>
                            )}
                            <div>
                              <span>{stay.area}</span>
                              <b>{stay.name}</b>
                              <small className="hotel-rating">
                                ★ {stay.rating} · 3인 여행 기준 객실
                              </small>
                              <strong>1박 {money(stay.price)}원</strong>
                              {stay.deal && <i>잔여 객실 {stay.left}개</i>}
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-catalog">
                        <b>이 가격대의 시연 숙소는 준비 중이에요.</b>
                        <span>
                          발표 시나리오용으로 실제 숙소가 포함된 10 ~ 20만원대를
                          선택해 주세요.
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </section>
            )}
          </div>
          <aside className="ai-area">
            <p>
              <span /> AI TRIP CHECK
            </p>
            <h3>
              선택한 예약부터
              <br />
              하루의 동선까지.
            </h3>
            <ul>
              <li>
                ✓{" "}
                {selectedFlight
                  ? `${selectedFlight.airline} 왕복 ${money(selectedFlight.fare)}원`
                  : "왕복 항공권을 선택해요"}
              </li>
              <li>
                ✓{" "}
                {selectedStay
                  ? `${selectedStay.name} ${nights}박`
                  : "제주 숙소를 선택해요"}
              </li>
              <li>
                ✓ {pace} · {themes.length ? themes.join(" · ") : "테마 선택 전"}
              </li>
              <li>✓ 선택 즉시 1인 예산 다시 계산</li>
            </ul>
            <div className="selection-total">
              <small>현재 예상 1인 경비</small>
              <b>{money(total)}원</b>
              <span>
                총 {travelers || 0}명 여행비 {money(total * (travelers || 0))}원
              </span>
            </div>
            <button className="generate" type="button" onClick={generate}>
              내 예산으로 여행 만들기 →
            </button>
            {showPlan && (
              <button
                className="plan-return-button"
                type="button"
                onClick={() => setPlanViewOpen(true)}
              >
                생성된 전체 일정 보기 →
              </button>
            )}
            <small>항공·숙소를 바꾸면 1인 경비와 동선도 바로 반영돼요.</small>
          </aside>
        </div>
      </section>
      <section className="inspiration compact-inspiration" id="inspiration">
        <div className="section-heading">
          <div>
            <p className="eyebrow">GUIDE CURATED PLANS</p>
            <h2>가이드 추천 일정</h2>
          </div>
          <button type="button">가이드 전체 보기 →</button>
        </div>
        <div className="city-grid">
          {destinations.map((place) => (
            <article
              key={place.id}
              onClick={() => {
                setDestinationType(place.id === "jeju" ? "국내" : "해외");
                chooseDestination(place.title);
                document
                  .querySelector("#planner")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <img
                src={place.image}
                alt={`${place.title} 대표 관광지`}
                loading="lazy"
              />
              <div>
                <small>GUIDE PICK · {place.city}</small>
                <h3>{place.title}</h3>
                <p>{place.tag}</p>
                <b>
                  가이드 일정 보기 <i>→</i>
                </b>
              </div>
            </article>
          ))}
        </div>
      </section>
      {planning && (
        <div className="planning-overlay" role="status" aria-live="polite">
          <div
            className={`planning-loader ${planningMode === "stay-revision" ? "stay-revision-loader" : ""}`}
          >
            <span className="planning-orbit" aria-hidden="true" />
            <p>
              얼마길 AI ·{" "}
              {planningMode === "stay-revision"
                ? "STAY ROUTE REVISION"
                : "TRIP PLANNING"}
            </p>
            <h2>
              {planningStage === "calculating"
                ? planningMode === "stay-revision"
                  ? "변경된 숙소를 기반으로\n일정을 새롭게 생성하겠습니다."
                  : "현재 AI가 추천 경로와 경비를 계산 중입니다."
                : planningMode === "stay-revision"
                  ? "중문·서귀포 중심의 새 동선을 완성했어요."
                  : "일정 설계가 완료되었습니다."}
            </h2>
            <small>
              {planningStage === "calculating"
                ? planningMode === "stay-revision"
                  ? "기존 한림 동선을 제외하고, 히든 클리프 호텔&네이쳐와 인천 대한항공 왕복 시간을 기준으로 다시 배치하고 있어요."
                  : "항공·숙소·렌터카와 각 장소의 이동 시간을 연결하고 있어요."
                : "잠시 후 새 일정이 화면 위에서부터 자연스럽게 완성됩니다."}
            </small>
            <div>
              <i className={planningStage === "ready" ? "done" : ""} />
              <i className={planningStage === "ready" ? "done" : ""} />
              <i className={planningStage === "ready" ? "done" : ""} />
            </div>
          </div>
        </div>
      )}
      {planViewOpen && (
        <PlanFullscreen
          activeDay={activeDay}
          costDetails={costDetails}
          dates={dates}
          dayPlans={dayPlans}
          endTime={scheduledEndTime}
          eventCost={itineraryEventCost}
          money={money}
          onChangeStop={changePlanStop}
          onOpenStay={() => setStayOpen(true)}
          onOpenStayComparison={() => setStayChangePromptOpen(true)}
          placeOptions={placeAlternatives}
          planRevision={planRevision}
          selectedFlight={selectedFlight}
          selectedRental={selectedRental}
          selectedStay={selectedStay}
          setActiveDay={setActiveDay}
          setPlanRevision={setPlanRevision}
          setPlanViewOpen={setPlanViewOpen}
          startTime={scheduledStartTime}
          stayChange={stayChange}
          total={total}
          travelers={travelers}
        />
      )}
      {jejuRegionGuideOpen && (
        <JejuRegionModal
          currentArea={jejuBaseArea}
          customArea={jejuCustomArea}
          onClose={() => setJejuRegionGuideOpen(false)}
          onChoose={chooseJejuBaseArea}
          onCustomAreaChange={setJejuCustomArea}
          onChooseCustom={chooseJejuCustomArea}
        />
      )}
      {travelerPromptOpen && (
        <div
          className="ai-modal-backdrop traveler-prompt-backdrop"
          role="presentation"
        >
          <section
            className="ai-modal traveler-prompt-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="traveler-prompt-title"
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setTravelerPromptOpen(false)}
              aria-label="인원 입력 창 닫기"
            >
              ×
            </button>
            <p>✦ 얼마길 AI · TRIP PARTY</p>
            <span className="traveler-prompt-icon" aria-hidden="true">
              <UsersRound />
            </span>
            <h3 id="traveler-prompt-title">
              함께 떠나는 인원을
              <br />
              알려주세요.
            </h3>
            <span>
              정확한 1인 경비 계산을 위해 인원을 먼저 파악할게요. 입력한 인원을
              기준으로 객실과 공통 비용을 나눠 계산합니다.
            </span>
            <label className="traveler-prompt-input">
              <span>총인원</span>
              <input
                autoFocus
                type="number"
                min="1"
                max="20"
                inputMode="numeric"
                value={travelerInput}
                onChange={(event) => setTravelerInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    confirmTravelers();
                  }
                }}
                placeholder="예: 3"
              />
              <b>명</b>
            </label>
            <button
              type="button"
              className="transition-primary"
              onClick={confirmTravelers}
            >
              인원 확인하고 날짜 고르기 →
            </button>
          </section>
        </div>
      )}
      {transportModalOpen && (
        <div className="ai-modal-backdrop" role="presentation">
          <section
            className="ai-modal transport-question-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-transport-title"
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setTransportModalOpen(false)}
              aria-label="질문 닫기"
            >
              ×
            </button>
            <p>
              ✦ 얼마길 AI ·{" "}
              {transportStep === "origin"
                ? "QUESTION 01"
                : transportStep === "flight-question"
                  ? "QUESTION 02"
                  : "QUESTION 03"}
            </p>
            {transportStep === "origin" ? (
              <>
                <h3 id="ai-transport-title">출발지를 다시 선택할까요?</h3>
                <span>
                  출발 권역과 세부지역을 선택하면 해당 지역에서 이용하기 좋은 공항과
                  교통편을 바로 비교해 드려요.
                </span>
                <div className="ai-confirm-grid">
                  <button
                    type="button"
                    className="yes"
                    onClick={() => {
                      setTransportModalOpen(false);
                      setDepartureMenuOpen(true);
                    }}
                  >
                    <i>⌖</i>
                    <b>출발지 다시 선택</b>
                    <small>시·도와 세부지역을 선택해 주세요.</small>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTransportModalOpen(false);
                      notify("현재 선택한 출발지를 기준으로 비교를 이어갈게요.");
                    }}
                  >
                    <i>✓</i>
                    <b>현재 출발지 유지</b>
                    <small>선택한 지역 기준으로 비교합니다.</small>
                  </button>
                </div>
              </>
            ) : transportStep === "flight-question" ? (
              <>
                <h3 id="ai-transport-title">
                  {departureLocation
                    ? `${departureLocation.region} ${departureLocation.detail}에서 제주까지`
                    : "제주까지"}
                  <br />
                  항공으로 이동할까요?
                </h3>
                <span>
                  선택한 출발지와 여행 날짜를 기준으로 항공편을 비교할게요. ‘예’를
                  고르면 가는 편과 오는 편을 각각 선택해요.
                </span>
                <div className="ai-confirm-grid">
                  <button
                    type="button"
                    className="yes"
                    onClick={() => chooseFlightQuestion(true)}
                  >
                    <i>✈</i>
                    <b>예, 항공으로 갈게요</b>
                    <small>가는 편 → 오는 편을 차례로 선택합니다.</small>
                  </button>
                  <button
                    type="button"
                    onClick={() => chooseFlightQuestion(false)}
                  >
                    <i>◷</i>
                    <b>아니오</b>
                    <small>출발·귀국 시간을 직접 설정할게요.</small>
                  </button>
                </div>
                <button
                  type="button"
                  className="modal-back"
                  onClick={() => {
                    setTransportModalOpen(false);
                    setDepartureMenuOpen(true);
                  }}
                >
                  ← 출발지 변경하기
                </button>
              </>
            ) : (
              <>
                <h3 id="ai-transport-title">
                  제주에서는
                  <br />
                  어떻게 이동할까요?
                </h3>
                <span>
                  가는 편과 오는 편 항공을 모두 골랐어요. 제주 현지에서 편한
                  이동 수단을 선택해 주세요.
                </span>
                <div className="ai-option-grid local-options">
                  {localOptions.map((option) => (
                    <button
                      type="button"
                      key={option.id}
                      onClick={() => chooseLocal(option.id)}
                    >
                      <i>{option.icon}</i>
                      <b>{option.title}</b>
                      <small>{option.text}</small>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="modal-back"
                  onClick={() => {
                    setTransportModalOpen(false);
                    setFlightPickerLeg("return");
                    setFlightOpen(true);
                  }}
                >
                  ← 왕복 항공편 다시 보기
                </button>
              </>
            )}
          </section>
        </div>
      )}
      {flightTransitionOpen && (
        <div className="ai-modal-backdrop" role="presentation">
          <section
            className="ai-modal ai-transition-modal flight-transition-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="return-flight-transition-title"
          >
            <p>✦ 얼마길 AI · ROUND TRIP STEP 02</p>
            <TransitionIcon type="flight" />
            <h3 id="return-flight-transition-title">
              가는 편을 선택했어요.
              <br />
              이제 돌아오는 편을 선택하겠습니다.
            </h3>
            <span>
              {selectedOutboundFlight?.airline || "선택한 항공편"} 가는 편에
              맞춰 {dateLabel(endDate)} 제주 → {departureLocation?.detail || "출발지"}
              시간표를 이어서 비교할게요.
            </span>
            <button
              type="button"
              className="transition-primary"
              onClick={() => {
                setFlightTransitionOpen(false);
                setFlightPickerLeg("return");
                setFlightOpen(true);
              }}
            >
              오는 편 비교 시작 →
            </button>
          </section>
        </div>
      )}
      {flightOpen && (
        <div className="ai-modal-backdrop" role="presentation">
          <section
            className="ai-modal flight-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="flight-modal-title"
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => {
                setFlightOpen(false);
                setQuickEditTarget("");
              }}
              aria-label="항공편 닫기"
            >
              ×
            </button>
            <p>✦ 얼마길 AI · FLIGHT MATCH</p>
            <div className="journey-chip">
              <span>{departureLocation?.detail || "출발지"}</span>
              <i>→</i>
              <b>{destinationLocation?.detail || "제주"}</b>
              <em>
                {flightPickerLeg === "outbound"
                  ? "가는 편 선택 · 1/2"
                  : "오는 편 선택 · 2/2"}
              </em>
            </div>
            <h3 id="flight-modal-title">
              {flightPickerLeg === "outbound"
                ? `${dateLabel(startDate)} 가는 편을`
                : `${dateLabel(endDate)} 오는 편을`}
              <br />
              골라주세요.
            </h3>
            <span>
              {departureLocation?.detail || "출발지"} → {destinationLocation?.detail || "제주"}{" "}
              항공 이동을 선택했어요.{" "}
              {flightPickerLeg === "outbound"
                ? "먼저 제주로 가는 편을 고르고, 이어서 돌아오는 편을 선택해요."
                : `${selectedOutboundFlight?.airline || "선택한"} 가는 편에 이어 제주 → ${departureLocation?.detail || "출발지"} 오는 편을 고르는 단계예요.`}
            </span>
            <div className="sale-hero">
              <div>
                <small>TODAY ONLY · 23:59 종료</small>
                <b>오늘만, 정가 대비 최대 47% 할인</b>
                <span>
                  김포·인천 출발별 오늘만 특가를 먼저 비교해요. 가는 편과 오는
                  편은 서로 다른 항공사를 선택할 수도 있어요.
                </span>
              </div>
              <strong>
                ✈
                <small>
                  오늘만
                  <br />
                  특가
                </small>
              </strong>
            </div>
            <div className="flight-filter-row">
              <div className="picker-tabs">
                <button
                  type="button"
                  className={origin === "GMP" ? "active" : ""}
                  onClick={() => {
                    setOrigin("GMP");
                    setFlightId("");
                    setReturnFlightId("");
                  }}
                >
                  김포 ↔ 제주
                </button>
                <button
                  type="button"
                  className={origin === "ICN" ? "active" : ""}
                  onClick={() => {
                    setOrigin("ICN");
                    setFlightId("");
                    setReturnFlightId("");
                  }}
                >
                  인천 ↔ 제주
                </button>
              </div>
              <label className="flight-sort">
                <span>정렬</span>
                <select
                  value={flightSort}
                  onChange={(event) => setFlightSort(event.target.value)}
                >
                  <option value="time">시간순</option>
                  <option value="price">최저가순</option>
                </select>
              </label>
            </div>
            <p className="flight-route-note">
              <b>{origin === "GMP" ? "김포 출발" : "인천 출발"}</b> ·{" "}
              {flightPickerLeg === "outbound"
                ? origin === "GMP"
                  ? "서울에서 제주로 향하는 시간표를 비교해요."
                  : "인천 출발 오전·저녁 항공편을 넓게 비교해요."
                : "제주에서 서울로 돌아오는 시간표를 비교해요."}
            </p>
            <p className="picker-date">
              {dateLabel(flightPickerLeg === "outbound" ? startDate : endDate)}{" "}
              · 오늘만 혜택 {saleFirstFlights.filter(isSaleFlight).length}편 ·{" "}
              {flightPickerLeg === "outbound"
                ? "선택 후 오는 편으로 이어집니다."
                : "선택 후 제주 현지 이동수단을 고릅니다."}
            </p>
            <div className="flight-catalog">
              {saleFirstFlights.map((flight) => {
                const isSelected =
                  flightPickerLeg === "outbound"
                    ? flight.id === flightId
                    : flight.id === returnFlightId;
                const flightTime =
                  flightPickerLeg === "outbound" ? flight.out : flight.back;
                const oneWay = oneWayFare(flight);
                const originalOneWay = oneWayOriginalFare(flight);
                return (
                  <button
                    type="button"
                    key={flight.id}
                    className={`${isSelected ? "selected" : ""} ${isSaleFlight(flight) ? "sale-flight" : ""}`}
                    onClick={() => chooseFlight(flight.id)}
                  >
                    {isSaleFlight(flight) && (
                      <em className="flight-sale-sticker">
                        오늘만 {flight.discount}% OFF
                      </em>
                    )}
                    <span className={`airline-mark ${flight.tone}`}>
                      {flight.airline.slice(0, 1)}
                    </span>
                    <div>
                      <b>
                        {flight.airline}
                        <small>{flight.code}</small>
                      </b>
                      <span className="flight-time">{flightTime}</span>
                      {isSaleFlight(flight) && (
                        <em className="flight-deal">
                          정가 {money(originalOneWay)}원 →{" "}
                          <b>{flight.discount}% 할인</b> · 잔여 {flight.seats}석
                        </em>
                      )}
                    </div>
                    <strong
                      className={
                        isSaleFlight(flight)
                          ? "flight-price sale-price"
                          : "flight-price"
                      }
                    >
                      {isSaleFlight(flight) ? (
                        <>
                          <del>정가 {money(originalOneWay)}원</del>
                          <b>{money(oneWay)}원</b>
                          <small>{flight.discount}% 할인 · 편도 1인</small>
                        </>
                      ) : (
                        <>
                          <del>정가 {money(originalOneWay)}원</del>
                          <b>{money(oneWay)}원</b>
                          <small>편도 1인</small>
                        </>
                      )}
                    </strong>
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              className="modal-back modal-back-strong"
              onClick={() => {
                if (flightPickerLeg === "return") {
                  setFlightPickerLeg("outbound");
                } else {
                  setFlightOpen(false);
                  setTransportStep("flight-question");
                  setTransportModalOpen(true);
                }
              }}
            >
              {flightPickerLeg === "return"
                ? "← 가는 편 다시 고르기"
                : "← 항공 여부 다시 선택하기"}
            </button>
          </section>
        </div>
      )}
      {rentalOpen && (
        <div className="ai-modal-backdrop" role="presentation">
          <section
            className="ai-modal rental-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rental-modal-title"
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => {
                setRentalOpen(false);
                setQuickEditTarget("");
              }}
              aria-label="렌터카 닫기"
            >
              ×
            </button>
            <p>✦ 얼마길 AI · JEJU DRIVE</p>
            <div className="journey-chip">
              <span>서울</span>
              <i>→</i>
              <b>제주</b>
              <em>항공 선택 완료</em>
              <i>→</i>
              <b>렌터카</b>
            </div>
            <h3 id="rental-modal-title">
              제주 2박 3일,
              <br />총 대여료로 비교해 보세요.
            </h3>
            <span>
              {selectedFlight
                ? `${selectedFlight.airline} 왕복 항공편을 고른 뒤`
                : "항공 이동을 고른 뒤"}{" "}
              이어서, 제주 도착{" "}
              {selectedFlight
                ? selectedFlight.out.slice(-5)
                : timeLabel(startTime)}{" "}
              · 제주 출발{" "}
              {selectedFlight
                ? selectedFlight.back.slice(0, 5)
                : timeLabel(endTime)}{" "}
              기준 2박 3일 렌터카를 비교했어요.
            </span>
            <div className="rental-sale-banner">
              <b>2박 3일 최저가 · 총 대여료 {money(rentals[0].price)}원</b>
              <span>
                첫날 애월·협재, 마지막 제주시 이동을 고려하면{" "}
                <strong>공항 인수 방식·자차 보장·무료 취소</strong>를 함께
                확인하는 편이 좋아요.
              </span>
            </div>
            <div className="rental-compare-guide">
              <b>예약 전 확인할 항목</b>
              <span>
                총 대여료 · 보험 범위 · 연료/충전 반납 · 공항 셔틀 · 운전자 조건
                · 무료 취소
              </span>
            </div>
            <div className="rental-catalog rental-modal-catalog">
              {rentals.map((rental) => {
                const isDeal = Boolean(rental.discount);
                return (
                  <button
                    type="button"
                    key={rental.id}
                    className={`${rental.id === rentalId ? "selected" : ""} ${isDeal ? "rental-deal-card" : ""} ${rental.price >= 128000 ? "rental-premium" : ""}`}
                    onClick={() => chooseRental(rental.id)}
                  >
                    <div className="rental-visual">
                      <img
                        src={rentalImages[rental.id]}
                        alt={`${rental.car} 대표 차량`}
                      />
                      <span>
                        {isDeal ? `${rental.discount}% 특가세일` : rental.badge}
                      </span>
                      <i>
                        ★ {rental.score} · 잔여 {rental.left}대
                      </i>
                    </div>
                    <div className="rental-card-body">
                      <b>{rental.company}</b>
                      <small>
                        {rental.car} · {rental.age}
                      </small>
                      <strong className={isDeal ? "rental-sale-price" : ""}>
                        {isDeal && (
                          <del>정가 {money(rental.originalPrice)}원</del>
                        )}
                        <b>{money(rental.price)}원</b>
                        {isDeal && (
                          <small>오늘만 {rental.discount}% 할인</small>
                        )}
                      </strong>
                      <div className="rental-meta">
                        <small>
                          <b>보험</b>
                          {rental.insurance}
                        </small>
                        <small>
                          <b>인수</b>
                          {rental.pickup}
                        </small>
                        <small>
                          <b>반납</b>
                          {rental.fuel}
                        </small>
                        <small>
                          <b>취소</b>
                          {rental.cancellation}
                        </small>
                      </div>
                      <em className="rental-benefit">{rental.benefit}</em>
                      <small className="rental-note">{rental.note}</small>
                    </div>
                  </button>
                );
              })}
            </div>
            <small className="rental-disclaimer">
              표시 금액은 2박 3일 48시간 시연 기준이며, 실제 보험·연령·대여
              조건은 예약 단계에서 다시 확인해야 합니다.
            </small>
            <button
              type="button"
              className="modal-back modal-back-strong"
              onClick={() => {
                setRentalOpen(false);
                setFlightOpen(true);
              }}
            >
              ← 항공편 다시 보기
            </button>
          </section>
        </div>
      )}
      {preferenceModalOpen && (
        <div className="ai-modal-backdrop" role="presentation">
          <section
            className="ai-modal preference-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="preference-modal-title"
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setPreferenceModalOpen(false)}
              aria-label="여행 취향 설정 닫기"
            >
              ×
            </button>
            <p>✦ 얼마길 AI · TRAVEL STYLE</p>
            <h3 id="preference-modal-title">
              제주에서는
              <br />
              어떤 여행을 원하세요?
            </h3>
            <span>
              렌터카 선택을 반영했어요. 여행 속도와 테마를 고르면 AI가 이후
              일정과 추천 경비에 바로 반영합니다.
            </span>
            <section className="preference-modal-group">
              <small>여행 속도</small>
              <b>하루를 어떤 속도로 보낼까요?</b>
              <div>
                {paceOptions.map((option) => (
                  <button
                    type="button"
                    className={pace === option ? "active" : ""}
                    onClick={() => setPace(option)}
                    key={option}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </section>
            <section className="preference-modal-group">
              <small>여행 테마</small>
              <b>마음에 드는 테마를 골라주세요.</b>
              <div className="preference-modal-themes">
                {themeOptions.map((theme) => (
                  <button
                    type="button"
                    className={themes.includes(theme.title) ? "active" : ""}
                    onClick={() => toggleTheme(theme.title)}
                    key={theme.title}
                  >
                    <img src={theme.image} alt="" />
                    <span>{theme.title}</span>
                    {themes.includes(theme.title) && (
                      <i
                        className="theme-modal-check"
                        aria-label={`${theme.title} 선택됨`}
                      >
                        선택
                      </i>
                    )}
                  </button>
                ))}
              </div>
            </section>
            <button
              type="button"
              className="preference-confirm"
              onClick={() => {
                setPreferenceModalOpen(false);
                setStayTransitionOpen(true);
                notify(
                  `${pace} · ${themes.length ? themes.join(" · ") : "테마 미선택"} 취향을 반영했어요.`,
                );
              }}
            >
              선택 완료 · 숙소 비교로 이동
            </button>
          </section>
        </div>
      )}
      {stayTransitionOpen && (
        <div className="ai-modal-backdrop" role="presentation">
          <section
            className="ai-modal ai-transition-modal stay-transition-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="stay-transition-title"
          >
            <p>✦ 얼마길 AI · STAY MATCH</p>
            <TransitionIcon type="stay" />
            <h3 id="stay-transition-title">
              제주도 · {jejuBaseArea || "선택 지역"}을 선택하셨네요!
              <br />
              맞춤형 AI가 해당 지역 숙소를 보여드리겠습니다.
            </h3>
            <span>
              {pace} 일정과 {themes.length ? themes.join(" · ") : "선택한"}{" "}
              테마, 선택한 지역의 관광지 동선을 기준으로 위치·가격·후기까지
              비교해 가장 잘 맞는 숙소를 찾아드릴게요.
            </span>
            <button
              type="button"
              className="transition-primary"
              onClick={() => {
                setStayTransitionOpen(false);
                setStayOpen(true);
              }}
            >
              숙소 비교 시작 →
            </button>
          </section>
        </div>
      )}
      {budgetConfirmationOpen && (
        <div className="ai-modal-backdrop" role="presentation">
          <section
            className={`ai-modal ai-transition-modal budget-confirmation-modal ${confirmedInBudget ? "in-budget" : "over-budget"}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="budget-confirmation-title"
          >
            <p>✦ 얼마길 AI · BUDGET CHECK</p>
            <TransitionIcon type="budget" />
            <h3 id="budget-confirmation-title">
              {confirmedInBudget
                ? "예산 안에서 가능합니다!"
                : "예산을 조금 넘어요."}
            </h3>
            <span>
              {selectedStay?.name || budgetStatus?.stay?.name} 선택 후 1인 예상
              경비는 <b>{money(confirmedTotal)}원</b>이에요. 일정 생성 후에도
              같은 항공·숙소·렌터카·식비 계산식을 그대로 사용합니다.
            </span>
            <div className="budget-safe-box">
              <small>현재 예상 1인 경비 · 일정 생성 후 동일</small>
              <b>{money(confirmedTotal)}원</b>
              <span>
                {confirmedInBudget
                  ? `설정 예산 ${money(budget)}원 · ${money(Math.max(0, budget - confirmedTotal))}원 여유`
                  : `설정 예산 ${money(budget)}원 · ${money(Math.abs(budget - confirmedTotal))}원 초과`}
              </span>
            </div>
            <button
              type="button"
              className="transition-primary"
              onClick={() => {
                setBudgetConfirmationOpen(false);
                setPlanPromptOpen(true);
              }}
            >
              다음 단계로 →
            </button>
          </section>
        </div>
      )}
      {planPromptOpen && (
        <div className="ai-modal-backdrop" role="presentation">
          <section
            className="ai-modal ai-transition-modal plan-transition-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="plan-transition-title"
          >
            <p>✦ 얼마길 AI · PLAN READY</p>
            <TransitionIcon type="plan" />
            <h3 id="plan-transition-title">이제 일정을 생성하러 가볼까요?</h3>
            <span>
              선택한 항공편·렌터카·숙소와 여행 취향을 바탕으로 최적 동선과 1인
              예상 경비를 설계할 준비가 됐어요.
            </span>
            <button
              type="button"
              className="transition-primary"
              onClick={() => {
                setPlanPromptOpen(false);
                const button = document.querySelector(".generate");
                button?.scrollIntoView({ behavior: "smooth", block: "center" });
                window.setTimeout(() => button?.focus(), 420);
              }}
            >
              일정 만들기 버튼으로 이동 →
            </button>
          </section>
        </div>
      )}
      {stayChangePromptOpen && stayChange && (
        <div className="ai-modal-backdrop" role="presentation">
          <section
            className="ai-modal ai-transition-modal stay-change-prompt-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="stay-change-prompt-title"
          >
            <p>✦ 얼마길 AI · STAY ROUTE UPDATE</p>
            <TransitionIcon type="plan" />
            <h3 id="stay-change-prompt-title">
              새 숙소를 기준으로
              <br />
              일정을 다시 설계했어요.
            </h3>
            <span>
              {stayChange.to.name} 주변의 이동 동선과 추천 장소, 1인 예상 경비를
              새로 계산했습니다. 어떤 점이 바뀌었는지 확인해볼까요?
            </span>
            <div className="stay-change-prompt-actions">
              <button
                type="button"
                className="transition-primary"
                onClick={() => {
                  setStayChangePromptOpen(false);
                  setStayChangeCompareOpen(true);
                }}
              >
                예, 변경 내용을 볼게요
              </button>
              <button
                type="button"
                className="transition-secondary"
                onClick={() => setStayChangePromptOpen(false)}
              >
                아니오, 일정부터 볼게요
              </button>
            </div>
          </section>
        </div>
      )}
      {stayChangeCompareOpen && stayChange && (
        <div className="ai-modal-backdrop" role="presentation">
          <section
            className="ai-modal stay-change-compare-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="stay-change-compare-title"
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setStayChangeCompareOpen(false)}
              aria-label="숙소 변경 비교 닫기"
            >
              ×
            </button>
            <p>✦ 얼마길 AI · BEFORE & AFTER</p>
            <h3 id="stay-change-compare-title">
              숙소가 바뀌며 달라진 여행을
              <br />
              한눈에 확인해 보세요.
            </h3>
            <span>
              항공편과 여행 기간은 그대로 유지하고, 새 숙소 권역에 맞춰
              식사·볼거리·체험·이동 순서를 다시 최적화했어요.
            </span>
            <section
              className="stay-change-summary"
              aria-label="숙소 변경에 따른 일정 요약"
            >
              <header>
                <div>
                  <small>BASECAMP UPDATE</small>
                  <b>
                    {stayChange.from.area} <i>→</i> {stayChange.to.area}
                  </b>
                </div>
                <strong>1인 예상 경비 {money(total)}원</strong>
              </header>
              <div className="stay-change-category-grid">
                {stayChangeSummaryFor(stayChange).map((item, index) => (
                  <article key={item.category}>
                    <header>
                      <em>{String(index + 1).padStart(2, "0")}</em>
                      <div>
                        <small>{item.category}</small>
                        <b>{item.title}</b>
                      </div>
                    </header>
                    <div className="stay-change-row removed">
                      <span>변경 전</span>
                      <del>− {item.before}</del>
                    </div>
                    <div className="stay-change-row added">
                      <span>변경 후</span>
                      <strong>＋ {item.after}</strong>
                    </div>
                    <p>{item.note}</p>
                  </article>
                ))}
              </div>
            </section>
            <div className="stay-change-compare-note">
              <b>AI 재설계 포인트</b>
              <span>
                같은 2박 3일 안에서 숙소 주변 일정은 촘촘하게, 권역이 다른
                장소는 줄여 실제 이동 시간을 낮췄어요.
              </span>
            </div>
            <button
              type="button"
              className="transition-primary"
              onClick={() => setStayChangeCompareOpen(false)}
            >
              새 일정 확인하기 →
            </button>
          </section>
        </div>
      )}
      <section className="how" id="how">
        <div>
          <p className="eyebrow light">HOW EOLMAGIL WORKS</p>
          <h2>
            계획은 가볍게,
            <br />
            여행은 충분하게.
          </h2>
        </div>
        <div className="steps">
          <article>
            <span>01</span>
            <h3>여행지를 고르세요</h3>
            <p>국내와 해외에서 가고 싶은 여행지를 먼저 선택해요.</p>
          </article>
          <article>
            <span>02</span>
            <h3>예약을 비교하세요</h3>
            <p>원하는 교통편과 숙소를 취향에 맞게 고릅니다.</p>
          </article>
          <article>
            <span>03</span>
            <h3>예산과 동선을 확인해요</h3>
            <p>선택한 금액과 여행 루트를 한눈에 확인하세요.</p>
          </article>
        </div>
      </section>
      <footer>
        <b>● 얼마길</b>
        <span>Travel, thoughtfully planned.</span>
        <span className="footer-legal">
          © 2026 EOLMAGIL <i>·</i> SMART ROUTES, BETTER TRIPS
        </span>
      </footer>
      {message && <div className="toast">✓ {message}</div>}
    </main>
  );
}
export default App;
