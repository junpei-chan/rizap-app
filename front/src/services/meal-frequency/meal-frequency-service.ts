import { authClient } from "@/lib/axios";
import type { MealFrequencyRequest } from "@/types/meal-frequency.types";
import type { ApiResponse } from "@/types/api.types";

export const mealFrequencyService = {
  createMealFrequency: async (params?: MealFrequencyRequest) => {
    const { data } = await authClient.post<ApiResponse>("/profile/meal_frequency", 
      params,
    );
    return data;
  },
  updateMealFrequency: async (params?: MealFrequencyRequest) => {
    const { data } = await authClient.patch<ApiResponse>("/profile/meal_frequency/edit",
      params,
    );
    return data;
  },
}