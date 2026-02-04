// Cleated by Github Copilot!!

/**
 * 現在時刻と指定された日時の差分を計算します
 * @param doneAt - 比較対象の日時文字列（ISO 8601形式）
 * @returns 時間差を表す文字列（例: "2時間34分", "45分", "たった今"）
*/

export function calculateTimeDifference(doneAt: string): string {
  const now = new Date();
  const doneTime = new Date(doneAt);
  
  // ミリ秒単位の差分を計算
  const diffMs = now.getTime() - doneTime.getTime();
  
  // 未来の時間の場合
  if (diffMs < 0) {
    return "未来の時間";
  }
  
  // 秒、分、時間、日に変換
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  // 表示形式を決定
  if (diffSeconds < 60) {
    return "たった今";
  } else if (diffHours < 24) {
    // 24時間未満は時間と分を表示
    const hours = diffHours;
    const minutes = diffMinutes % 60;
    if (hours === 0) {
      return `${minutes}分前`;
    }
    return minutes > 0 ? `${hours}時間${minutes}分前` : `${hours}時間前`;
  } else if (diffDays < 7) {
    // 1日以上7日未満は日単位で表示
    return `${diffDays}日前`;
  } else {
    // 7日以上は全て1週間以上と表示
    return "1週間以上前";
  }
}