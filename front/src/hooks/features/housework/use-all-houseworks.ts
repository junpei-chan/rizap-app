import { useQueries } from "@tanstack/react-query";
import { HouseworkService } from "@/services/housework/housework-service";
import { ROOM_ITEMS } from "@/data/room-items";
import type { HouseworkResponse } from "@/types/housework-base.types";

/**
 * 全ての家事の状態を取得するカスタムフック
 * ROOM_ITEMSで定義されている全ての家事の情報を並行して取得
 */
export const useAllHouseworks = () => {
  const queries = useQueries({
    queries: ROOM_ITEMS.map((item) => ({
      queryKey: ["housework", Number(item.houseworkId)],
      queryFn: () => HouseworkService.getHousework({ 
        houseworkId: Number(item.houseworkId),
        calorie: 0,
      }),
      staleTime: 5 * 60 * 1000,
    })),
  });

  // 各家事のデータをhouseworkIdをキーとしたマップに変換
  const houseworksMap = queries.reduce((acc, query, index) => {
    const houseworkId = ROOM_ITEMS[index].houseworkId;
    if (query.data) {
      acc[houseworkId] = query.data;
    }
    return acc;
  }, {} as Record<string, HouseworkResponse>);

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);

  return {
    houseworksMap,
    isLoading,
    isError,
  };
};
