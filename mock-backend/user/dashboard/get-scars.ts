import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";
import {
  SCARS,
  type SkinCareScarItem,
} from "@/mock-backend/skin-care/get-scars";

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
    // Reuse the shared skincare catalog so dashboard and public checklist
    // screens stay in sync when the mock content changes.
    data: mode === "empty" ? [] : SCARS.map((item) => ({ ...item })),
  };
}

export default getUserScars;
