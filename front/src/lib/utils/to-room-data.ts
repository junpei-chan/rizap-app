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

  return Object.entries(answers)
    .filter(([key]) => key !== "meal_frequency")
    .map(([questionId, daysAgo]) => {
      const houseworkId = QUESTION_TO_HOUSEWORK_MAP[questionId];
      const daysAgoNum = Number(daysAgo);

      const doneAt = new Date();
      doneAt.setDate(doneAt.getDate() - daysAgoNum);

      return {
        homeworkId: houseworkId,
        doneAt: doneAt.getTime(),
      };
    })
}