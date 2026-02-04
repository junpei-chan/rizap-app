import { useQuery } from "@tanstack/react-query";
import { calenderService } from "@/services/calender/calender-service";
import { CalenderRequest, CalenderDateRequest } from "@/types/calender.types";
import { useCalenderStore } from "@/stores/calender-store";
import { useEffect } from "react";

export const useGetCalender = (params: CalenderRequest) => {
  const { setCalenderData } = useCalenderStore();

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["calender"],
    queryFn: () => calenderService.getCalender(params),
    enabled: !!params,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setCalenderData(data); // Zustandストア更新
      console.log("カレンダーデータの取得に成功しました");
    };
  });

  useEffect(() => {
    if (isError && error) {
      console.error("カレンダーデータの取得に失敗しました :", error.message);
    };
  });
};

export const useGetCalenderDate = (params: CalenderDateRequest) => {
  const { setSelectedDate } = useCalenderStore();

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["calenderDate"],
    queryFn: () => calenderService.getCalenderDate(params),
    enabled: !!params,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setSelectedDate(data); // Zustandストア更新
      console.log("日付ごとのカレンダーデータ取得に成功しました");
    };
  });

  useEffect(() => {
    if (isError && error) {
      console.error("日付ごとのカレンダーデータ取得に失敗しました :", error.message);
    };
  });
};