import { z } from "zod";

// Zodスキーマ定義（バリデーション用）
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

// 型定義はhousework-base.typesから再エクスポート
export type {
  RoomRequest,
  HouseworkRequest,
  HouseworkResponse,
  HouseworkStartRequest,
  HouseworkStatus,
  HouseworkStatusNormal,
  HouseworkStatusLaundry,
  HouseworkStatusTrash,
  HouseworkStatusOrganize,
} from "./housework-base.types";