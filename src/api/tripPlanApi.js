import axios from 'axios'

// 백엔드 주소가 정해지면 VITE_API_BASE_URL만 .env 파일에 넣으면 됩니다.
const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080',
  withCredentials: true,
})

export async function requestTripPlan(payload) {
  // Spring Boot API가 준비되면 이 주소만 실제 명세에 맞게 조정하면 됩니다.
  const { data } = await client.post('/api/v1/trips/plans', payload)
  return data
}
