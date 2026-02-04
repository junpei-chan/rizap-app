import { useMutation, useQuery } from "@tanstack/react-query";
import { HouseworkService } from "@/services/housework/housework-service";
import { HouseworkRequest, HouseworkStartRequest } from "@/types/housework.types";
import { ApiError } from "@/types/api.types";
import { useHouseworkStore } from "@/stores/housework-store";

export const useGetHousework = (params?: HouseworkRequest) => {
  return useQuery({
    queryKey: ["housework", params?.houseworkId],
    queryFn: () => HouseworkService.getHousework(params),
    enabled: !!params?.houseworkId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useStartHousework = () => {
  const startHousework = useHouseworkStore((state) => state.startHousework);

  return useMutation({
    mutationFn: (housework: HouseworkStartRequest) => HouseworkService.startHousework(housework),
    onSuccess: (_, variables) => {
      startHousework(variables.houseworkId);
      console.log("家事の開始に成功しました");
    },
    onError: (error: ApiError) => {
      console.error("家事の開始に失敗しました :", error.message);
    },
  });
};

export const useEndHousework = () => {
  const endHousework = useHouseworkStore((state) => state.endHousework);

  return useMutation ({
    mutationFn: (params: HouseworkRequest) => HouseworkService.endHousework(params),
    onSuccess: () => {
      endHousework();
      console.log("家事の終了に成功しました");
    },
    onError: (error: ApiError) => {
      console.error("家事の終了に失敗しました :", error.message);
    },
  });
};
