"use client";

import { useQuery } from "@tanstack/react-query";

import {
  listDefaultSkinCare,
  type AdminDefaultSkinCare,
} from "backend-service/admin/default-skin-care";

import {
  getAdminSkinCategoryConfig,
  getAdminSkinCategoryQueryKey,
  type AdminSkinCategoryConfig,
  type AdminSkinCategoryId,
} from "./skinCategory";

const CACHE_TIME_MS = 5 * 60 * 1000;

export function useAdminSkinCategories(activeCategory: AdminSkinCategoryId) {
  const adminSkinCategoriesQuery = useQuery({
    queryKey: getAdminSkinCategoryQueryKey(activeCategory),
    queryFn: async () => {
      // Query only the active backend category so the page shape stays aligned
      // with the real API contract instead of a stitched mock collection.
      return await listDefaultSkinCare({
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
    activeCategoryConfig: getAdminSkinCategoryConfig(activeCategory),
    activeItems: adminSkinCategoriesQuery.data?.data ?? [],
    adminSkinCategoriesQuery,
  } satisfies {
    activeCategoryConfig: AdminSkinCategoryConfig;
    activeItems: AdminDefaultSkinCare[];
    adminSkinCategoriesQuery: typeof adminSkinCategoriesQuery;
  };
}
