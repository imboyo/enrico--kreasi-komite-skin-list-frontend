"use client";

import { useQuery } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import { useEffect, useMemo, useState } from "react";

import {
  listDefaultSkinCare,
  type AdminDefaultSkinCare,
  type ListAdminDefaultSkinCarePayload,
} from "backend-service/admin/default-skin-care";

import {
  ADMIN_DEFAULT_SKIN_CARE_QUERY_KEY,
  getAdminSkinCategoryConfig,
  type AdminSkinCategoryConfig,
  type AdminSkinCategoryId,
} from "./skinCategory";
import {
  DEFAULT_ADMIN_SKIN_SORT_VALUE,
  getAdminSkinSortRequest,
  type AdminSkinSortValue,
} from "./skinListSort";

const CACHE_TIME_MS = 5 * 60 * 1000;
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 100;

function buildAdminSkinListPayload({
  activeCategory,
  debouncedSearchValue,
  sortValue,
}: {
  activeCategory: AdminSkinCategoryId;
  debouncedSearchValue: string;
  sortValue: AdminSkinSortValue;
}): ListAdminDefaultSkinCarePayload {
  return {
    page: DEFAULT_PAGE_NUMBER,
    limit: DEFAULT_PAGE_LIMIT,
    search: debouncedSearchValue || undefined,
    sort: [getAdminSkinSortRequest(sortValue)],
    // Keep the active tab category as a hard backend filter so search and sort
    // always operate inside the selected category instead of a client slice.
    filter: {
      and: [
        {
          field: "category",
          operator: "eq",
          value: activeCategory,
        },
      ],
    },
  };
}

export function useAdminSkinList(activeCategory: AdminSkinCategoryId) {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [sortValue, setSortValue] = useState<AdminSkinSortValue>(
    DEFAULT_ADMIN_SKIN_SORT_VALUE,
  );

  const applyDebouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearchValue(value.trim());
      }, 400),
    [],
  );

  useEffect(() => () => applyDebouncedSearch.cancel(), [applyDebouncedSearch]);

  const adminSkinListQuery = useQuery({
    queryKey: [
      ...ADMIN_DEFAULT_SKIN_CARE_QUERY_KEY,
      activeCategory,
      debouncedSearchValue,
      sortValue,
    ],
    queryFn: async () => {
      return await listDefaultSkinCare(
        buildAdminSkinListPayload({
          activeCategory,
          debouncedSearchValue,
          sortValue,
        }),
      );
    },
    staleTime: CACHE_TIME_MS,
    gcTime: CACHE_TIME_MS,
  });

  function handleSearchChange(value: string) {
    setSearchValue(value);
    applyDebouncedSearch(value);
  }

  function handleSortChange(nextSortValue: AdminSkinSortValue) {
    setSortValue(nextSortValue);
  }

  return {
    activeCategoryConfig: getAdminSkinCategoryConfig(activeCategory),
    activeItems: adminSkinListQuery.data?.data ?? [],
    adminSkinListQuery,
    searchValue,
    sortValue,
    handleSearchChange,
    handleSortChange,
  } satisfies {
    activeCategoryConfig: AdminSkinCategoryConfig;
    activeItems: AdminDefaultSkinCare[];
    adminSkinListQuery: typeof adminSkinListQuery;
    searchValue: string;
    sortValue: AdminSkinSortValue;
    handleSearchChange: (value: string) => void;
    handleSortChange: (value: AdminSkinSortValue) => void;
  };
}
