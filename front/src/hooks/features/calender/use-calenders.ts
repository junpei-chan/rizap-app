import { useQuery } from "@tanstack/react-query";
import { calenderService } from "@/services/calender/calender-service";
import { CalenderRequest, CalenderDateRequest } from "@/types/calender.types";
import { useEffect } from "react";

export const useGetCalender = (params: CalenderRequest) => {
  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["calender", params],
    queryFn: () => calenderService.getCalender(params),
    enabled: !!params,
  });

  useEffect(() => {
    if (isSuccess && data) {
      console.log("カレンダーデータの取得に成功しました");
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      console.error("カレンダーデータの取得に失敗しました :", error.message);
    }
  }, [isError, error]);

  return { data, isSuccess, isError, error };
};

export const useGetCalenderDate = (params: CalenderDateRequest) => {
  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["calenderDate", params],
    queryFn: () => calenderService.getCalenderDate(params),
    enabled: !!params.date && params.date.length > 0,
  });

  useEffect(() => {
    if (isSuccess && data) {
      console.log("日付ごとのカレンダーデータ取得に成功しました");
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      console.error("日付ごとのカレンダーデータ取得に失敗しました :", error.message);
    }
  }, [isError, error]);

  return { data, isSuccess, isError, error };
};