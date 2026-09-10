import {
  apiClient,
  getAccessToken,
  saveAccessToken,
  removeAccessToken,
} from "./apiClient";

/**
 * 로그인
 *
 * POST /api/users/login
 *
 * Request
 * {
 *   "email": "...",
 *   "password": "..."
 * }
 */
export async function login(email, password) {
  const response = await apiClient.request(
    "/api/users/login",
    {
      method: "POST",

      body: {
        email,
        password,
      },
    },
  );

  if (!response?.accessToken) {
    throw new Error(
      "로그인 응답에 Access Token이 없습니다.",
    );
  }

  // Access Token 저장
  saveAccessToken(response.accessToken);

  // 개발 환경에서만 Access Token 출력
  if (import.meta.env.DEV) {
    console.log(
      "[LOGIN] Access Token:",
      response.accessToken,
    );

    console.log(
      "[LOGIN] Token Type:",
      response.tokenType,
    );
  }

  return response;
}

/**
 * 로그아웃
 */
export function logout() {
  removeAccessToken();

  if (import.meta.env.DEV) {
    console.log("[LOGOUT] Access Token 삭제");
  }
}

/**
 * 현재 로그인 여부
 */
export function isLoggedIn() {
  return Boolean(getAccessToken());
}