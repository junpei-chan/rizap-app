"use client";

import { useState } from "react";
import { HOMEWORK_ITEMS } from "@/data/homework-items"
import { Button } from "@/components/ui";
import { useGetHousework } from "@/hooks/features/housework";

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data: housework, isLoading, error } = useGetHousework();

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
          {housework && (
            <div>
              <h2>{housework.doneAt}</h2>
              <p>消費カロリー: {housework} kcal</p>
            </div>
          )}
        </div>
      )}
    </main>
  )
}