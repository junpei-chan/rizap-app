import { publicClient } from "@/lib/axios";
import type { MealFrequencyRequest } from "@/types/meal-frequency.types";
import type { ApiResponse } from "@/types/api.types";

export const userService = {
  createMealFrequency: async (params?: MealFrequencyRequest) => {
    const { data } = await publicClient.post<ApiResponse>("/profile/meal_frequency", {
      params,
    });
    return data;
  }
}