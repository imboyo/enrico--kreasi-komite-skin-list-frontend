"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import { useEffect, useMemo } from "react";

import {
  listDefaultSkinTreat,
  type DefaultSkinTreat,
} from "backend-service/default-skin-treat";

import {
  getAdminDefaultSkinTreatCategoryConfig,
  type AdminDefaultSkinTreatCategoryConfig,
  type AdminDefaultSkinTreatCategoryId,
} from "./defaultSkinTreatCategory";
import {
  buildAdminDefaultSkinTreatListPayload,
  buildAdminDefaultSkinTreatListQueryKey,
  DEFAULT_ADMIN_DEFAULT_SKIN_TREAT_PAGE_NUMBER,
  getAdminDefaultSkinTreatCurrentPage,
  useAdminDefaultSkinTreatPageLevelStore,
} from "../page-level.store";
import {
  type AdminDefaultSkinTreatSortValue,
} from "./defaultSkinTreatListSort";

const CACHE_TIME_MS = 5 * 60 * 1000;

export function useAdminDefaultSkinTreatList(
  activeCategory: AdminDefaultSkinTreatCategoryId,
) {
  const currentPage = useAdminDefaultSkinTreatPageLevelStore((state) =>
    getAdminDefaultSkinTreatCurrentPage(state.pageByCategory, activeCategory),
  );
  const searchValue = useAdminDefaultSkinTreatPageLevelStore(
    (state) => state.searchValue,
  );
  const debouncedSearchValue = useAdminDefaultSkinTreatPageLevelStore(
    (state) => state.debouncedSearchValue,
  );
  const sortValue = useAdminDefaultSkinTreatPageLevelStore(
    (state) => state.sortValue,
  );
  const setPage = useAdminDefaultSkinTreatPageLevelStore(
    (state) => state.setPage,
  );
  const setSearchValue = useAdminDefaultSkinTreatPageLevelStore(
    (state) => state.setSearchValue,
  );
  const applySearchToStore = useAdminDefaultSkinTreatPageLevelStore(
    (state) => state.applyDebouncedSearch,
  );
  const setSortValue = useAdminDefaultSkinTreatPageLevelStore(
    (state) => state.setSortValue,
  );
  const resetToolbarState = useAdminDefaultSkinTreatPageLevelStore(
    (state) => state.resetToolbarState,
  );

  const applyDebouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        applySearchToStore(value);
      }, 400),
    [applySearchToStore],
  );

  useEffect(() => () => applyDebouncedSearch.cancel(), [applyDebouncedSearch]);

  const adminDefaultSkinTreatListQuery = useQuery({
    queryKey: buildAdminDefaultSkinTreatListQueryKey({
      activeCategory,
      currentPage,
      debouncedSearchValue,
      sortValue,
    }),
    queryFn: async () => {
      // The page-level store owns the query contract so page state changes and
      // backend payload changes stay in one place.
      return await listDefaultSkinTreat(
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
    DEFAULT_ADMIN_DEFAULT_SKIN_TREAT_PAGE_NUMBER,
    adminDefaultSkinTreatListQuery.data?.meta.total_pages ??
      DEFAULT_ADMIN_DEFAULT_SKIN_TREAT_PAGE_NUMBER,
  );

  useEffect(() => {
    // Keep the store aligned with the backend after searches or mutations
    // shrink the result set and invalidate a previously selected page.
    if (currentPage > totalPages) {
      setPage(activeCategory, totalPages, totalPages);
    }
  }, [activeCategory, currentPage, setPage, totalPages]);

  function handlePageChange(page: number) {
    setPage(activeCategory, page, totalPages);
  }

  function handleSearchChange(value: string) {
    setSearchValue(value);
    applyDebouncedSearch(value);
  }

  function handleSortChange(nextSortValue: AdminDefaultSkinTreatSortValue) {
    setSortValue(nextSortValue);
  }

  function handleReset() {
    // Cancel the queued debounce so an old keyword cannot overwrite the reset
    // state after the toolbar has already been cleared.
    applyDebouncedSearch.cancel();
    resetToolbarState();
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
    handleReset,
    handleSearchChange,
    handleSortChange,
  } satisfies {
    activeCategoryConfig: AdminDefaultSkinTreatCategoryConfig;
    activeItems: DefaultSkinTreat[];
    adminDefaultSkinTreatListQuery: typeof adminDefaultSkinTreatListQuery;
    currentPage: number;
    totalPages: number;
    searchValue: string;
    sortValue: AdminDefaultSkinTreatSortValue;
    handlePageChange: (page: number) => void;
    handleReset: () => void;
    handleSearchChange: (value: string) => void;
    handleSortChange: (value: AdminDefaultSkinTreatSortValue) => void;
  };
}
