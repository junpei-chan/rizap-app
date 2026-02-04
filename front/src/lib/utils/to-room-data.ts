export function toRoomData(answers: Record<string, number>) {
  const QUESTION_TO_HOUSEWORK_MAP: Record<string, number> = {
    "dishwashing_last": 1,
    "laundry_last": 2,
    "trash_last": 3,
    "vacuum_last": 4,
    "mop_last": 4,
    "tidy_last": 5,
    "bath_last": 6,
    "toilet_last": 7,
  };

  const result = Object.entries(answers)
    .filter(([key]) => key !== "meal_frequency")
    .map(([questionId, daysAgo]) => {
      const houseworkId = QUESTION_TO_HOUSEWORK_MAP[questionId];
      const daysAgoNum = Number(daysAgo);

      const doneAt = new Date();
      doneAt.setDate(doneAt.getDate() - daysAgoNum);

      // ↓ こんなの分かるわけないだろ！！😡😡
      // MySQL用のフォーマット: YYYY-MM-DD HH:mm:ss
      const year = doneAt.getFullYear();
      const month = String(doneAt.getMonth() + 1).padStart(2, '0');
      const day = String(doneAt.getDate()).padStart(2, '0');
      const hours = String(doneAt.getHours()).padStart(2, '0');
      const minutes = String(doneAt.getMinutes()).padStart(2, '0');
      const seconds = String(doneAt.getSeconds()).padStart(2, '0');
      const mysqlFormat = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      return {
        homework_id: houseworkId,
        done_at: mysqlFormat,
      };
    });
  return result;
}