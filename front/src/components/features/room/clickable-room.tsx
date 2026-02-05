"use client";

import { useMemo } from "react";
import Image from "next/image";
import { ROOM_ITEMS } from "@/data/room-items";
import { motion } from "framer-motion";
import { useAllHouseworks } from "@/hooks/features/housework/use-all-houseworks";
import { getHouseworkStatusById } from "@/lib/utils/get-housework-status";
import { useHouseworkStore } from "@/stores/housework-store";
import type { HouseworkStatus } from "@/types/housework-base.types";

interface ClickableRoomProps {
  onItemClick: (houseworkId: string) => void;
  selectedId: string | null;
}

/**
 * 家事の状態が「かなり溜まっている」以上かどうかを判定
 */
const isHighPriorityStatus = (status: HouseworkStatus): boolean => {
  const highPriorityStatuses = [
    "かなり溜まっている",
    "限界です",
    "汚れている",
    "いっぱい",
    "たまっている",
  ];
  return highPriorityStatuses.includes(status);
};

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

  // 進行中の家事IDを取得（進行中はアラートを非表示にするため）
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

      {/* クリック可能な領域とステータスインジケーター */}
      {ROOM_ITEMS.map((item) => {
        const houseworkData = houseworksMap[item.houseworkId];
        // 進行中の家事はアラートを表示しない
        const isRunning = runningHouseworkId !== null && Number(item.houseworkId) === runningHouseworkId;

        const shouldShowIndicator =
          !isRunning &&
          houseworkData &&
          (() => {
            const status = getHouseworkStatusById(houseworkData.doneAt, item.houseworkId);
            return isHighPriorityStatus(status);
          })();

        // 位置に応じて左/右のアラート画像を切り替える
        const isRightSide = parseFloat(item.position.left) > 50;
        const alertSrc = isRightSide ? "/images/alert-right.svg" : "/images/alert-left.svg";

        return (
          <div key={item.id}>
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

            {/* ステータスインジケーター画像 */}
            {shouldShowIndicator && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute z-50 pointer-events-none"
                style={{
                  top: item.position.top,
                  left: item.position.left,
                  width: item.position.width,
                  height: item.position.height,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={alertSrc}
                  alt=""
                  width={52}
                  height={52}
                />
              </motion.div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
}
