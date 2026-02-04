// Cleated by Github Copilot!!

import { HOUSEWORK_CALORIES } from "@/data/homework-items";

/**
 * 家事IDとレベルから消費カロリーを取得
 * @param houseworkId - 家事ID (1-8)
 * @param doneAt - 家事の状態レベル
 * @returns 消費カロリー (kcal)、該当なしの場合は0
 */
export const getCaloriesByHouseworkAndLevel = (
  houseworkId: string,
  doneAt: string
): number => {
  return HOUSEWORK_CALORIES[houseworkId]?.[doneAt] ?? 0;
};
