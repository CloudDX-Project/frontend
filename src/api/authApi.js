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

  console.log("[LOGIN RESPONSE]", response);

  if (!response?.accessToken) {
    console.error(
      "[LOGIN] Access Token 없음",
      response,
    );

    throw new Error(
      "로그인 응답에 Access Token이 없습니다.",
    );
  }

  saveAccessToken(response.accessToken);

  console.log(
    "[TOKEN SAVED]",
    localStorage.getItem("tripbuddy.accessToken"),
  );

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