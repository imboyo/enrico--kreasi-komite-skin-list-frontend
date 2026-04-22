import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type RoutineFallbackMode = "data" | "empty";

export type SkinCareRoutineItem = {
  id: string;
  label: string;
  isChecked: boolean;
};

export type GetRoutinesResponse = {
  data: SkinCareRoutineItem[];
  meta: {
    mode: RoutineFallbackMode;
  };
};

export type GetRoutinesControlInput = MockControlInput & {
  mode?: RoutineFallbackMode;
};

const ROUTINES: SkinCareRoutineItem[] = [
  { id: "facial-wash", label: "Facial Wash", isChecked: true },
  { id: "moisturizer", label: "Moisturizer", isChecked: false },
  { id: "toner", label: "Toner", isChecked: false },
  { id: "serum", label: "Serum", isChecked: false },
  { id: "eye-cream", label: "Eye Cream", isChecked: false },
  { id: "night-cream", label: "Night Cream", isChecked: false },
  { id: "lip-care", label: "Lip Care", isChecked: false },
];

export async function getRoutines(
  control: GetRoutinesControlInput = {},
): Promise<GetRoutinesResponse> {
  await simulateMockRequest(control);

  const mode = control.mode === "empty" ? "empty" : "data";

  return {
    // Keep the response mode explicit so the UI can intentionally render
    // empty-state fallbacks without relying on ad hoc array checks alone.
    meta: {
      mode,
    },
    // Return a fresh copy so each caller can safely mutate its local result.
    data: mode === "empty" ? [] : ROUTINES.map((routine) => ({ ...routine })),
  };
}

export default getRoutines;
