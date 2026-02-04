import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HouseworkStore {
  currentHouseworkId: number | null;
  startedAt: string | null;
  startHousework: (houseworkId: number) => void;
  endHousework: () => void;
  isHouseworkRunning: () => boolean;
}

export const useHouseworkStore = create<HouseworkStore>()(
  persist(
    (set, get) => ({
      currentHouseworkId: null,
      startedAt: null,
      startHousework: (houseworkId: number) =>
        set({
          currentHouseworkId: houseworkId,
          startedAt: new Date().toISOString(),
        }),
      endHousework: () => 
        set({
          currentHouseworkId: null,
          startedAt: null,
        }),
      isHouseworkRunning: () => {
        const state = get();
        return state.currentHouseworkId !== null && state.startedAt !== null;
      }
    }),
    { name: "housework-storage" }
  ),
)