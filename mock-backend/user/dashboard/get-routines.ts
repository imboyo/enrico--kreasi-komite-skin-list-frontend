import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";
import {
  ROUTINES,
  type SkinCareRoutineItem,
} from "@/mock-backend/skin-care/get-routines";

export type UserRoutineFallbackMode = "data" | "empty";

export type UserSkinCareRoutineItem = SkinCareRoutineItem;

export type GetUserRoutinesResponse = {
  data: UserSkinCareRoutineItem[];
  meta: {
    mode: UserRoutineFallbackMode;
  };
};

export type GetUserRoutinesControlInput = MockControlInput & {
  mode?: UserRoutineFallbackMode;
};

export async function getUserRoutines(
  control: GetUserRoutinesControlInput = {},
): Promise<GetUserRoutinesResponse> {
  await simulateMockRequest(control);

  const mode = control.mode === "empty" ? "empty" : "data";

  return {
    meta: {
      mode,
    },
    // Reuse the shared skincare catalog so dashboard and public checklist
    // screens stay in sync when the mock content changes.
    data: mode === "empty" ? [] : ROUTINES.map((item) => ({ ...item })),
  };
}

export default getUserRoutines;
