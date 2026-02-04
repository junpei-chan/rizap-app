import { publicClient, authClient } from "@/lib/axios";
import { RoomRequest, HomeworkRequest, HomeworkResponse, HomeworkStartRequest } from "@/types/homework.types";
import type { ApiResponse } from "@/types/api.types";

export const HomeworkService = {
  setupRoom: async (params?: RoomRequest) => {
    const { data } = await publicClient.post<ApiResponse>("/room",
      params,
    );
    return data;
  },
  getHomework: async (params?: HomeworkRequest) => {
    const { data } = await authClient.get<HomeworkResponse>("/homework", {
      params,
    });
    return data;
  },
  startHomework: async (homework: HomeworkStartRequest) => {
    const { data } = await authClient.patch<ApiResponse>("/homework/start",
      homework,
    );
    return data;
  },
  endHomework: async (params: HomeworkRequest) => {
    const { data } = await authClient.patch<ApiResponse>("/homework/end",
      params,
    );
    return data;
  },
};