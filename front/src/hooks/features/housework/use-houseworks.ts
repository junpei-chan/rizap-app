import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { HouseworkService } from "@/services/housework/housework-service";
import { HouseworkRequest, HouseworkStartRequest } from "@/types/housework.types";
import { ApiError } from "@/types/api.types";
import { useHouseworkStore } from "@/stores/housework-store";

export const useGetHousework = (params?: HouseworkRequest) => {
  const startHousework = useHouseworkStore((state) => state.startHousework);
  const endHousework = useHouseworkStore((state) => state.endHousework);

  const query = useQuery({
    queryKey: ["housework", params?.houseworkId],
    queryFn: () => HouseworkService.getHousework(params),
    enabled: !!params?.houseworkId,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data) {
      if (query.data.status === "running" && params?.houseworkId) {
        startHousework(params.houseworkId);
      } else if (query.data.status === "stopped") {
        endHousework();
      }
    }
  }, [query.data, params?.houseworkId, startHousework, endHousework]);

  return query;
};

export const useStartHousework = () => {
  const startHousework = useHouseworkStore((state) => state.startHousework);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (housework: HouseworkStartRequest) => HouseworkService.startHousework(housework),
    onSuccess: (_, variables) => {
      startHousework(variables.houseworkId);
      // React Query のキャッシュを無効化して再フェッチ
      queryClient.invalidateQueries({ queryKey: ["housework", variables.houseworkId] });
      console.log("家事の開始に成功しました");
    },
    onError: (error: ApiError & { response?: { status: number } }, variables) => {
      if (error.response?.status === 409) {
        startHousework(variables.houseworkId);
        console.log("家事はすでに作業中です（状態を同期しました）");
      } else {
        console.error("家事の開始に失敗しました :", error.message);
      }
    },
  });
};

export const useEndHousework = () => {
  const endHousework = useHouseworkStore((state) => state.endHousework);
  const queryClient = useQueryClient();

  return useMutation ({
    mutationFn: (params: HouseworkRequest) => HouseworkService.endHousework(params),
    onSuccess: (_, variables) => {
      endHousework();
      // React Query のキャッシュを無効化して再フェッチ
      queryClient.invalidateQueries({ queryKey: ["housework", variables.houseworkId] });
      console.log("家事の終了に成功しました");
    },
    onError: (error: ApiError) => {
      console.error("家事の終了に失敗しました :", error.message);
    },
  });
};
