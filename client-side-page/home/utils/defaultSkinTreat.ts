import {
  listDefaultSkinTreat,
  type DefaultSkinTreat,
  type DefaultSkinTreatCategory,
  type ListDefaultSkinTreatPayload,
} from "backend-service/default-skin-treat";

const HOME_DEFAULT_SKIN_TREAT_LIMIT = 100;

export const HOME_DEFAULT_SKIN_TREAT_QUERY_KEY = [
  "home-default-skin-treat",
] as const;

export type HomeDefaultSkinTreatItem = {
  id: string;
  label: string;
  isChecked: boolean;
};

export type HomeDefaultSkinTreatListResponse = {
  data: HomeDefaultSkinTreatItem[];
  meta: {
    mode: "data" | "empty";
    total: number;
    page: number;
    totalPages: number;
  };
};

function buildHomeDefaultSkinTreatPayload(
  category: DefaultSkinTreatCategory,
): ListDefaultSkinTreatPayload {
  return {
    page: 1,
    limit: HOME_DEFAULT_SKIN_TREAT_LIMIT,
    sort: [{ field: "updated_at", direction: "DESC" }],
    // Keep the category filtering on the backend so each checklist section
    // reflects the real API contract instead of a client-side slice.
    filter: {
      and: [{ field: "category", operator: "eq", value: category }],
    },
  };
}

function mapDefaultSkinTreatToHomeChecklistItem(
  defaultSkinTreat: DefaultSkinTreat,
): HomeDefaultSkinTreatItem {
  return {
    id: defaultSkinTreat.uuid,
    label: defaultSkinTreat.name,
    // The public default skin treat API does not expose a checked state, so
    // home checklists always start unchecked and preserve local user toggles.
    isChecked: false,
  };
}

export function getHomeDefaultSkinTreatQueryKey(
  category: DefaultSkinTreatCategory,
) {
  return [...HOME_DEFAULT_SKIN_TREAT_QUERY_KEY, category] as const;
}

export async function listHomeDefaultSkinTreat(
  category: DefaultSkinTreatCategory,
): Promise<HomeDefaultSkinTreatListResponse> {
  const response = await listDefaultSkinTreat(
    buildHomeDefaultSkinTreatPayload(category),
  );
  const data = response.data.map(mapDefaultSkinTreatToHomeChecklistItem);

  return {
    data,
    meta: {
      mode: data.length > 0 ? "data" : "empty",
      total: response.meta.total,
      page: response.meta.page,
      totalPages: response.meta.total_pages,
    },
  };
}
