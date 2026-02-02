import { create } from "zustand";
import type { User } from "@/types/auth.types";

interface AuthStore {
  user: User | null;
  authToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, authToken: string) => void;
}

export const useAuthStore = create<AuthStore>(
  (set) => ({
    user: null,
    authToken: null,
    isAuthenticated: false,
    setAuth: (user, authToken) => 
      set({ user, authToken, isAuthenticated: true }),
  }),
);