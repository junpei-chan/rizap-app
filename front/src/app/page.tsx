"use client";

import { useState, useMemo, useEffect } from "react";
import { HOMEWORK_ITEMS } from "@/data/homework-items"
import { Button, Calendar } from "@/components/ui";
import { Flame } from "lucide-react";
import { CalendarSheet } from "@/components/features/calendar";
import { useGetHousework, useStartHousework, useEndHousework } from "@/hooks/features/housework";
import { useGetCalender, useGetCalenderDate } from "@/hooks/features/calender/use-calenders";
import { getHouseworkDatesFromCalendar, formatDateToYMD, formatDateToYMDHMS } from "@/lib/utils/";
import { HouseworkDetailOverview } from "@/components/features/housework";
import { useHouseworkStore } from "@/stores/housework-store";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { mutate: startHousework } = useStartHousework();
  const { mutate: endHousework } = useEndHousework();
  const { isHouseworkRunning } = useHouseworkStore();

  const [selectedDateString, setSelectedDateString] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const now = new Date();
    setDate(now);
    setSelectedDateString(formatDateToYMD(now));
  }, []);

  const { data: housework } = useGetHousework(
    selectedId ? { houseworkId: Number(selectedId), calorie: 0 } : undefined
  );
  const { data: calenderData } = useGetCalender(
    date ? {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    } : undefined
  );
  const { data: calenderDate } = useGetCalenderDate(
    selectedDateString ? { date: selectedDateString } : undefined
  );

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      setSelectedDateString(formatDateToYMD(newDate));
      setIsSheetOpen(true);
    }
  };

  const houseworkDates = useMemo(
    () => getHouseworkDatesFromCalendar(calenderData),
    [calenderData]
  );

  const handleHouseworkStart = (id: number) => {
    startHousework({
      houseworkId: id,
    });
  };

  const handleHouseworkEnd = (
    id: number,
    calorie: number,
  ) => {
    endHousework({
      houseworkId: id,
      calorie: calorie,
    });
  };

  return (
    <main className="bg-gray-300 w-screen h-screen">
      <div className="flex flex-col gap-4">
        {HOMEWORK_ITEMS.map((item) => (
          <Button
            key={item.id}
            className="border w-30"
            onClick={() => setSelectedId(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <HouseworkDetailOverview
            selectedId={selectedId}
            housework={housework}
            isHouseworkRunning={isHouseworkRunning()}
            onHouseworkStartAction={handleHouseworkStart}
            onHouseworkEndAction={handleHouseworkEnd}
            onHiddenAction={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>

      {isMounted && (
        <div className="w-88 bg-white flex flex-col gap-4 items-center mx-auto px-6 py-4 rounded-lg shadow-[2px_16px_19px_0px_rgba(0,0,0,0.09)]">
          <h2 className="w-full flex items-center gap-2">
            <div className="inline-flex items-center justify-center rounded-full p-1 bg-[#FF6201]">
              <Flame 
                color="white"
                size={24}
              />
            </div>
            <p className="flex items-end gap-1">
              <span className="text-2xl font-bold">
                {calenderData?.totalCalorie}
              </span>
              kcal
            </p>
          </h2>
          {isMounted && (
            <Calendar
              className="w-full"
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              houseworkDates={houseworkDates}
            />
          )}
        </div>
      )}

      {calenderDate?.date && (
        <CalendarSheet 
          date={calenderDate.date}
          totalCalorie={calenderDate.totalCalorie}
          logs={calenderDate.logs.map((log) => ({
            ...log,
            doneAt: formatDateToYMDHMS(new Date(log.doneAt))
          }))}
          isOpen={isSheetOpen}
          onOpenChange={setIsSheetOpen}
        />
      )}
    </main>
  )
}