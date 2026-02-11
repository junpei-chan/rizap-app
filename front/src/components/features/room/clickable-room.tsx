"use client";

import { useMemo } from "react";
import Image from "next/image";
import { ROOM_ITEMS } from "@/data/room-items";
import { motion } from "framer-motion";
import { useAllHouseworks } from "@/hooks/features/housework/use-all-houseworks";
import { getHouseworkStatusById } from "@/lib/utils/get-housework-status";
import { getDirtinessLevel } from "@/lib/utils/get-dirtiness-level";
import { useHouseworkStore } from "@/stores/housework-store";

// 煙エフェクト用の円配置パターン（各エリアごとに異なる配置）
// x, y は領域中心からの相対オフセット（%）、size は領域幅に対する比率
interface SmokeCircle {
  x: number; // 中心からのXオフセット (%)
  y: number; // 中心からのYオフセット (%)
  size: number; // 領域幅に対するサイズ比率
}

const SMOKE_CONFIGS: Record<string, SmokeCircle[]> = {
  bath: [
    { x: -10, y: -8, size: 0.85 },
    { x: 15, y: 10, size: 0.8 },
    { x: -5, y: 15, size: 0.7 },
    { x: 18, y: -12, size: 0.65 },
    { x: 5, y: 0, size: 0.9 },
  ],
  "washing-machine": [
    { x: -8, y: -10, size: 0.9 },
    { x: 12, y: 8, size: 0.8 },
    { x: 0, y: 14, size: 0.75 },
    { x: -14, y: 10, size: 0.7 },
    { x: 10, y: -6, size: 0.8 },
  ],
  sink: [
    { x: 8, y: -8, size: 0.8 },
    { x: -12, y: 6, size: 0.85 },
    { x: 10, y: 14, size: 0.7 },
    { x: -6, y: -14, size: 0.65 },
    { x: 0, y: 4, size: 0.9 },
  ],
  toilet: [
    { x: -8, y: -6, size: 0.85 },
    { x: 10, y: 12, size: 0.8 },
    { x: -14, y: 10, size: 0.7 },
    { x: 8, y: -10, size: 0.75 },
    { x: 0, y: 6, size: 0.85 },
  ],
  trash: [
    { x: 0, y: -10, size: 0.8 },
    { x: -10, y: 8, size: 0.85 },
    { x: 14, y: -4, size: 0.7 },
    { x: -6, y: 14, size: 0.75 },
    { x: 8, y: 6, size: 0.8 },
  ],
  floor: [
    { x: -12, y: -6, size: 0.8 },
    { x: 12, y: 8, size: 0.85 },
    { x: -6, y: 14, size: 0.7 },
    { x: 15, y: -10, size: 0.65 },
    { x: 0, y: 0, size: 0.9 },
  ],
  desk: [
    { x: 6, y: -12, size: 0.8 },
    { x: -10, y: 8, size: 0.85 },
    { x: 12, y: 10, size: 0.7 },
    { x: -4, y: -6, size: 0.75 },
    { x: 10, y: -4, size: 0.85 },
  ],
};

// レベルに応じて表示する円の数
const CIRCLES_BY_LEVEL: Record<number, number> = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
};

interface ClickableRoomProps {
  onItemClick: (houseworkId: string) => void;
  selectedId: string | null;
}

/**
 * クリック可能な部屋コンポーネント
 * 画像上の各アイテムにクリック領域を配置し、選択された家事の詳細を表示
 */
export function ClickableRoom({ onItemClick, selectedId }: ClickableRoomProps) {
  // 全ての家事の状態を取得
  const { houseworksMap } = useAllHouseworks();

  // 選択されたアイテムを見つける
  const selectedItem = useMemo(() => {
    if (!selectedId) return null;
    return ROOM_ITEMS.find(item => item.houseworkId === selectedId);
  }, [selectedId]);

  // 進行中の家事IDを取得（進行中はオーバーレイを非表示にするため）
  const runningHouseworkId = useHouseworkStore((s) => s.runningHouseworkId);

  // ズームとパンの計算
  const transformStyle = useMemo(() => {
    if (!selectedItem) {
      return { scale: 1, x: 0, y: 0 };
    }

    const scale = 2;

    // アイテムの中心位置を計算（%を数値に変換）
    const itemCenterX = parseFloat(selectedItem.position.left) + parseFloat(selectedItem.position.width) / 2;
    const itemCenterY = parseFloat(selectedItem.position.top) + parseFloat(selectedItem.position.height) / 2;

    // 画面中央は50%, 50%なので、その差分を計算
    const deltaX = 50 - itemCenterX;
    const deltaY = 50 - itemCenterY;

    // ピクセル単位に変換（w-93 = 372px, h-111 = 444px として計算）
    const containerWidth = 372;
    const containerHeight = 444;
    // スケール後の移動量を計算（スケールを考慮）
    const translateX = (deltaX / 100) * containerWidth * scale;
    const translateY = (deltaY / 100) * containerHeight * scale;

    return {
      scale: scale,
      x: translateX,
      y: translateY,
    };
  }, [selectedItem]);

  return (
    <motion.div
      className="fixed top-7 right-1/2 translate-x-1/2 w-93 h-111 z-0"
      animate={{
        scale: transformStyle.scale,
        x: transformStyle.x,
        y: transformStyle.y,
      }}
      transition={{
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {/* 背景画像 */}
      <Image
        src="/images/room.svg"
        alt="部屋"
        fill
        priority
      />

      {/* クリック可能な領域と汚れオーバーレイ */}
      {ROOM_ITEMS.map((item, index) => {
        const houseworkData = houseworksMap[item.houseworkId];
        const isRunning = runningHouseworkId !== null && Number(item.houseworkId) === runningHouseworkId;

        const dirtiness = !isRunning && houseworkData
          ? getDirtinessLevel(getHouseworkStatusById(houseworkData.doneAt, item.houseworkId))
          : null;

        const showOverlay = dirtiness && dirtiness.level >= 2;

        return (
          <div key={item.id}>
            {/* 汚れモヤモヤオーバーレイ（レベル2以上で表示） */}
            {showOverlay && (() => {
              const circles = SMOKE_CONFIGS[item.id] ?? SMOKE_CONFIGS.floor;
              const count = CIRCLES_BY_LEVEL[dirtiness.level] ?? 3;
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute z-50 pointer-events-none overflow-visible"
                  style={{
                    top: item.position.top,
                    left: item.position.left,
                    width: item.position.width,
                    height: item.position.height,
                  }}
                >
                  {circles.slice(0, count).map((circle, i) => (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        left: `${50 + circle.x - (circle.size * 50)}%`,
                        top: `${50 + circle.y - (circle.size * 50)}%`,
                        width: `${circle.size * 100}%`,
                        height: `${circle.size * 100}%`,
                        borderRadius: "50%",
                        background: `radial-gradient(circle, ${dirtiness.cloudColor} 0%, transparent 70%)`,
                      }}
                    />
                  ))}
                </motion.div>
              );
            })()}

            {/* クリック可能な領域 */}
            <motion.button
              className="absolute cursor-pointer z-60"
              style={{
                top: item.position.top,
                left: item.position.left,
                width: item.position.width,
                height: item.position.height,
                backgroundColor: "transparent",
              }}
              onClick={() => onItemClick(item.houseworkId)}
              aria-label={`${item.name}を選択`}
            />
          </div>
        );
      })}
    </motion.div>
  );
}
