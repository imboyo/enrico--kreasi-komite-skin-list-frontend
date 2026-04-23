import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type MakeUpFallbackMode = "data" | "empty";

export type SkinCareMakeUpItem = {
  id: string;
  label: string;
  description: string;
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

export const MAKE_UPS: SkinCareMakeUpItem[] = [
  {
    id: "foundation",
    label: "Foundation",
    description:
      "An even-base product that helps smooth tone differences and sets the overall complexion finish.",
    isChecked: true,
  },
  {
    id: "concealer",
    label: "Concealer",
    description:
      "Adds targeted coverage for under-eyes, blemishes, or discoloration without changing the full-face finish.",
    isChecked: false,
  },
  {
    id: "powder",
    label: "Powder",
    description:
      "Helps reduce excess shine and can lock cream products in place for longer wear during the day.",
    isChecked: false,
  },
  {
    id: "blush",
    label: "Blush",
    description:
      "Brings warmth and life back to the face by adding color to the cheeks after base makeup.",
    isChecked: false,
  },
  {
    id: "eyebrow-pencil",
    label: "Eyebrow Pencil",
    description:
      "Defines and fills brow shape with controlled strokes for a more polished face frame.",
    isChecked: false,
  },
  {
    id: "mascara",
    label: "Mascara",
    description:
      "Adds lift, length, and depth to the lashes to make the eyes look more defined.",
    isChecked: false,
  },
  {
    id: "lipstick",
    label: "Lipstick",
    description:
      "Finishes the look with lip color while also helping shape how bold or soft the final makeup reads.",
    isChecked: false,
  },
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
