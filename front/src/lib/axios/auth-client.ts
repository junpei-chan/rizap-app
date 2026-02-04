import axios from "axios";
import { useAuthStore } from "@/stores";

export const authClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
})

authClient.interceptors.request.use(
  (config) => {
    const userToken = useAuthStore.getState().authToken;

    if (userToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${userToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

authClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth(); // ログアウト処理
      window.location.href = "/login"; // ログインページへリダイレクト
    }
    return Promise.reject(error);
  }
)