import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type UserBarrierFallbackMode = "data" | "empty";

export type UserSkinCareBarrierItem = {
  id: string;
  label: string;
  isChecked: boolean;
};

export type GetUserBarriersResponse = {
  data: UserSkinCareBarrierItem[];
  meta: {
    mode: UserBarrierFallbackMode;
  };
};

export type GetUserBarriersControlInput = MockControlInput & {
  mode?: UserBarrierFallbackMode;
};

const USER_BARRIERS: UserSkinCareBarrierItem[] = [
  { id: "hydrated", label: "Hydrated", isChecked: true },
  { id: "dry", label: "Dry", isChecked: false },
  { id: "itchy", label: "Itchy", isChecked: false },
  { id: "redness", label: "Redness", isChecked: false },
  { id: "peeling", label: "Peeling", isChecked: false },
  { id: "tightness", label: "Tightness", isChecked: false },
  { id: "sensitive", label: "Sensitive", isChecked: false },
];

export async function getUserBarriers(
  control: GetUserBarriersControlInput = {},
): Promise<GetUserBarriersResponse> {
  await simulateMockRequest(control);

  const mode = control.mode === "empty" ? "empty" : "data";

  return {
    meta: {
      mode,
    },
    data: mode === "empty" ? [] : USER_BARRIERS.map((item) => ({ ...item })),
  };
}

export default getUserBarriers;
