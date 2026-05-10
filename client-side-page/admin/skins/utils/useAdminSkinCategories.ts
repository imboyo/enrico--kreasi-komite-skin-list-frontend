"use client";

import { useQuery } from "@tanstack/react-query";

import type { SkinCareCardItem } from "@/components/atomic/organism/SkinCareAdminCard";

import {
  ADMIN_SKIN_CATEGORY_QUERY_KEY,
  getAdminSkinCategoryCollection,
  getAdminSkinCategoryConfig,
  type AdminSkinCategoryConfig,
  type AdminSkinCategoryId,
} from "./skinCategory";

const CACHE_TIME_MS = 5 * 60 * 1000;

export function useAdminSkinCategories(activeCategory: AdminSkinCategoryId) {
  const adminSkinCategoriesQuery = useQuery({
    queryKey: [...ADMIN_SKIN_CATEGORY_QUERY_KEY],
    queryFn: async () => {
      return await getAdminSkinCategoryCollection();
    },
    staleTime: CACHE_TIME_MS,
    gcTime: CACHE_TIME_MS,
  });

  return {
    activeCategoryConfig: getAdminSkinCategoryConfig(activeCategory),
    activeItems: adminSkinCategoriesQuery.data?.[activeCategory] ?? [],
    adminSkinCategoriesQuery,
  } satisfies {
    activeCategoryConfig: AdminSkinCategoryConfig;
    activeItems: SkinCareCardItem[];
    adminSkinCategoriesQuery: typeof adminSkinCategoriesQuery;
  };
}
