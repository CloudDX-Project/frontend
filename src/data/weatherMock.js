const isoDate = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const addDays = (date, amount) => {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
};

const conditions = [
  { condition: "맑음", icon: "☀️" },
  { condition: "구름 조금", icon: "🌤️" },
  { condition: "흐림", icon: "☁️" },
  { condition: "비", icon: "🌧️" },
  { condition: "맑음", icon: "☀️" },
  { condition: "구름 많음", icon: "⛅" },
  { condition: "맑음", icon: "☀️" },
  { condition: "흐림", icon: "☁️" },
  { condition: "소나기", icon: "🌦️" },
  { condition: "맑음", icon: "☀️" },
  { condition: "구름 조금", icon: "🌤️" },
  { condition: "맑음", icon: "☀️" },
];

// 기상청 API 응답 어댑터가 최종적으로 반환할 배열 예시입니다.
// UI는 배열 길이를 가정하지 않고 date가 존재하는 날만 표시합니다.
const mockStart = new Date();
export const weatherForecastMock = conditions.map((weather, index) => ({
  date: isoDate(addDays(mockStart, index)),
  ...weather,
  source: "기상청 API 연동 전 mock",
}));
