// Cleated by Github Copilot!!

import { CalenderResponse } from "@/types/calender.types";

/**
 * 日付をYYYY-MM-DD形式にフォーマット
 */
export const formatDateToYMD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * 日付をYYYY-MM-DD HH:mm:ss形式にフォーマット（MySQL用）
 */
export const formatDateToYMDHMS = (date: Date): string => {
  const ymd = formatDateToYMD(date);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${ymd} ${hours}:${minutes}:${seconds}`;
};

/**
 * カレンダーデータから家事を実施した日付のSetを生成
 */
export const getHouseworkDatesFromCalendar = (
  calenderData?: CalenderResponse | null
): Set<string> => {
  if (!calenderData?.logs) return new Set<string>();

  return new Set(
    calenderData.logs.map((log) => {
      const date = new Date(log.doneAt);
      return formatDateToYMD(date);
    })
  );
};
