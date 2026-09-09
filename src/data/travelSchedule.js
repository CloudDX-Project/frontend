// Local calendar days use HH:mm. Never infer a scheduled service from manual times.
export const isTime = (value) => typeof value === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
export const safeTime = (value, fallback = "09:00") => isTime(value) ? value : fallback;
export const normalizeTypedTime = (input) => {
  const digits = String(input ?? "").replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}:${digits.slice(2)}`;
};
export const clockMinutes = (value) => {
  const [hours, minutes] = safeTime(value).split(":").map(Number);
  return hours * 60 + minutes;
};
const clock = (value) => {
  const minutes = Math.max(0, Math.min(1439, Math.round(value)));
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
};
export const parseTicketLeg = (value) => {
  if (typeof value !== "string") return null;
  const times = value.match(/\b\d{2}:\d{2}\b/g);
  if (times?.length !== 2 || !times.every(isTime)) return null;
  const [departure, arrival] = times;
  // Overnight services need explicit dates; this demo only offers same-day legs.
  if (clockMinutes(arrival) <= clockMinutes(departure)) return null;
  return { departure, arrival };
};

export const resolveTripSchedule = ({ mode, ticket, startTime, endTime, startDate, endDate, manualConfirmed, carMinutes = 0 }) => {
  const sameDay = startDate === endDate;
  if (mode === "CAR") {
    if (!manualConfirmed || !isTime(startTime) || !isTime(endTime)) return { ready: false, reason: "자차 출발·도착 시간을 확정해 주세요." };
    const duration = Math.max(0, Number.isFinite(carMinutes) ? carMinutes : 0);
    const arrival = clockMinutes(startTime) + duration;
    const returnDeparture = clockMinutes(endTime) - duration;
    if (arrival >= 1440 || returnDeparture < 0 || (sameDay && returnDeparture <= arrival)) {
      return { ready: false, reason: "왕복 이동 시간을 확보할 수 있도록 시간 또는 여행 날짜를 조정해 주세요." };
    }
    return { ready: true, source: "manual", departureTime: startTime, arrivalTime: clock(arrival), endTime: clock(returnDeparture), returnArrivalTime: endTime };
  }
  if (!["FLIGHT", "KTX", "BUS"].includes(mode)) return { ready: false, reason: "교통수단을 먼저 선택해 주세요." };
  const out = parseTicketLeg(ticket?.out);
  const back = parseTicketLeg(ticket?.back);
  if (!out || !back) return { ready: false, reason: "가는 편과 오는 편 티켓을 모두 선택해 주세요." };
  const transferBuffer = mode === "FLIGHT" ? 90 : 30;
  if (sameDay && clockMinutes(back.departure) - clockMinutes(out.arrival) <= transferBuffer) {
    return { ready: false, reason: "오는 편은 도착 후 탑승 준비 시간을 확보할 수 있는 시각으로 골라주세요." };
  }
  return { ready: true, source: "ticket", departureTime: out.departure, arrivalTime: out.arrival, endTime: back.departure, returnArrivalTime: back.arrival };
};

// Explicitly mock schedules, replaced by supplier offers when available.
export const makeDemoTicketOptions = (mode, distanceKm = 200) => {
  if (!["KTX", "BUS"].includes(mode)) return [];
  const distance = Number.isFinite(distanceKm) ? Math.max(1, distanceKm) : 200;
  const duration = Math.min(360, Math.max(45, Math.round(distance / (mode === "KTX" ? 150 : 65) * 60 / 5) * 5));
  const fare = Math.max(10000, Math.round(distance * (mode === "KTX" ? 160 : 85) / 100) * 100);
  return [0, 1, 2].map((index) => {
    const out = 420 + index * 120;
    const back = 810 + index * 120;
    return { id: `${mode}-${index + 1}`, mode, name: `${mode === "KTX" ? "KTX" : "고속·시외버스"} ${index + 1}편`,
      out: `${clock(out)} → ${clock(out + duration)}`, back: `${clock(back)} → ${clock(back + duration)}`,
      fare: fare + index * 1000, isMock: true };
  });
};
