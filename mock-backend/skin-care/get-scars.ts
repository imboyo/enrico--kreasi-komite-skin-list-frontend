import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type ScarFallbackMode = "data" | "empty";

export type SkinCareScarItem = {
  id: string;
  label: string;
  isChecked: boolean;
};

export type GetScarsResponse = {
  data: SkinCareScarItem[];
  meta: {
    mode: ScarFallbackMode;
  };
};

export type GetScarsControlInput = MockControlInput & {
  mode?: ScarFallbackMode;
};

const SCARS: SkinCareScarItem[] = [
  { id: "acne-scar", label: "Acne Scar", isChecked: true },
  { id: "blackhead-mark", label: "Blackhead Mark", isChecked: false },
  { id: "dark-spot", label: "Dark Spot", isChecked: false },
  { id: "hyperpigmentation", label: "Hyperpigmentation", isChecked: false },
  { id: "ice-pick-scar", label: "Ice Pick Scar", isChecked: false },
  { id: "rolling-scar", label: "Rolling Scar", isChecked: false },
  { id: "boxcar-scar", label: "Boxcar Scar", isChecked: false },
];

export async function getScars(
  control: GetScarsControlInput = {},
): Promise<GetScarsResponse> {
  await simulateMockRequest(control);

  const mode = control.mode === "empty" ? "empty" : "data";

  return {
    // Keep the response mode explicit so the UI can intentionally render
    // empty-state fallbacks without relying on ad hoc array checks alone.
    meta: {
      mode,
    },
    // Return a fresh copy so each caller can safely mutate its local result.
    data: mode === "empty" ? [] : SCARS.map((scar) => ({ ...scar })),
  };
}

export default getScars;
