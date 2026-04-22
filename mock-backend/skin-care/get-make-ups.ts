import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type MakeUpFallbackMode = "data" | "empty";

export type SkinCareMakeUpItem = {
  id: string;
  label: string;
  isChecked: boolean;
};

export type GetMakeUpsResponse = {
  data: SkinCareMakeUpItem[];
  meta: {
    mode: MakeUpFallbackMode;
  };
};

export type GetMakeUpsControlInput = MockControlInput & {
  mode?: MakeUpFallbackMode;
};

const MAKE_UPS: SkinCareMakeUpItem[] = [
  { id: "foundation", label: "Foundation", isChecked: true },
  { id: "concealer", label: "Concealer", isChecked: false },
  { id: "powder", label: "Powder", isChecked: false },
  { id: "blush", label: "Blush", isChecked: false },
  { id: "eyebrow-pencil", label: "Eyebrow Pencil", isChecked: false },
  { id: "mascara", label: "Mascara", isChecked: false },
  { id: "lipstick", label: "Lipstick", isChecked: false },
];

export async function getMakeUps(
  control: GetMakeUpsControlInput = {},
): Promise<GetMakeUpsResponse> {
  await simulateMockRequest(control);

  const mode = control.mode === "empty" ? "empty" : "data";

  return {
    // Keep the response mode explicit so the UI can intentionally render
    // empty-state fallbacks without relying on ad hoc array checks alone.
    meta: {
      mode,
    },
    // Return a fresh copy so each caller can safely mutate its local result.
    data: mode === "empty" ? [] : MAKE_UPS.map((makeUp) => ({ ...makeUp })),
  };
}

export default getMakeUps;
