import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type UserScarFallbackMode = "data" | "empty";

export type UserSkinCareScarItem = {
  id: string;
  label: string;
  isChecked: boolean;
};

export type GetUserScarsResponse = {
  data: UserSkinCareScarItem[];
  meta: {
    mode: UserScarFallbackMode;
  };
};

export type GetUserScarsControlInput = MockControlInput & {
  mode?: UserScarFallbackMode;
};

const USER_SCARS: UserSkinCareScarItem[] = [
  { id: "acne-scar", label: "Acne Scar", isChecked: true },
  { id: "blackhead-mark", label: "Blackhead Mark", isChecked: false },
  { id: "dark-spot", label: "Dark Spot", isChecked: false },
  { id: "hyperpigmentation", label: "Hyperpigmentation", isChecked: false },
  { id: "ice-pick-scar", label: "Ice Pick Scar", isChecked: false },
  { id: "rolling-scar", label: "Rolling Scar", isChecked: false },
  { id: "boxcar-scar", label: "Boxcar Scar", isChecked: false },
];

export async function getUserScars(
  control: GetUserScarsControlInput = {},
): Promise<GetUserScarsResponse> {
  await simulateMockRequest(control);

  const mode = control.mode === "empty" ? "empty" : "data";

  return {
    meta: {
      mode,
    },
    data: mode === "empty" ? [] : USER_SCARS.map((item) => ({ ...item })),
  };
}

export default getUserScars;
