import { publicClient, authClient } from "@/lib/axios";
import { RoomRequest, HomeworkRequest, HomeworkResponse } from "@/types/homework.types";
import type { ApiResponse } from "@/types/api.types";

export const HomeworkService = {
  setupRoom: async (params?: RoomRequest) => {
    const { data } = await publicClient.patch<ApiResponse>("/room",
      params,
    );
    return data;
  },
  getHomework: async (params?: HomeworkRequest) => {
    const { data } = await authClient.get<HomeworkResponse>("/homework", {
      params
    });
    return data;
  },
}