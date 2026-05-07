import {
  listSkinTreat,
  type ListSkinTreatResponse,
  type SkinTreat,
} from "@/backend-service/user/skin-treat";
import type { DashboardEditableItem } from "@/mock-backend/user/dashboard/item-store";

import {
  SKIN_TREAT_CATEGORY_BY_TAB,
  UI_PAGE_SIZE,
  type TabId,
} from "./page-app.constants";

export type GetUserSkinTreatsParams = {
  tabId: TabId;
  search: string;
  page: number;
};

function buildCategoryFilter(tabId: TabId) {
  const category = SKIN_TREAT_CATEGORY_BY_TAB[tabId];

  return {
    and: [{ field: "category", operator: "eq" as const, value: category }],
  };
}

export function mapSkinTreatToDashboardItem(
  treat: SkinTreat,
): DashboardEditableItem {
  return {
    id: treat.uuid,
    label: treat.name,
    description: treat.description ?? "",
    isChecked: false,
  };
}

export function selectSkinTreatPage() {
  return (response: ListSkinTreatResponse) => {
    const data = response.data.map(mapSkinTreatToDashboardItem);

    return {
      data,
      meta: {
        mode: data.length > 0 ? "data" : "empty",
      },
    };
  };
}

export async function getUserSkinTreats({
  tabId,
  search,
  page,
}: GetUserSkinTreatsParams): Promise<ListSkinTreatResponse> {
  const normalizedSearch = search.trim();

  return listSkinTreat({
    page,
    limit: UI_PAGE_SIZE,
    search: normalizedSearch.length > 0 ? normalizedSearch : undefined,
    filter: buildCategoryFilter(tabId),
    sort: [{ field: "created_at", direction: "ASC" }],
  });
}
