import { authClient } from "@/lib/axios";
import type { RoomRequest, HouseworkRequest, HouseworkResponse, HouseworkStartRequest } from "@/types/housework-base.types";
import type { ApiResponse } from "@/types/api.types";

export const HouseworkService = {
  setupRoom: async (params?: RoomRequest | RoomRequest[]) => {
    const raw = Array.isArray(params) ? params : params ? [params] : [];
    const payload = raw.map((p) => ({
      housework_id: p.houseworkId,
      done_at: p.doneAt,
    }));
    const { data } = await authClient.post<ApiResponse>("/room", payload);
    return data;
  },
  getHousework: async (params?: HouseworkRequest) => {
    const { data } = await authClient.get<HouseworkResponse>("/housework", {
      params,
    });
    return data;
  },
  startHousework: async (housework: HouseworkStartRequest) => {
    const { data } = await authClient.patch<ApiResponse>("/housework/start",
      housework,
    );
    return data;
  },
  endHousework: async (params: HouseworkRequest) => {
    const { data } = await authClient.patch<ApiResponse>("/housework/end",
      params,
    );
    return data;
  },
};
