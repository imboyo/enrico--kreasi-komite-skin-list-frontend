import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type ColorFallbackMode = "data" | "empty";

export type SkinCareColorItem = {
  id: string;
  label: string;
  description: string;
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

export const COLORS: SkinCareColorItem[] = [
  {
    id: "fair",
    label: "Fair",
    description:
      "A lighter complexion range that often benefits from softer contrast and careful sun protection support.",
    isChecked: true,
  },
  {
    id: "light",
    label: "Light",
    description:
      "A light tone range that can guide foundation matching and help tailor brightening or redness-care advice.",
    isChecked: false,
  },
  {
    id: "medium",
    label: "Medium",
    description:
      "A balanced skin tone range where undertone matching is especially useful for makeup and skincare recommendations.",
    isChecked: false,
  },
  {
    id: "olive",
    label: "Olive",
    description:
      "A tone with green or golden undertones that usually needs specific shade matching to avoid looking ashy.",
    isChecked: false,
  },
  {
    id: "tan",
    label: "Tan",
    description:
      "A deeper sun-kissed tone range that can benefit from formulas designed to prevent dull or gray finishes.",
    isChecked: false,
  },
  {
    id: "brown",
    label: "Brown",
    description:
      "A rich skin tone range that often needs thoughtful pigmentation and barrier care to maintain even radiance.",
    isChecked: false,
  },
  {
    id: "deep",
    label: "Deep",
    description:
      "A deep complexion range where undertone-aware makeup and hyperpigmentation-focused care are especially helpful.",
    isChecked: false,
  },
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
