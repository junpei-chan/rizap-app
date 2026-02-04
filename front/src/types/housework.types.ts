import { z } from "zod";

export const roomRequestSchema = z.array( // 配列形式
  z.object({
    houseworkId: z.number().int().min(1).max(8),
    doneAt: z.string(),
  }),
);

export const houseworkRequestSchema = z.object({
  houseworkId: z.number().int().max(1),
  calorie: z.number().int(),
});

export const houseworkResponseSchema = z.object({
  houseworkId: z.string().min(1),
  status: z.string(),
  doneAt: z.string(),
});

export const houseworkStartRequestSchema = z.object({
  houseworkId: z.number().int(),
});

export type RoomRequest = z.infer<typeof roomRequestSchema>;
export type HouseworkRequest = z.infer<typeof houseworkRequestSchema>;
export type HouseworkResponse = z.infer<typeof houseworkResponseSchema>;
export type HouseworkStartRequest = z.infer<typeof houseworkStartRequestSchema>;

// 家事の状態（通常版）
export type HouseworkStatusNormal = 
  | "とても綺麗"
  | "綺麗"
  | "少し汚れている"
  | "汚れている"
  | "限界";

// 家事の状態（洗濯）
export type HouseworkStatusLaundry = 
  | "完了"
  | "少し溜まっている"
  | "溜まっている"
  | "かなり溜まっている"
  | "限界";

// 家事の状態（ゴミ）
export type HouseworkStatusTrash = 
  | "完了"
  | "少し入っている"
  | "半分くらい"
  | "いっぱい"
  | "限界";

// 家事の状態（整理整頓）
export type HouseworkStatusOrganize = 
  | "完了"
  | "少し残っている"
  | "残っている"
  | "たまっている"
  | "限界";

// 家事の状態（全体）
export type HouseworkStatus = 
  | HouseworkStatusNormal
  | HouseworkStatusLaundry
  | HouseworkStatusTrash
  | HouseworkStatusOrganize;