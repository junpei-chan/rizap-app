// Created by Github Copilot!!

import {
  HouseworkStatus,
  HouseworkStatusNormal,
  HouseworkStatusLaundry,
  HouseworkStatusTrash,
  HouseworkStatusOrganize,
} from "@/types/housework.types";

/**
 * 最後に作業した日から経過した日数を計算
 * @param lastDoneDate 最後に作業した日の文字列（YYYY-MM-DD形式など）
 * @returns 経過日数
 */
function calculateDaysSinceLastDone(lastDoneDate: string): number {
  const lastDone = new Date(lastDoneDate);
  const today = new Date();
  
  // 時間を0時0分0秒にリセットして日数のみで計算
  lastDone.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const diffTime = today.getTime() - lastDone.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

/**
 * 通常の家事の状態を取得
 * - 0日（今日） → とても綺麗
 * - 1日前 → 綺麗
 * - 2〜3日前 → 少し汚れている
 * - 4〜5日前 → 汚れている
 * - 6日以上前 → 限界
 */
function getNormalStatus(daysSince: number): HouseworkStatusNormal {
  if (daysSince === 0) return "とても綺麗";
  if (daysSince === 1) return "綺麗";
  if (daysSince >= 2 && daysSince <= 3) return "少し汚れている";
  if (daysSince >= 4 && daysSince <= 5) return "汚れている";
  return "限界";
}

/**
 * 洗濯の状態を取得
 * - 0日（今日） → 完了
 * - 1日前 → 少し溜まっている
 * - 2〜3日前 → 溜まっている
 * - 4〜5日前 → かなり溜まっている
 * - 6日以上前 → 限界
 */
function getLaundryStatus(daysSince: number): HouseworkStatusLaundry {
  if (daysSince === 0) return "完了";
  if (daysSince === 1) return "少し溜まっている";
  if (daysSince >= 2 && daysSince <= 3) return "溜まっている";
  if (daysSince >= 4 && daysSince <= 5) return "かなり溜まっている";
  return "限界";
}

/**
 * ゴミの状態を取得
 * - 0日（今日） → 完了
 * - 1日前 → 少し入っている
 * - 2〜3日前 → 半分くらい
 * - 4〜5日前 → いっぱい
 * - 6日以上前 → 限界
 */
function getTrashStatus(daysSince: number): HouseworkStatusTrash {
  if (daysSince === 0) return "完了";
  if (daysSince === 1) return "少し入っている";
  if (daysSince >= 2 && daysSince <= 3) return "半分くらい";
  if (daysSince >= 4 && daysSince <= 5) return "いっぱい";
  return "限界";
}

/**
 * 整理整頓の状態を取得
 * - 0日（今日） → 完了
 * - 1日前 → 少し残っている
 * - 2〜3日前 → 残っている
 * - 4〜5日前 → たまっている
 * - 6日以上前 → 限界
 */
function getOrganizeStatus(daysSince: number): HouseworkStatusOrganize {
  if (daysSince === 0) return "完了";
  if (daysSince === 1) return "少し残っている";
  if (daysSince >= 2 && daysSince <= 3) return "残っている";
  if (daysSince >= 4 && daysSince <= 5) return "たまっている";
  return "限界";
}

/**
 * 家事名に基づいて適切な状態を取得するメイン関数
 * @param lastDoneDate 最後に作業した日（YYYY-MM-DD形式など）
 * @param houseworkName 家事名（洗濯、ゴミ、整理整頓など）
 * @returns 家事の状態
 */
export function getHouseworkStatus(
  lastDoneDate: string,
  houseworkName: string
): HouseworkStatus {
  const daysSince = calculateDaysSinceLastDone(lastDoneDate);
  
  // 家事名を正規化（小文字化、空白除去）
  const normalizedName = houseworkName.toLowerCase().trim();
  
  // 家事名に応じて適切な状態関数を呼び出す
  if (normalizedName.includes("洗濯") || normalizedName.includes("せんたく")) {
    return getLaundryStatus(daysSince);
  }
  
  if (
    normalizedName.includes("ゴミ") || 
    normalizedName.includes("ごみ") ||
    normalizedName.includes("trash") ||
    normalizedName.includes("garbage")
  ) {
    return getTrashStatus(daysSince);
  }
  
  if (
    normalizedName.includes("整理整頓") || 
    normalizedName.includes("整理") ||
    normalizedName.includes("整頓") ||
    normalizedName.includes("せいり")
  ) {
    return getOrganizeStatus(daysSince);
  }
  
  // デフォルトは通常の状態
  return getNormalStatus(daysSince);
}

/**
 * 家事IDに基づいて適切な状態を取得する関数
 * @param lastDoneDate 最後に作業した日（YYYY-MM-DD形式など）
 * @param houseworkId 家事ID（1-8）
 * @returns 家事の状態
 * 
 * 想定される家事IDマッピング（必要に応じて調整）:
 * 1: 洗濯
 * 2: ゴミ
 * 3: 整理整頓
 * 4-8: その他（通常の状態）
 */
export function getHouseworkStatusById(
  lastDoneDate: string,
  houseworkId: number
): HouseworkStatus {
  const daysSince = calculateDaysSinceLastDone(lastDoneDate);
  
  switch (houseworkId) {
    case 1:
      return getLaundryStatus(daysSince);
    case 2:
      return getTrashStatus(daysSince);
    case 3:
      return getOrganizeStatus(daysSince);
    default:
      return getNormalStatus(daysSince);
  }
}
