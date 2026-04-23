import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";
import type { SkinCareScarItem } from "@/mock-backend/skin-care/get-scars";

import { getDashboardItems } from "./item-store";

export type UserScarFallbackMode = "data" | "empty";

export type UserSkinCareScarItem = SkinCareScarItem;

export type GetUserScarsResponse = {
  data: UserSkinCareScarItem[];
  meta: {
    mode: UserScarFallbackMode;
  };
};

export type GetUserScarsControlInput = MockControlInput & {
  mode?: UserScarFallbackMode;
};

export async function getUserScars(
  control: GetUserScarsControlInput = {},
): Promise<GetUserScarsResponse> {
  await simulateMockRequest(control);

  const mode = control.mode === "empty" ? "empty" : "data";

  return {
    meta: {
      mode,
    },
    // Read from the mutable dashboard store so mock edits remain visible after refetch.
    data: mode === "empty" ? [] : (getDashboardItems("scars") as SkinCareScarItem[]),
  };
}

export default getUserScars;
