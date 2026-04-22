import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type UserColorFallbackMode = "data" | "empty";

export type UserSkinCareColorItem = {
  id: string;
  label: string;
  isChecked: boolean;
};

export type GetUserColorsResponse = {
  data: UserSkinCareColorItem[];
  meta: {
    mode: UserColorFallbackMode;
  };
};

export type GetUserColorsControlInput = MockControlInput & {
  mode?: UserColorFallbackMode;
};

const USER_COLORS: UserSkinCareColorItem[] = [
  { id: "fair", label: "Fair", isChecked: true },
  { id: "light", label: "Light", isChecked: false },
  { id: "medium", label: "Medium", isChecked: false },
  { id: "olive", label: "Olive", isChecked: false },
  { id: "tan", label: "Tan", isChecked: false },
  { id: "brown", label: "Brown", isChecked: false },
  { id: "deep", label: "Deep", isChecked: false },
];

export async function getUserColors(
  control: GetUserColorsControlInput = {},
): Promise<GetUserColorsResponse> {
  await simulateMockRequest(control);

  const mode = control.mode === "empty" ? "empty" : "data";

  return {
    meta: {
      mode,
    },
    data: mode === "empty" ? [] : USER_COLORS.map((item) => ({ ...item })),
  };
}

export default getUserColors;
