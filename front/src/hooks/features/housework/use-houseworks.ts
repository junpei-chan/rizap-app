import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { HouseworkService } from "@/services/housework/housework-service";
import type { HouseworkRequest, HouseworkStartRequest } from "@/types/housework-base.types";
import { ApiError } from "@/types/api.types";
import { useHouseworkStore } from "@/stores/housework-store";

export const useGetHousework = (params?: HouseworkRequest) => {
  const startHousework = useHouseworkStore((state) => state.startHousework);
  const endHousework = useHouseworkStore((state) => state.endHousework);
  const runningHouseworkId = useHouseworkStore((state) => state.runningHouseworkId);

  const query = useQuery({
    queryKey: ["housework", params?.houseworkId],
    queryFn: () => HouseworkService.getHousework(params),
    enabled: !!params?.houseworkId,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data && params?.houseworkId) {
      // サーバーの状態とローカルの状態が異なる場合のみ同期
      const isServerRunning = query.data.status === "running";
      const isLocalRunning = runningHouseworkId === params.houseworkId;
      
      if (isServerRunning && !isLocalRunning) {
        startHousework(params.houseworkId);
      } else if (!isServerRunning && isLocalRunning) {
        endHousework();
      }
    }
  }, [query.data, params?.houseworkId, startHousework, endHousework, runningHouseworkId]);

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
    onMutate: async () => {
      // 楽観的更新: API リクエスト前に即座に状態を更新
      endHousework();
    },
    onSuccess: async (_, variables) => {
      // React Query のキャッシュを無効化して再フェッチ
      await queryClient.invalidateQueries({ queryKey: ["housework", variables.houseworkId] });
      await queryClient.invalidateQueries({ queryKey: ["calender"] });
      await queryClient.invalidateQueries({ queryKey: ["calenderDate"] });
      console.log("家事の終了に成功しました");
    },
    onError: (error: ApiError, variables) => {
      console.error("家事の終了に失敗しました :", error.message);
      // エラー時は状態を元に戻す
      queryClient.invalidateQueries({ queryKey: ["housework", variables.houseworkId] });
    },
  });
};
