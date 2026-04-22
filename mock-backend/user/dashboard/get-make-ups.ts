import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type UserMakeUpFallbackMode = "data" | "empty";

export type UserSkinCareMakeUpItem = {
  id: string;
  label: string;
  isChecked: boolean;
};

export type GetUserMakeUpsResponse = {
  data: UserSkinCareMakeUpItem[];
  meta: {
    mode: UserMakeUpFallbackMode;
  };
};

export type GetUserMakeUpsControlInput = MockControlInput & {
  mode?: UserMakeUpFallbackMode;
};

const USER_MAKE_UPS: UserSkinCareMakeUpItem[] = [
  { id: "foundation", label: "Foundation", isChecked: true },
  { id: "concealer", label: "Concealer", isChecked: false },
  { id: "powder", label: "Powder", isChecked: false },
  { id: "blush", label: "Blush", isChecked: false },
  { id: "eyebrow-pencil", label: "Eyebrow Pencil", isChecked: false },
  { id: "mascara", label: "Mascara", isChecked: false },
  { id: "lipstick", label: "Lipstick", isChecked: false },
];

export async function getUserMakeUps(
  control: GetUserMakeUpsControlInput = {},
): Promise<GetUserMakeUpsResponse> {
  await simulateMockRequest(control);

  const mode = control.mode === "empty" ? "empty" : "data";

  return {
    meta: {
      mode,
    },
    data: mode === "empty" ? [] : USER_MAKE_UPS.map((item) => ({ ...item })),
  };
}

export default getUserMakeUps;
