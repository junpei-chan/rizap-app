"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth/auth-service";
import type { AuthRequest, AuthResponse } from "@/types/auth.types";
import Cookies from "js-cookie";
import { useAuthStore } from "@/stores";
import { useRouter } from "next/navigation";
type AxiosErrorLike = {
  response?: { data?: any };
  message?: string;
};

export const useSignup = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (credentials: AuthRequest) => authService.signup(credentials),
    onSuccess: (data: AuthResponse) => {
      Cookies.set("authToken", data.token); // トークンをCookieにセット

      setAuth(data.token); // Zustandストア更新

      // 前のユーザーのキャッシュをすべてクリア
      queryClient.clear();

      router.push("/onboarding"); // トップページにリダイレクト
    },
    onError: (error: unknown) => {
      // Axios のエラーからサーバーのレスポンスを取り出してログ出力する
      const axiosError = error as AxiosErrorLike;
      const respData = axiosError.response?.data;
      if (respData) {
        console.error("サインアップに失敗しました: ", respData);
      } else {
        console.error("サインアップに失敗しました: ", axiosError.message ?? error);
      }
    }
  });
};