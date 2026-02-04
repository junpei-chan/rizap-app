// Create by Github Copilot!!

"use client";

import { getHouseworkStatus, getHouseworkStatusById } from "@/lib/utils/";
import { ThumbsUp, Smile, Frown, ThumbsDown, TriangleAlert, CircleQuestionMark } from "lucide-react";
import type { HouseworkStatus } from "@/types/housework-base.types";
import { cn } from "@/lib/utils";

interface HouseworkStatusBadgeProps {
  lastDoneDate: string;
  houseworkName?: string;
  houseworkId?: string;
  className?: string;
  showIcon?: boolean;
  showText?: boolean;
}

/**
 * 状態に対応するアイコンを取得
 */
function getStatusIcon(status: HouseworkStatus) {
  // 完了系
  if (status === "完了" || status === "とても綺麗") {
    return <ThumbsUp />;
  }
  
  // レベル2（少し系、綺麗）
  if (
    status === "綺麗" ||
    status === "少し溜まっている" ||
    status === "少し入っている" ||
    status === "少し残っている" ||
    status === "少し汚れている"
  ) {
    return <Smile />;
  }
  
  // レベル3（中間系）
  if (
    status === "溜まっている" ||
    status === "半分くらい" ||
    status === "残っている"
  ) {
    return <Frown />;
  }
  
  // レベル4（かなり系、汚れている）
  if (
    status === "かなり溜まっている" ||
    status === "いっぱい" ||
    status === "たまっている" ||
    status === "汚れている"
  ) {
    return <ThumbsDown />;
  }
  
  // 限界
  if (status === "限界です") {
    return <TriangleAlert />;
  }
  
  return <CircleQuestionMark />;
}

/**
 * 状態に対応する色クラスを取得
 */
function getStatusColorClass(status: HouseworkStatus): string {
  // 完了系 - 緑
  if (status === "完了" || status === "とても綺麗") {
    return "text-[#66E08B]";
  }
  
  // レベル2 - 青
  if (
    status === "綺麗" ||
    status === "少し溜まっている" ||
    status === "少し入っている" ||
    status === "少し残っている" ||
    status === "少し汚れている"
  ) {
    return "text-[#108FFF]";
  }
  
  // レベル3 - オレンジ
  if (
    status === "溜まっている" ||
    status === "半分くらい" ||
    status === "残っている"
  ) {
    return "text-[#FFC267]";
  }
  
  // レベル4 - 赤（薄め）
  if (
    status === "かなり溜まっている" ||
    status === "いっぱい" ||
    status === "たまっている" ||
    status === "汚れている"
  ) {
    return "text-[#FF754F]";
  }
  
  // 限界 - 赤（濃いめ）
  if (status === "限界です") {
    return "text-[#FF6453]";
  }
  
  return "text-gray-600";
}

/**
 * 家事の状態を表示するバッジコンポーネント
 */
export function HouseworkStatusBadge({
  lastDoneDate,
  houseworkName,
  houseworkId,
  className,
  showIcon = true,
  showText = true,
}: HouseworkStatusBadgeProps) {
  // 状態を取得
  const status =
    houseworkId !== undefined
      ? getHouseworkStatusById(lastDoneDate, houseworkId)
      : getHouseworkStatus(lastDoneDate, houseworkName || "");

  const icon = getStatusIcon(status);
  const colorClass = getStatusColorClass(status);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 font-medium transition-colors",
        colorClass,
        className
      )}
    >
      {showIcon && <span className="text-lg">{icon}</span>}
      {showText && <span>{status}</span>}
    </div>
  );
}
