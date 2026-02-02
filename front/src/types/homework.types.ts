import { z } from "zod";

export const roomRequestSchema = z.array( // 配列形式
  z.object({
    homeworkId: z.number().int().min(1).max(8),
    doneAt: z.number().int(),
  })
);

export type RoomRequest = z.infer<typeof roomRequestSchema>;