import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  authToken: string | null;
  isAuthenticated: boolean;
  setAuth: (authToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
  (set) => ({
      authToken: null,
      isAuthenticated: false,
      setAuth: (authToken) => 
        set({ authToken, isAuthenticated: true }),
      clearAuth: () => 
        set({ authToken: null, isAuthenticated: false })
    }),
    { name: "auth-storage" }
  )
);