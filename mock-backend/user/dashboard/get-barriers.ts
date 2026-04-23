import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";
import type { SkinCareBarrierItem } from "@/mock-backend/skin-care/get-barriers";

import { getDashboardItems } from "./item-store";

export type UserBarrierFallbackMode = "data" | "empty";

export type UserSkinCareBarrierItem = SkinCareBarrierItem;

export type GetUserBarriersResponse = {
  data: UserSkinCareBarrierItem[];
  meta: {
    mode: UserBarrierFallbackMode;
  };
};

export type GetUserBarriersControlInput = MockControlInput & {
  mode?: UserBarrierFallbackMode;
};

export async function getUserBarriers(
  control: GetUserBarriersControlInput = {},
): Promise<GetUserBarriersResponse> {
  await simulateMockRequest(control);

  const mode = control.mode === "empty" ? "empty" : "data";

  return {
    meta: {
      mode,
    },
    // Read from the mutable dashboard store so mock edits remain visible after refetch.
    data: mode === "empty" ? [] : (getDashboardItems("barriers") as SkinCareBarrierItem[]),
  };
}

export default getUserBarriers;
