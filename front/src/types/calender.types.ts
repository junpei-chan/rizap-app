import { z } from "zod";

export const calenderRequestSchema = z.object({
  year: z.number().int(),
  month: z.number().int(),
  housework_id: z.string(),
});

export const calenderReponseSchema = z.object({
  year: z.number().int(),
  month: z.number().int(),
  total_calorie: z.number().int(),
  logs: z.array(
    z.object({
      housework_name: z.string(),
      calorie: z.number().int(),
      done_at: z.string(),
    }),
  ),
});

export type CalenderRequest = z.infer<typeof calenderRequestSchema>;
export type CalenderResponse = z.infer<typeof calenderReponseSchema>;