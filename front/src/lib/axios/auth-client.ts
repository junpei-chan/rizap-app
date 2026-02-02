import axios from "axios";

export const authClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
})

authClient.interceptors.request.use(
  (config) => {
    const userToken = "token"; 
    // TODO: Zustandストアからトークンを取得
    // 仮で文字列を代入

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
      // TODO: ログアウト処理
      window.location.href = "/login"; // ログインページへリダイレクト
    }
    return Promise.reject(error);
  }
)