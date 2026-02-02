import { publicClient } from "@/lib/axios";
import { RoomRequest } from "@/types/homework.types";
import type { ApiResponse } from "@/types/api.types";

export const HomeworkService = {
  setupRoom: async (params?: RoomRequest) => {
    const { data } = await publicClient.patch<ApiResponse>("/room",
      params,
    );
    return data;
  },
}