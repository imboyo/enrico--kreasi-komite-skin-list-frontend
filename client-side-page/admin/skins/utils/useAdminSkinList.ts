"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
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
const DEFAULT_PAGE_LIMIT = 20;

function buildAdminSkinListPayload({
  activeCategory,
  currentPage,
  debouncedSearchValue,
  sortValue,
}: {
  activeCategory: AdminSkinCategoryId;
  currentPage: number;
  debouncedSearchValue: string;
  sortValue: AdminSkinSortValue;
}): ListAdminDefaultSkinCarePayload {
  return {
    page: currentPage,
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
  const [pageByCategory, setPageByCategory] = useState<
    Record<AdminSkinCategoryId, number>
  >({
    routine: DEFAULT_PAGE_NUMBER,
    make_up: DEFAULT_PAGE_NUMBER,
    barrier: DEFAULT_PAGE_NUMBER,
    colors: DEFAULT_PAGE_NUMBER,
    scars: DEFAULT_PAGE_NUMBER,
  });
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [sortValue, setSortValue] = useState<AdminSkinSortValue>(
    DEFAULT_ADMIN_SKIN_SORT_VALUE,
  );
  const currentPage = pageByCategory[activeCategory];

  const applyDebouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearchValue(value.trim());
        // Restart from the first page so the backend query stays aligned with
        // the newly debounced keyword.
        setPageByCategory((previousPageByCategory) => ({
          ...previousPageByCategory,
          [activeCategory]: DEFAULT_PAGE_NUMBER,
        }));
      }, 400),
    [activeCategory],
  );

  useEffect(() => () => applyDebouncedSearch.cancel(), [applyDebouncedSearch]);

  const adminSkinListQuery = useQuery({
    queryKey: [
      ...ADMIN_DEFAULT_SKIN_CARE_QUERY_KEY,
      activeCategory,
      currentPage,
      debouncedSearchValue,
      sortValue,
    ],
    queryFn: async () => {
      return await listDefaultSkinCare(
        buildAdminSkinListPayload({
          activeCategory,
          currentPage,
          debouncedSearchValue,
          sortValue,
        }),
      );
    },
    staleTime: CACHE_TIME_MS,
    gcTime: CACHE_TIME_MS,
    placeholderData: keepPreviousData,
  });

  const totalPages = Math.max(
    DEFAULT_PAGE_NUMBER,
    adminSkinListQuery.data?.meta.total_pages ?? DEFAULT_PAGE_NUMBER,
  );

  function handlePageChange(page: number) {
    setPageByCategory((previousPageByCategory) => ({
      ...previousPageByCategory,
      [activeCategory]: Math.min(
        Math.max(page, DEFAULT_PAGE_NUMBER),
        totalPages,
      ),
    }));
  }

  function handleSearchChange(value: string) {
    setSearchValue(value);
    applyDebouncedSearch(value);
  }

  function handleSortChange(nextSortValue: AdminSkinSortValue) {
    setSortValue(nextSortValue);
    setPageByCategory((previousPageByCategory) => ({
      ...previousPageByCategory,
      [activeCategory]: DEFAULT_PAGE_NUMBER,
    }));
  }

  return {
    activeCategoryConfig: getAdminSkinCategoryConfig(activeCategory),
    activeItems: adminSkinListQuery.data?.data ?? [],
    adminSkinListQuery,
    currentPage: Math.min(currentPage, totalPages),
    totalPages,
    searchValue,
    sortValue,
    handlePageChange,
    handleSearchChange,
    handleSortChange,
  } satisfies {
    activeCategoryConfig: AdminSkinCategoryConfig;
    activeItems: AdminDefaultSkinCare[];
    adminSkinListQuery: typeof adminSkinListQuery;
    currentPage: number;
    totalPages: number;
    searchValue: string;
    sortValue: AdminSkinSortValue;
    handlePageChange: (page: number) => void;
    handleSearchChange: (value: string) => void;
    handleSortChange: (value: AdminSkinSortValue) => void;
  };
}
