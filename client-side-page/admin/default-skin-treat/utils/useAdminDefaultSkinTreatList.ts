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
  getAdminDefaultSkinTreatCategoryConfig,
  type AdminDefaultSkinTreatCategoryConfig,
  type AdminDefaultSkinTreatCategoryId,
} from "./defaultSkinTreatCategory";
import {
  DEFAULT_ADMIN_DEFAULT_SKIN_TREAT_SORT_VALUE,
  getAdminDefaultSkinTreatSortRequest,
  type AdminDefaultSkinTreatSortValue,
} from "./defaultSkinTreatListSort";

const CACHE_TIME_MS = 5 * 60 * 1000;
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 20;

function buildAdminDefaultSkinTreatListPayload({
  activeCategory,
  currentPage,
  debouncedSearchValue,
  sortValue,
}: {
  activeCategory: AdminDefaultSkinTreatCategoryId;
  currentPage: number;
  debouncedSearchValue: string;
  sortValue: AdminDefaultSkinTreatSortValue;
}): ListAdminDefaultSkinCarePayload {
  return {
    page: currentPage,
    limit: DEFAULT_PAGE_LIMIT,
    search: debouncedSearchValue || undefined,
    sort: [getAdminDefaultSkinTreatSortRequest(sortValue)],
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

export function useAdminDefaultSkinTreatList(
  activeCategory: AdminDefaultSkinTreatCategoryId,
) {
  const [pageByCategory, setPageByCategory] = useState<
    Record<AdminDefaultSkinTreatCategoryId, number>
  >({
    routine: DEFAULT_PAGE_NUMBER,
    make_up: DEFAULT_PAGE_NUMBER,
    barrier: DEFAULT_PAGE_NUMBER,
    colors: DEFAULT_PAGE_NUMBER,
    scars: DEFAULT_PAGE_NUMBER,
  });
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [sortValue, setSortValue] = useState<AdminDefaultSkinTreatSortValue>(
    DEFAULT_ADMIN_DEFAULT_SKIN_TREAT_SORT_VALUE,
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

  const adminDefaultSkinTreatListQuery = useQuery({
    queryKey: [
      ...ADMIN_DEFAULT_SKIN_CARE_QUERY_KEY,
      activeCategory,
      currentPage,
      debouncedSearchValue,
      sortValue,
    ],
    queryFn: async () => {
      return await listDefaultSkinCare(
        buildAdminDefaultSkinTreatListPayload({
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
    adminDefaultSkinTreatListQuery.data?.meta.total_pages ??
      DEFAULT_PAGE_NUMBER,
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

  function handleSortChange(nextSortValue: AdminDefaultSkinTreatSortValue) {
    setSortValue(nextSortValue);
    setPageByCategory((previousPageByCategory) => ({
      ...previousPageByCategory,
      [activeCategory]: DEFAULT_PAGE_NUMBER,
    }));
  }

  return {
    activeCategoryConfig:
      getAdminDefaultSkinTreatCategoryConfig(activeCategory),
    activeItems: adminDefaultSkinTreatListQuery.data?.data ?? [],
    adminDefaultSkinTreatListQuery,
    currentPage: Math.min(currentPage, totalPages),
    totalPages,
    searchValue,
    sortValue,
    handlePageChange,
    handleSearchChange,
    handleSortChange,
  } satisfies {
    activeCategoryConfig: AdminDefaultSkinTreatCategoryConfig;
    activeItems: AdminDefaultSkinCare[];
    adminDefaultSkinTreatListQuery: typeof adminDefaultSkinTreatListQuery;
    currentPage: number;
    totalPages: number;
    searchValue: string;
    sortValue: AdminDefaultSkinTreatSortValue;
    handlePageChange: (page: number) => void;
    handleSearchChange: (value: string) => void;
    handleSortChange: (value: AdminDefaultSkinTreatSortValue) => void;
  };
}
