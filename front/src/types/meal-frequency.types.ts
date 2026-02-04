import { z } from "zod";

export const mealFrequencySchema = z.object({
  meal_frequency: z.number().int().min(1).max(7), // TODO: バックエンドがcamelCaseを受け入れるように
});

export type MealFrequencyRequest = z.infer<typeof mealFrequencySchema>;