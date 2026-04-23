import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";
import {
  BARRIERS,
  type SkinCareBarrierItem,
} from "@/mock-backend/skin-care/get-barriers";

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
    // Reuse the shared skincare catalog so dashboard and public checklist
    // screens stay in sync when the mock content changes.
    data: mode === "empty" ? [] : BARRIERS.map((item) => ({ ...item })),
  };
}

export default getUserBarriers;
