import { create } from "zustand";
import { persist } from "zustand/middleware"
import type { User } from "@/types/auth.types";

interface AuthStore {
  user: User | null;
  authToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, authToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
  (set) => ({
      user: null,
      authToken: null,
      isAuthenticated: false,
      setAuth: (user, authToken) => 
        set({ user, authToken, isAuthenticated: true }),
      clearAuth: () => 
        set({ user: null, authToken: null, isAuthenticated: false })
    }),
    { name: "auth-storage" }
  )
);