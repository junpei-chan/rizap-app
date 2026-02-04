"use client";

import { useState } from "react";
import { HOMEWORK_ITEMS } from "@/data/homework-items"
import { Button } from "@/components/ui";
import { Play, X } from "lucide-react";
import { useGetHousework, useStartHousework } from "@/hooks/features/housework";
import { calculateTimeDifference } from "@/lib/utils/";
import { HouseworkStatusBadge } from "@/components/features/housework";
import { useHouseworkStore } from "@/stores/housework-store";

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data: housework, isLoading, error } = useGetHousework(
    selectedId ? { houseworkId: Number(selectedId) } : undefined
  );
  const { mutate: startHousework } = useStartHousework();
  const { isHouseworkRunning } = useHouseworkStore();

  const handleHouseworkStart = (id: number) => {
    startHousework({
      houseworkId: id,
    });
  }

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
          {isLoading && <p>読み込み中...</p>}
          {error && <p>エラーが発生しました</p>}
          {housework && (() => {
            const label = calculateTimeDifference(housework.doneAt);

            return (
              <div>
                <h2>
                  {HOMEWORK_ITEMS[Number(housework.houseworkId) - 1].label}
                </h2>
                <Button
                  className="border"
                  onClick={() => handleHouseworkStart(Number(housework.houseworkId))}
                >
                  {!isHouseworkRunning() ? (
                    <>
                      <Play />
                      作業開始
                    </>
                  ) : (
                    <>
                      <X />
                      作業終了
                    </>
                  )}
                </Button>
                {!isHouseworkRunning() && (
                  <>
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
                )}
              </div>
            );
          })()}
        </div>
      )}
    </main>
  )
}