import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type ColorFallbackMode = "data" | "empty";

export type SkinCareColorItem = {
  id: string;
  label: string;
  isChecked: boolean;
};

export type GetColorsResponse = {
  data: SkinCareColorItem[];
  meta: {
    mode: ColorFallbackMode;
  };
};

export type GetColorsControlInput = MockControlInput & {
  mode?: ColorFallbackMode;
};

const COLORS: SkinCareColorItem[] = [
  { id: "fair", label: "Fair", isChecked: true },
  { id: "light", label: "Light", isChecked: false },
  { id: "medium", label: "Medium", isChecked: false },
  { id: "olive", label: "Olive", isChecked: false },
  { id: "tan", label: "Tan", isChecked: false },
  { id: "brown", label: "Brown", isChecked: false },
  { id: "deep", label: "Deep", isChecked: false },
];

export async function getColors(
  control: GetColorsControlInput = {},
): Promise<GetColorsResponse> {
  await simulateMockRequest(control);

  const mode = control.mode === "empty" ? "empty" : "data";

  return {
    // Keep the response mode explicit so the UI can intentionally render
    // empty-state fallbacks without relying on ad hoc array checks alone.
    meta: {
      mode,
    },
    // Return a fresh copy so each caller can safely mutate its local result.
    data: mode === "empty" ? [] : COLORS.map((color) => ({ ...color })),
  };
}

export default getColors;
