import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";
import type { SkinCareColorItem } from "@/mock-backend/skin-care/get-colors";

import { getDashboardItems } from "./item-store";

export type UserColorFallbackMode = "data" | "empty";

export type UserSkinCareColorItem = SkinCareColorItem;

export type GetUserColorsResponse = {
  data: UserSkinCareColorItem[];
  meta: {
    mode: UserColorFallbackMode;
  };
};

export type GetUserColorsControlInput = MockControlInput & {
  mode?: UserColorFallbackMode;
};

export async function getUserColors(
  control: GetUserColorsControlInput = {},
): Promise<GetUserColorsResponse> {
  await simulateMockRequest(control);

  const mode = control.mode === "empty" ? "empty" : "data";

  return {
    meta: {
      mode,
    },
    // Read from the mutable dashboard store so mock edits remain visible after refetch.
    data: mode === "empty" ? [] : (getDashboardItems("colors") as SkinCareColorItem[]),
  };
}

export default getUserColors;
