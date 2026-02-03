import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/auth.types";

interface UserStore {
  user: User | null;
  mealFrequency: number | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      mealFrequency: null,
      setUser: (user) => 
        set({ user }),
      clearUser: () => 
        set({ user: null })
    }),
    { name: "user-storage" }
  )
);