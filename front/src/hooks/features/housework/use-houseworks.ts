import { useMutation } from "@tanstack/react-query";
import { HouseworkService } from "@/services/housework/housework-service";
import { HouseworkRequest, HouseworkStartRequest } from "@/types/housework.types";
import { ApiError } from "@/types/api.types";

export const useGetHousework = () => {
  return useMutation({
    mutationFn: (params?: HouseworkRequest) => HouseworkService.getHousework(params),
    onSuccess: () => {
      console.log("家事情報の取得に成功しました");
    },
    onError: (error: ApiError) => {
      console.error("家事情報の取得に失敗しました :", error.message);
    },
  });
};

export const useStartHousework = () => {
  return useMutation({
    mutationFn: (housework: HouseworkStartRequest) => HouseworkService.startHousework(housework),
    onSuccess: () => {
      console.log("家事の開始に成功しました");
    },
    onError: (error: ApiError) => {
      console.error("家事の開始に失敗しました :", error.message);
    },
  });
};

export const useEndHousework = () => {
  return useMutation ({
    mutationFn: (params: HouseworkRequest) => HouseworkService.endHousework(params),
    onSuccess: () => {
      console.log("家事の終了に成功しました");
    },
    onError: (error: ApiError) => {
      console.error("家事の終了に失敗しました :", error.message);
    },
  });
};
