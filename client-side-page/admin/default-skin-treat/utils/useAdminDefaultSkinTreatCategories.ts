"use client";

import { useQuery } from "@tanstack/react-query";

import {
  listDefaultSkinTreat,
  type DefaultSkinTreat,
} from "backend-service/default-skin-treat";

import {
  getAdminDefaultSkinTreatCategoryConfig,
  getAdminDefaultSkinTreatCategoryQueryKey,
  type AdminDefaultSkinTreatCategoryConfig,
  type AdminDefaultSkinTreatCategoryId,
} from "./defaultSkinTreatCategory";

const CACHE_TIME_MS = 5 * 60 * 1000;

export function useAdminDefaultSkinTreatCategories(
  activeCategory: AdminDefaultSkinTreatCategoryId,
) {
  const adminDefaultSkinTreatCategoriesQuery = useQuery({
    queryKey: getAdminDefaultSkinTreatCategoryQueryKey(activeCategory),
    queryFn: async () => {
      // Query only the active backend category so the page shape stays aligned
      // with the real API contract instead of a stitched mock collection.
      return await listDefaultSkinTreat({
        page: 1,
        limit: 100,
        sort: [{ field: "updated_at", direction: "DESC" }],
        filter: {
          and: [
            {
              field: "category",
              operator: "eq",
              value: activeCategory,
            },
          ],
        },
      });
    },
    staleTime: CACHE_TIME_MS,
    gcTime: CACHE_TIME_MS,
  });

  return {
    activeCategoryConfig:
      getAdminDefaultSkinTreatCategoryConfig(activeCategory),
    activeItems: adminDefaultSkinTreatCategoriesQuery.data?.data ?? [],
    adminDefaultSkinTreatCategoriesQuery,
  } satisfies {
    activeCategoryConfig: AdminDefaultSkinTreatCategoryConfig;
    activeItems: DefaultSkinTreat[];
    adminDefaultSkinTreatCategoriesQuery: typeof adminDefaultSkinTreatCategoriesQuery;
  };
}
