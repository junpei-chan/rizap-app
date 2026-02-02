"use client";

import { useMutation } from "@tanstack/react-query";
import { mealFrequencyService } from "@/services/meal-frequency/meal-frequency-service";
import type { MealFrequencyRequest } from "@/types/meal-frequency.types";
import type { ApiError } from "@/types/api.types";

export const useCreateMealFrequency = () => {
  return useMutation({
    mutationFn: (params: MealFrequencyRequest) => mealFrequencyService.createMealFrequency(params),
    onSuccess: () => {
      console.log("食事頻度の登録に成功しました");
    },
    onError: (error: ApiError) => {
      console.error("食事頻度の登録に失敗しました: ", error.message);
    },
  });
};

export const useUpdateMealFrequency = () => {
  return useMutation({
    mutationFn: (params: MealFrequencyRequest) => mealFrequencyService.updateMealFrequency(params),
    onSuccess: () => {
      console.log("食事頻度の更新に成功しました");
    },
    onError: (error: ApiError) => {
      console.error("食事頻度の更新に失敗しました: ", error.message);
    },
  });
};