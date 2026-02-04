"use client";

import { useState, useMemo } from "react";
import { HOMEWORK_ITEMS } from "@/data/homework-items"
import { Button, Calendar } from "@/components/ui";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Play, X } from "lucide-react";
import { useGetHousework, useStartHousework, useEndHousework } from "@/hooks/features/housework";
import { useGetCalender, useGetCalenderDate } from "@/hooks/features/calender/use-calenders";
import { calculateTimeDifference, getHouseworkStatusById, getHouseworkDatesFromCalendar, formatDateToYMD } from "@/lib/utils/";
import { getCaloriesByHouseworkAndLevel } from "@/lib/utils/housework";
import { HouseworkStatusBadge } from "@/components/features/housework";
import { useHouseworkStore } from "@/stores/housework-store";

export default function App() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { mutate: startHousework } = useStartHousework();
  const { mutate: endHousework } = useEndHousework();
  const { isHouseworkRunning } = useHouseworkStore();

  const [selectedDateString, setSelectedDateString] = useState<string>(
    formatDateToYMD(new Date())
  );
  const { data: housework } = useGetHousework(
    selectedId ? { houseworkId: Number(selectedId), calorie: 0 } : undefined
  );
  const { data: calenderData } = useGetCalender({
    year: date?.getFullYear() ?? new Date().getFullYear(),
    month: (date?.getMonth() ?? new Date().getMonth()) + 1,
  });
  const { data: calenderDate } = useGetCalenderDate({
    date: selectedDateString,
  });

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      setSelectedDateString(formatDateToYMD(newDate));
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

  console.log(calenderDate);

  return (
    <main>
      <div className="flex flex-col gap-4">
        {HOMEWORK_ITEMS.map((item) => (
          <Button
            key={item.id}
            className="border"
            onClick={() => setSelectedId(item.id)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {selectedId && (
        <div className="mt-4">
          {housework && (() => {
            const label = calculateTimeDifference(housework.doneAt); // 最後に作業した日
            const status = getHouseworkStatusById(housework.doneAt, housework.houseworkId); // 現在の状態
            const calorie = getCaloriesByHouseworkAndLevel(housework.houseworkId, status); // 消費カロリー

            return (
              <div>
                <h2>
                  {HOMEWORK_ITEMS[Number(housework.houseworkId) - 1].label}
                </h2>
                {!isHouseworkRunning() ? (
                  <>
                    <Button 
                      className="border"
                      onClick={() => handleHouseworkStart(Number(housework.houseworkId))}
                    >
                      <Play />
                      作業開始
                    </Button>
                    <div>
                      <h3>最後に作業した日</h3>
                      <p>{label}</p>
                    </div>
                    <div>
                      <h3>現在の状態</h3>
                      <HouseworkStatusBadge 
                        lastDoneDate={housework.doneAt}
                        houseworkId={housework.houseworkId}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <Button 
                      className="border"
                      onClick={() => handleHouseworkEnd(Number(housework.houseworkId), calorie)}
                    >
                      <X />
                      作業終了
                    </Button>
                  </>
                )}
              </div>
            );
          })()}
        </div>
      )}

      <div>
        <h2>Total Calorie: {calenderData?.totalCalorie}</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          houseworkDates={houseworkDates}
        />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button>開く</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>タイトル</SheetTitle>
            <SheetDescription>
              説明文をここに記述します。
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </main>
  )
}