import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MealFrequencyStore {
  mealFrequency: number | null;
  setMealFrequency: (mealFrequency: number) => void;
}

export const useMealFrequencyStore = create<MealFrequencyStore>()(
  persist(
    (set) => ({
      mealFrequency: null,
      setMealFrequency: (mealFrequency) =>
        set({ mealFrequency }),
    }),
    { name: "meal-frequency" }
  )
)