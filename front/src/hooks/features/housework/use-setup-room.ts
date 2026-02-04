import { useMutation } from "@tanstack/react-query";
import { HouseworkService } from "@/services/housework/housework-service";
import type { RoomRequest } from "@/types/housework-base.types";
import type { ApiError } from "@/types/api.types";

export const useSetupRoom = () => {
  return useMutation({
    mutationFn: (params: RoomRequest) => HouseworkService.setupRoom(params),
    onSuccess: () => {
      console.log("ユーザーの部屋状態の保存に成功しました");
    },
    onError: (error: ApiError) => {
      console.error("ユーザーの部屋状態の保存に失敗しました :", error.message);
    },
  });
};
