import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type UserRoutineFallbackMode = "data" | "empty";

export type UserSkinCareRoutineItem = {
  id: string;
  label: string;
  isChecked: boolean;
};

export type GetUserRoutinesResponse = {
  data: UserSkinCareRoutineItem[];
  meta: {
    mode: UserRoutineFallbackMode;
  };
};

export type GetUserRoutinesControlInput = MockControlInput & {
  mode?: UserRoutineFallbackMode;
};

const USER_ROUTINES: UserSkinCareRoutineItem[] = [
  { id: "facial-wash", label: "Facial Wash", isChecked: true },
  { id: "moisturizer", label: "Moisturizer", isChecked: false },
  { id: "toner", label: "Toner", isChecked: false },
  { id: "serum", label: "Serum", isChecked: false },
  { id: "eye-cream", label: "Eye Cream", isChecked: false },
  { id: "night-cream", label: "Night Cream", isChecked: false },
  { id: "lip-care", label: "Lip Care", isChecked: false },
];

export async function getUserRoutines(
  control: GetUserRoutinesControlInput = {},
): Promise<GetUserRoutinesResponse> {
  await simulateMockRequest(control);

  const mode = control.mode === "empty" ? "empty" : "data";

  return {
    meta: {
      mode,
    },
    data: mode === "empty" ? [] : USER_ROUTINES.map((item) => ({ ...item })),
  };
}

export default getUserRoutines;
