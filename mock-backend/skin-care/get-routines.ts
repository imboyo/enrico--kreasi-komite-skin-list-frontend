import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type RoutineFallbackMode = "data" | "empty";

export type SkinCareRoutineItem = {
  id: string;
  label: string;
  description: string;
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

export const ROUTINES: SkinCareRoutineItem[] = [
  {
    id: "facial-wash",
    label: "Facial Wash",
    description:
      "A gentle first cleanse to remove sweat, sunscreen, and surface impurities without stripping moisture.",
    isChecked: true,
  },
  {
    id: "moisturizer",
    label: "Moisturizer",
    description:
      "Locks hydration into the skin barrier so your face stays balanced, soft, and less reactive through the day.",
    isChecked: false,
  },
  {
    id: "toner",
    label: "Toner",
    description:
      "Helps refresh the skin after cleansing and prepares it for the next treatment layers in your routine.",
    isChecked: false,
  },
  {
    id: "serum",
    label: "Serum",
    description:
      "A concentrated treatment step that targets concerns like dullness, dehydration, or uneven texture.",
    isChecked: false,
  },
  {
    id: "eye-cream",
    label: "Eye Cream",
    description:
      "Supports the delicate under-eye area with extra hydration and helps reduce the look of fatigue.",
    isChecked: false,
  },
  {
    id: "night-cream",
    label: "Night Cream",
    description:
      "An overnight finishing step that helps replenish moisture and support skin recovery while you sleep.",
    isChecked: false,
  },
  {
    id: "lip-care",
    label: "Lip Care",
    description:
      "Keeps lips protected from dryness and flaking with a nourishing layer that seals in comfort.",
    isChecked: false,
  },
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
