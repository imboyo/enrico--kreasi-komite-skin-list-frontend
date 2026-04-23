import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";
import type { SkinCareMakeUpItem } from "@/mock-backend/skin-care/get-make-ups";

import { getDashboardItems } from "./item-store";

export type UserMakeUpFallbackMode = "data" | "empty";

export type UserSkinCareMakeUpItem = SkinCareMakeUpItem;

export type GetUserMakeUpsResponse = {
  data: UserSkinCareMakeUpItem[];
  meta: {
    mode: UserMakeUpFallbackMode;
  };
};

export type GetUserMakeUpsControlInput = MockControlInput & {
  mode?: UserMakeUpFallbackMode;
};

export async function getUserMakeUps(
  control: GetUserMakeUpsControlInput = {},
): Promise<GetUserMakeUpsResponse> {
  await simulateMockRequest(control);

  const mode = control.mode === "empty" ? "empty" : "data";

  return {
    meta: {
      mode,
    },
    // Read from the mutable dashboard store so mock edits remain visible after refetch.
    data: mode === "empty" ? [] : (getDashboardItems("make-ups") as SkinCareMakeUpItem[]),
  };
}

export default getUserMakeUps;
