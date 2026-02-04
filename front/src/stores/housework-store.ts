import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HouseworkStore {
  runningHouseworkId: number | null;
  currentHouseworkId: number | null;
  startedAt: string | null;
  startHousework: (houseworkId: number) => void;
  endHousework: () => void;
  isHouseworkRunning: () => boolean;
}

export const useHouseworkStore = create<HouseworkStore>()(
  persist(
    (set, get) => ({
      runningHouseworkId: null,
      currentHouseworkId: null,
      startedAt: null,
      startHousework: (houseworkId: number) =>
        set({
          runningHouseworkId: houseworkId,
          currentHouseworkId: houseworkId,
          startedAt: new Date().toISOString(),
        }),
      endHousework: () => 
        set({
          runningHouseworkId: null,
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