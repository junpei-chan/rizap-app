/**
 * doneAtの日時文字列を時間と分のみの形式に変換する
 * @param doneAt - YYYY-MM-DD HH:MM:SS形式の日時文字列
 * @returns HH:MM形式の時間文字列
 * @example
 * formatDoneAtToTime("2026-02-04 14:30:00") // "14:30"
 */
export const formatDoneAtToTime = (doneAt: string): string => {
  try {
    // スペースで分割して時間部分を取得
    const timePart = doneAt.split(" ")[1];
    
    if (!timePart) {
      return "";
    }
    
    // HH:MM:SS から HH:MM を取得
    const [hours, minutes] = timePart.split(":");
    
    if (!hours || !minutes) {
      return "";
    }
    
    return `${hours}:${minutes}`;
  } catch (error) {
    console.error("Error formatting doneAt:", error);
    return "";
  }
};
