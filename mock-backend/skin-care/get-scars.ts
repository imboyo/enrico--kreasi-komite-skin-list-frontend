import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type ScarFallbackMode = "data" | "empty";

export type SkinCareScarItem = {
  id: string;
  label: string;
  description: string;
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

export const SCARS: SkinCareScarItem[] = [
  {
    id: "acne-scar",
    label: "Acne Scar",
    description:
      "Textural marks left after inflamed breakouts heal and collagen support in the area changes.",
    isChecked: true,
  },
  {
    id: "blackhead-mark",
    label: "Blackhead Mark",
    description:
      "Post-congestion marks that can stay visible after blackheads clear, especially on oil-prone skin.",
    isChecked: false,
  },
  {
    id: "dark-spot",
    label: "Dark Spot",
    description:
      "Flat areas of extra pigmentation that remain after acne, irritation, or sun exposure.",
    isChecked: false,
  },
  {
    id: "hyperpigmentation",
    label: "Hyperpigmentation",
    description:
      "Uneven darkening caused by excess melanin production after inflammation, friction, or UV exposure.",
    isChecked: false,
  },
  {
    id: "ice-pick-scar",
    label: "Ice Pick Scar",
    description:
      "A narrow, deep type of acne scar that creates small puncture-like indentations in the skin.",
    isChecked: false,
  },
  {
    id: "rolling-scar",
    label: "Rolling Scar",
    description:
      "A wavy depressed scar pattern that gives the skin surface an uneven, undulating texture.",
    isChecked: false,
  },
  {
    id: "boxcar-scar",
    label: "Boxcar Scar",
    description:
      "A wider indented scar with more defined edges that can make texture irregular in certain lighting.",
    isChecked: false,
  },
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
