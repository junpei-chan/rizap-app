import { z } from "zod";

export const roomRequestSchema = z.array( // 配列形式
  z.object({
    houseworkId: z.number().int().min(1).max(8),
    doneAt: z.string(),
  }),
);

export const houseworkRequestSchema = z.object({
  houseworkId: z.string().max(1),
});

export const houseworkResponseSchema = z.object({
  houseworkId: z.string().min(1),
  status: z.string(),

});

export const houseworkStartRequestSchema = z.object({
  housework: z.string(),
});

export type RoomRequest = z.infer<typeof roomRequestSchema>;
export type HouseworkRequest = z.infer<typeof houseworkRequestSchema>;
export type HouseworkStartRequest = z.infer<typeof houseworkStartRequestSchema>;