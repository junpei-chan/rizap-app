import { useMutation } from "@tanstack/react-query";
import { HomeworkService } from "@/services/homework/homework-service";
import { HomeworkRequest } from "@/types/homework.types";
import { ApiError } from "@/types/api.types";

export const useGetHomework = () => {
  return useMutation({
    mutationFn: (params?: HomeworkRequest) => HomeworkService.getHomework(params),
    onSuccess: () => {
      console.log("家事情報の取得に成功しました");
    },
    onError: (error: ApiError) => {
      console.error("家事情報の取得に失敗しました :", error.message);
    },
  });
};