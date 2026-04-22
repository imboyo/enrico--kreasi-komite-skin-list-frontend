import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type BarrierFallbackMode = "data" | "empty";

export type SkinCareBarrierItem = {
  id: string;
  label: string;
  isChecked: boolean;
};

export type GetBarriersResponse = {
  data: SkinCareBarrierItem[];
  meta: {
    mode: BarrierFallbackMode;
  };
};

export type GetBarriersControlInput = MockControlInput & {
  mode?: BarrierFallbackMode;
};

const BARRIERS: SkinCareBarrierItem[] = [
  { id: "hydrated", label: "Hydrated", isChecked: true },
  { id: "dry", label: "Dry", isChecked: false },
  { id: "itchy", label: "Itchy", isChecked: false },
  { id: "redness", label: "Redness", isChecked: false },
  { id: "peeling", label: "Peeling", isChecked: false },
  { id: "tightness", label: "Tightness", isChecked: false },
  { id: "sensitive", label: "Sensitive", isChecked: false },
];

export async function getBarriers(
  control: GetBarriersControlInput = {},
): Promise<GetBarriersResponse> {
  await simulateMockRequest(control);

  const mode = control.mode === "empty" ? "empty" : "data";

  return {
    // Keep the response mode explicit so the UI can intentionally render
    // empty-state fallbacks without relying on ad hoc array checks alone.
    meta: {
      mode,
    },
    // Return a fresh copy so each caller can safely mutate its local result.
    data: mode === "empty" ? [] : BARRIERS.map((barrier) => ({ ...barrier })),
  };
}

export default getBarriers;
