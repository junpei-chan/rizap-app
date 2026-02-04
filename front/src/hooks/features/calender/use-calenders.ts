import { useMutation } from "@tanstack/react-query";
import { calenderService } from "@/services/calender/calender-service";
import { CalenderRequest, CalenderDateRequest, CalenderResponse, CalenderDateResponse } from "@/types/calender.types";
import { ApiError } from "@/types/api.types";
import { useCalenderStore } from "@/stores/calender-store";

export const useGetCalender = () => {
  const { setCalenderData } = useCalenderStore();

  return useMutation({
    mutationFn: (params: CalenderRequest) => calenderService.getCalender(params),
    onSuccess: (data: CalenderResponse) => {
      setCalenderData(data); // Zustandストア更新
      console.log("カレンダーの取得に成功しました");
    },
    onError: (error: ApiError) => {
      console.error("カレンダーの取得に失敗しました :", error.message);
    },
  });
};

export const useGetCalenderDate = () => {
  const { setSelectedDate } = useCalenderStore();

  return useMutation({
    mutationFn: (params: CalenderDateRequest) => calenderService.getCalenderDate(params),
    onSuccess: (data: CalenderDateResponse) => {
      setSelectedDate(data); // Zustandストア更新
      console.log("日付ごとのカレンダーデータの取得に成功しました");
    },
    onError: (error: ApiError) => {
      console.error("日付ごとのカレンダーデータの取得に失敗しました :", error.message);
    },
  });
};