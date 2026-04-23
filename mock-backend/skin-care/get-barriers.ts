import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

export type BarrierFallbackMode = "data" | "empty";

export type SkinCareBarrierItem = {
  id: string;
  label: string;
  description: string;
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

export const BARRIERS: SkinCareBarrierItem[] = [
  {
    id: "hydrated",
    label: "Hydrated",
    description:
      "Your skin feels comfortably balanced, with enough water retention to stay smooth and flexible.",
    isChecked: true,
  },
  {
    id: "dry",
    label: "Dry",
    description:
      "A barrier state where the skin feels rough, thirsty, or flaky because it is losing moisture too quickly.",
    isChecked: false,
  },
  {
    id: "itchy",
    label: "Itchy",
    description:
      "A common irritation sign that can point to barrier stress, dehydration, or product sensitivity.",
    isChecked: false,
  },
  {
    id: "redness",
    label: "Redness",
    description:
      "Visible flushing or inflammation that may mean the skin barrier is overstimulated or easily reactive.",
    isChecked: false,
  },
  {
    id: "peeling",
    label: "Peeling",
    description:
      "Surface shedding that often appears when the barrier is irritated, over-exfoliated, or very dehydrated.",
    isChecked: false,
  },
  {
    id: "tightness",
    label: "Tightness",
    description:
      "That stretched feeling after cleansing often signals moisture loss and a need for barrier support.",
    isChecked: false,
  },
  {
    id: "sensitive",
    label: "Sensitive",
    description:
      "Skin that reacts quickly to products, weather, or friction and usually needs gentler formulations.",
    isChecked: false,
  },
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
