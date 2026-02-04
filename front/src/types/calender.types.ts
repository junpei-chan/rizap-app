import { z } from "zod";

export const calenderRequestSchema = z.object({
  year: z.number().int(),
  month: z.number().int(),
});

export const calenderReponseSchema = z.object({
  year: z.number().int(),
  month: z.number().int(),
  totalCalorie: z.number().int(),
  logs: z.array(
    z.object({
      houseworkName: z.string(),
      calorie: z.number().int(),
      doneAt: z.string(),
    }),
  ),
});

export const calenderDateRequestSchema = z.object({
  date: z.string(), // YYYY-MM-DD形式
});

export type CalenderRequest = z.infer<typeof calenderRequestSchema>;
export type CalenderResponse = z.infer<typeof calenderReponseSchema>;

export type CalenderDateRequest = z.infer<typeof calenderDateRequestSchema>;
export type CalenderDateResponse = {
  date: string;
  totalCalorie: number;
  logs: Array<{
    houseworkName: string;
    calorie: number;
    doneAt: string;
  }>;
}

// Store用の型
export type CalenderData = CalenderResponse | null;
export type CalenderLog = CalenderResponse["logs"][number];