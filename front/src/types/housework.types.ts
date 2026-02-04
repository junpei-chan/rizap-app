import { z } from "zod";

export const roomRequestSchema = z.array( // 配列形式
  z.object({
    housework_id: z.number().int().min(1).max(8),
    done_at: z.string(),
  }),
);

export const houseworkRequestSchema = z.object({
  houseworkId: z.string().max(1),
});

export const houseworkStartRequestSchema = z.object({
  housework: z.string(),
});

export type RoomRequest = z.infer<typeof roomRequestSchema>;
export type HouseworkRequest = z.infer<typeof houseworkRequestSchema>;
export type HouseworkStartRequest = z.infer<typeof houseworkStartRequestSchema>;

export interface HouseworkResponse {
  doneAt: string;
}
