import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CalenderData } from "@/types/calender.types";

interface CalenderStore {
  calenderData: CalenderData;
  selectedDate: number | null;
  setCalenderData: (data: CalenderData) => void;
  setSelectedDate: (date: number | null) => void;
}

export const useCalenderStore = create<CalenderStore>()(
  persist(
    (set) => ({
      calenderData: null,
      selectedDate: null,
      setCalenderData: (data) =>
        set({ calenderData: data }),
      setSelectedDate(date) {
        set({ selectedDate: date })
      },
    }),
    { name: "calender-storage" }
  ),
);