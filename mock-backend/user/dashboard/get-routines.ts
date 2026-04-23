import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";
import type { SkinCareRoutineItem } from "@/mock-backend/skin-care/get-routines";

import { getDashboardItems } from "./item-store";

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
    // Read from the mutable dashboard store so mock edits remain visible after refetch.
    data: mode === "empty" ? [] : (getDashboardItems("routines") as SkinCareRoutineItem[]),
  };
}

export default getUserRoutines;
