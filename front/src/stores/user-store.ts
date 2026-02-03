import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/auth.types";
import { HouseworkType, HouseworkFrequencies } from "@/types/user.types";

interface UserStore {
  user: User | null;
  mealFrequency: number | null;
  houseworkFrequencies: HouseworkFrequencies | null;
  setMealFrequency: (frequency: number) => void;
  setUser: (user: User) => void;
  setHouseworkFrequency: (type: HouseworkType, frequency: number) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      mealFrequency: null,
      houseworkFrequencies: null,
      setMealFrequency: (frequency) =>
        set({ mealFrequency: frequency }),
      setUser: (user) => 
        set({ user }),
      setHouseworkFrequency(type, frequency) {
        set((state) => ({
          houseworkFrequencies: {
            ...(state.houseworkFrequencies || {}),
            [type]: frequency
          }
        }))
      },
      clearUser: () => set({ 
        user: null,
        mealFrequency: null,
        houseworkFrequencies: null
      })
    }),
    { name: "user-storage" }
  )
);