import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";
import {
  MAKE_UPS,
  type SkinCareMakeUpItem,
} from "@/mock-backend/skin-care/get-make-ups";

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
    // Reuse the shared skincare catalog so dashboard and public checklist
    // screens stay in sync when the mock content changes.
    data: mode === "empty" ? [] : MAKE_UPS.map((item) => ({ ...item })),
  };
}

export default getUserMakeUps;
