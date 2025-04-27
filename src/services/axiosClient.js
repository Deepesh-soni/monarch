import { createAxiosClient } from "./createAxiosClient";
import { BASE_URL } from "@constants/urls";

export const client = createAxiosClient({
  options: {
    baseURL: BASE_URL,
    timeout: 300000,
    withCredentials: true, // Enables cookies/auth headers
    headers: {
      "Content-Type": "application/json",
    },
  },
});
