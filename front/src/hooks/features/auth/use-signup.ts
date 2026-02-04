"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth/auth-service";
import type { AuthRequest, AuthResponse, AuthError } from "@/types/auth.types";
import Cookies from "js-cookie";
import { useAuthStore } from "@/stores";
import { useRouter } from "next/navigation";

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

      router.push("/"); // トップページにリダイレクト
    },
    onError: (error: AuthError) => {
      console.error("サインアップに失敗しました: ", error.message); // エラー処理
    }
  });
};