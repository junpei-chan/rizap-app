"use client";

import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth/auth-service";
import type { AuthRequest, AuthResponse, AuthError } from "@/types/auth.types";
import Cookies from "js-cookie";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/router";

const router = useRouter();
const { setAuth } = useAuthStore();

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: AuthRequest) => authService.login(credentials),
    onSuccess: (data: AuthResponse) => {
      Cookies.set("authToken", data.authToken); // トークンをCookieにセット

      setAuth(data.user, data.authToken); // Zustandストア更新
      
      router.push("/"); // トップページにリダイレクト
    },
    onError: (error: AuthError) => {
      throw error; // エラーをthrow
    }
  });
};