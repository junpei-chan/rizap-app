import { authClient } from "@/lib/axios";
import { CalenderRequest, CalenderResponse, CalenderDateRequest, CalenderDateResponse } from "@/types/calender.types";

export const calenderService = {
  getCalender: async (params: CalenderRequest) => {
    const { data } = await authClient.get<CalenderResponse>("/calendar", {
      params,
    });
    return data;
  },
  getCalenderDate: async (params: CalenderDateRequest) => {
    const { data } = await authClient.get<CalenderDateResponse>("/calendar/date", {
      params,
    });
    return data;
  },
};