import { publicClient } from "@/lib/axios";
import type { AuthRequest, AuthResponse } from "@/types/auth.types";

export const authService = {
  login: async (credentials: AuthRequest) => {
    const { data } = await publicClient.post<AuthResponse>("/auth/login", credentials);
    return data;
  },
  signup: async (userData: AuthRequest) => {
    const { data } = await publicClient.post<AuthResponse>("/auth/sign_up", userData);
    return data;
  },
};