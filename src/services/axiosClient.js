import { createAxiosClient } from "./createAxiosClient";
import { URL, BASE_URL } from "@constants/urls";
import { store } from "@redux/stores";
import { logout, setRefreshedTokens } from "@redux/slices/auth";

function getCurrentAccessToken() {
  return store.getState().auth?.user?.token;
}

function getCurrentRefreshToken() {
  return store.getState().auth?.user?.refreshToken;
}

function setRefreshTokens(tokens) {
  store.dispatch(setRefreshedTokens(tokens));
}

async function terminateSession() {
  store.dispatch(logout());
}

export const client = createAxiosClient({
  options: {
    baseURL: BASE_URL,
    timeout: 300000,
    withCredentials: true, // Enables cookies/auth headers
    headers: {
      "Content-Type": "application/json",
    },
  },
  getCurrentAccessToken,
  getCurrentRefreshToken,
  refreshTokenUrl: `${BASE_URL}${URL.refreshToken}`,
  logout: terminateSession,
  setRefreshTokens,
});

