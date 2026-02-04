"use client";

import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth/auth-service";
import type { AuthRequest, AuthResponse, AuthError } from "@/types/auth.types";
import Cookies from "js-cookie";
import { useAuthStore } from "@/stores";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (credentials: AuthRequest) => authService.login(credentials),
    onSuccess: (data: AuthResponse) => {
      Cookies.set("authToken", data.token); // トークンをCookieにセット

      setAuth(data.token); // Zustandストア更新
      
      router.push("/"); // トップページにリダイレクト
    },
    onError: (error: AuthError) => {
      console.error("ログインに失敗しました: ", error.message); // エラー処理
    }
  });
};