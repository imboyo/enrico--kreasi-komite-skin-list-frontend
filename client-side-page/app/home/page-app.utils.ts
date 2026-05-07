import {
  listSkinTreat,
  type ListSkinTreatResponse,
  type SkinTreat,
} from "@/backend-service/user/skin-treat";
import type { DashboardEditableItem } from "@/mock-backend/user/dashboard/item-store";

import {
  SKIN_TREAT_CATEGORY_BY_TAB,
  SKIN_TREAT_PAGE_LIMIT,
  type TabId,
} from "./page-app.constants";

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

export function selectSkinTreatByTab(tabId: TabId) {
  return (response: ListSkinTreatResponse) => {
    const category = SKIN_TREAT_CATEGORY_BY_TAB[tabId];
    const data = response.data
      .filter((treat) => treat.category === category)
      .map(mapSkinTreatToDashboardItem);

    return {
      data,
      meta: {
        mode: data.length > 0 ? "data" : "empty",
      },
    };
  };
}

export async function getUserSkinTreats(): Promise<ListSkinTreatResponse> {
  const firstPage = await listSkinTreat({
    page: 1,
    limit: SKIN_TREAT_PAGE_LIMIT,
    sort: [{ field: "created_at", direction: "ASC" }],
  });

  if (firstPage.meta.total_pages <= 1) {
    return firstPage;
  }

  // The list endpoint is paginated, so merge the remaining pages before
  // deriving per-tab data from the shared cached query.
  const remainingPages = await Promise.all(
    Array.from({ length: firstPage.meta.total_pages - 1 }, (_, index) =>
      listSkinTreat({
        page: index + 2,
        limit: SKIN_TREAT_PAGE_LIMIT,
        sort: [{ field: "created_at", direction: "ASC" }],
      }),
    ),
  );

  return {
    ...firstPage,
    data: [
      ...firstPage.data,
      ...remainingPages.flatMap((page) => page.data),
    ],
  };
}
