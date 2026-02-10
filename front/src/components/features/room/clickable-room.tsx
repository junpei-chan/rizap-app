"use client";

import { useMemo } from "react";
import Image from "next/image";
import { ROOM_ITEMS } from "@/data/room-items";
import { motion } from "framer-motion";
import { useAllHouseworks } from "@/hooks/features/housework/use-all-houseworks";
import { getHouseworkStatusById } from "@/lib/utils/get-housework-status";
import { getDirtinessLevel } from "@/lib/utils/get-dirtiness-level";
import { useHouseworkStore } from "@/stores/housework-store";

// 雲の形状バリエーション（SVGパス）
const CLOUD_PATHS = [
  // もこもこした雲形状1
  "M15,60 C5,55 2,40 12,32 C8,20 22,10 35,16 C40,5 58,3 65,14 C72,5 90,12 88,28 C98,32 100,48 90,55 C96,65 85,75 72,70 C65,80 50,82 42,74 C32,82 15,75 18,65 C8,68 5,62 15,60Z",
  // 横に広がった雲形状2
  "M12,55 C2,48 4,32 16,26 C18,14 32,6 45,14 C52,2 68,5 72,18 C82,8 96,20 92,34 C100,42 96,58 84,58 C88,70 76,78 62,72 C52,82 38,80 30,70 C20,78 6,68 12,55Z",
  // 不規則な雲形状3
  "M22,58 C10,52 5,38 16,28 C14,16 28,6 42,14 C50,2 66,6 74,18 C85,10 98,24 92,38 C100,48 94,62 82,60 C86,72 74,82 58,74 C46,84 30,80 26,68 C14,76 6,66 22,58Z",
];

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
            {showOverlay && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute z-50 pointer-events-none"
                style={{
                  top: item.position.top,
                  left: item.position.left,
                  width: item.position.width,
                  height: item.position.height,
                }}
              >
                <svg
                  viewBox="-10 -10 120 105"
                  preserveAspectRatio="none"
                  className="w-full h-full overflow-visible"
                >
                  {/* 外側グロー（大きく・薄く） */}
                  <path
                    d={CLOUD_PATHS[index % CLOUD_PATHS.length]}
                    fill={dirtiness.cloudColor}
                    transform="translate(50,42.5) scale(1.25) translate(-50,-42.5)"
                    opacity={0.25}
                  />
                  {/* 中間グロー */}
                  <path
                    d={CLOUD_PATHS[index % CLOUD_PATHS.length]}
                    fill={dirtiness.cloudColor}
                    transform="translate(50,42.5) scale(1.12) translate(-50,-42.5)"
                    opacity={0.5}
                  />
                  {/* メインの雲 */}
                  <path
                    d={CLOUD_PATHS[index % CLOUD_PATHS.length]}
                    fill={dirtiness.cloudColor}
                  />
                </svg>
              </motion.div>
            )}

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
