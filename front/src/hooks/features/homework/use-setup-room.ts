import { useMutation } from "@tanstack/react-query";
import { HomeworkService } from "@/services/homework/homework-service";
import type { RoomRequest } from "@/types/homework.types";
import type { ApiError } from "@/types/api.types";

export const useSetupRoom = () => {
  return useMutation({
    mutationFn: (params: RoomRequest) => HomeworkService.setupRoom(params),
    onSuccess: () => {
      console.log("ユーザーの部屋状態の保存に成功しました");
    },
    onError: (error: ApiError) => {
      console.error("ユーザーの部屋状態の保存に失敗しました :", error.message);
    },
  });
};