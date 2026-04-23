import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";
import {
  COLORS,
  type SkinCareColorItem,
} from "@/mock-backend/skin-care/get-colors";

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
    // Reuse the shared skincare catalog so dashboard and public checklist
    // screens stay in sync when the mock content changes.
    data: mode === "empty" ? [] : COLORS.map((item) => ({ ...item })),
  };
}

export default getUserColors;
