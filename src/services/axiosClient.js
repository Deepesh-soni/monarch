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
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Replace '*' with the specific origin you want to allow
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // Specify the allowed HTTP methods
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token", // Specify the allowed headers
      "Access-Control-Allow-Credentials": true, // Set to true if you're sending credentials (e.g., cookies, HTTP authentication) with the request
    },
  },
  getCurrentAccessToken,
  getCurrentRefreshToken,
  refreshTokenUrl: `${BASE_URL}${URL.refreshToken}`,
  logout: terminateSession,
  setRefreshTokens,
});
