import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CalenderDateResponse } from "@/types/calender.types";
import { formatDoneAtToTime } from "@/lib/utils/";

type Props = CalenderDateResponse & {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CalendarSheet({
  date,
  totalCalorie,
  logs,
  isOpen,
  onOpenChange,
}: Props) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="p-4">
        <SheetHeader>
          <SheetTitle>{date}の活動記録</SheetTitle>
          <SheetDescription>
            合計消費カロリー: {totalCalorie} kcal
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2 mt-4">
          {logs.map((log, i) => (
            <div key={i}>
              <p>{log.calorie}カロリー消費</p>
              <p>{formatDoneAtToTime(log.doneAt)}</p>
              <p>{log.houseworkName}</p>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}