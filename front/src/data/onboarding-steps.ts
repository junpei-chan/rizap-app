export type StepDef = {
  id: string;
  question: string;
  options: string[];
  optionNums: number[];
  nextLabel?: string;
};

export const STEPS: StepDef[] = [
  {
    id: "meal_frequency",
    question: "普段、週にどれくらいの頻度で\n家でご飯を食べますか？",
    options: ["0回", "1~2回", "3~4回", "5~6回", "7回"],
    optionNums: [0, 2, 4, 6, 7],
  },
  {
    id: "dishwashing_last",
    question: "洗い物は最後にいつしましたか？",
    options: ["今日", "昨日", "2日前", "1週間以上前"],
    optionNums: [0, 1, 2, 7],
  },
  {
    id: "laundry_last",
    question: "洗濯は最後にいつしましたか？",
    options: ["今日", "昨日", "2日~3日前", "4日~6日前", "1週間以上前"],
    optionNums: [0, 1, 3, 6, 7],
  },
  {
    id: "trash_last",
    question: "ゴミ捨ては最後にいつしましたか？",
    options: ["今週", "先週", "もっと前"],
    optionNums: [3, 7, 14],
  },
  {
    id: "vacuum_last",
    question: "床掃除は最後にいつしましたか？\n（掃除機など）",
    options: ["今日", "2日~3日前", "4日~6日前", "1週間以上前"],
    optionNums: [0, 3, 6, 7],
  },
  {
    id: "mop_last",
    question: "床掃除は最後にいつしましたか？\n（雑巾など）",
    options: ["今日", "2日~3日前", "4日~6日前", "1週間以上前"],
    optionNums: [0, 3, 6, 7],
  },
  {
    id: "tidy_last",
    question: "整理整頓は最後にいつしましたか？",
    options: ["今日", "~1週間前", "~3週間前", "1ヶ月以上前"],
    optionNums: [0, 7, 21, 30],
  },
  {
    id: "bath_last",
    question: "風呂掃除は最後にいつしましたか？",
    options: ["今日", "2~3日前", "4~6日前", "1週間以上前"],
    optionNums: [0, 3, 6, 7],
  },
  {
    id: "toilet_last",
    question: "トイレ掃除は最後にいつしましたか？",
    options: ["今日", "2~3日前", "4~6日前", "1週間以上前"],
    optionNums: [0, 3, 6, 7],
    nextLabel: "はじめる",
  },
];
