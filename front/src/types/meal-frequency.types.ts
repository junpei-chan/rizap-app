import { z } from "zod";

export const mealFrequencySchema = z.object({
  mealFrequency: z.number().int().min(1).max(7),
});

export type MealFrequencyRequest = z.infer<typeof mealFrequencySchema>;