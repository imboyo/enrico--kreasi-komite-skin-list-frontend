import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";
import {
  getDashboardItems,
  type DashboardItemCategory,
} from "@/mock-backend/user/dashboard/item-store";

export const SKIN_TOTAL_CARDS = [
  {
    key: "routines",
    label: "Routine",
    icon: "mdi:calendar-check-outline",
    queryKey: ["admin-skin-routines-total"],
    accentClassName: "bg-primary/10 text-primary",
    category: "routines",
  },
  {
    key: "barriers",
    label: "Barrier",
    icon: "mdi:shield-half-full",
    queryKey: ["admin-skin-barriers-total"],
    accentClassName: "bg-emerald-500/10 text-emerald-600",
    category: "barriers",
  },
  {
    key: "colors",
    label: "Colors",
    icon: "mdi:palette-outline",
    queryKey: ["admin-skin-colors-total"],
    accentClassName: "bg-sky-500/10 text-sky-600",
    category: "colors",
  },
  {
    key: "scars",
    label: "Scars",
    icon: "mdi:bandage",
    queryKey: ["admin-skin-scars-total"],
    accentClassName: "bg-rose-500/10 text-rose-600",
    category: "scars",
  },
] as const satisfies readonly {
  key: string;
  label: string;
  icon: string;
  queryKey: readonly string[];
  accentClassName: string;
  category: DashboardItemCategory;
}[];

export type SkinTotalCard = (typeof SKIN_TOTAL_CARDS)[number] & {
  total: number;
};

export type GetAdminSkinTotalsResponse = {
  data: SkinTotalCard[];
};

export async function getAdminSkinTotals(
  control: MockControlInput = {},
): Promise<GetAdminSkinTotalsResponse> {
  await simulateMockRequest(control);

  return {
    // Count from the mutable dashboard store so admin totals stay aligned after mock edits.
    data: SKIN_TOTAL_CARDS.map((card) => ({
      ...card,
      total: getDashboardItems(card.category).length,
    })),
  };
}

export default getAdminSkinTotals;
