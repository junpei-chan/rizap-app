import { z } from "zod";

export const roomRequestSchema = z.array( // 配列形式
  z.object({
    homeworkId: z.number().int().min(1).max(8),
    doneAt: z.number().int(),
  }),
);

export const homeworkRequestSchema = z.object({
  homeworkId: z.string().max(1),
});

export const homeworkStartRequestSchema = z.object({
  homework: z.string(),
});

export type RoomRequest = z.infer<typeof roomRequestSchema>;
export type HomeworkRequest = z.infer<typeof homeworkRequestSchema>;
export type HomeworkStartRequest = z.infer<typeof homeworkStartRequestSchema>;

export interface HomeworkResponse {
  doneAt: string;
}