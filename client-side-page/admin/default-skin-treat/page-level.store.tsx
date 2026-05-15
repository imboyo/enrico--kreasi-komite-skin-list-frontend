"use client";

import {
  keepPreviousData,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { createStore, useStore } from "zustand";

import { useHydrated } from "@/hooks/useHydrated";
import {
  listDefaultSkinTreat,
  type ListDefaultSkinTreatResponse,
} from "backend-service/default-skin-treat";

import {
  ADMIN_DEFAULT_SKIN_TREAT_QUERY_KEY,
  ADMIN_DEFAULT_SKIN_TREAT_CATEGORY_IDS,
  type AdminDefaultSkinTreatCategoryId,
} from "./utils/defaultSkinTreatCategory";
import {
  DEFAULT_ADMIN_DEFAULT_SKIN_TREAT_SORT_VALUE,
  getAdminDefaultSkinTreatSortRequest,
  type AdminDefaultSkinTreatSortValue,
} from "./utils/defaultSkinTreatListSort";
import type { ListAdminDefaultSkinTreatPayload } from "backend-service/admin/default-skin-care";

const CACHE_TIME_MS = 5 * 60 * 1000;
export const DEFAULT_ADMIN_DEFAULT_SKIN_TREAT_PAGE_NUMBER = 1;
export const DEFAULT_ADMIN_DEFAULT_SKIN_TREAT_PAGE_LIMIT = 20;

function createInitialPageByCategory() {
  return ADMIN_DEFAULT_SKIN_TREAT_CATEGORY_IDS.reduce(
    (pageByCategory, categoryId) => {
      pageByCategory[categoryId] = DEFAULT_ADMIN_DEFAULT_SKIN_TREAT_PAGE_NUMBER;
      return pageByCategory;
    },
    {} as Record<AdminDefaultSkinTreatCategoryId, number>,
  );
}

function clampPage(page: number, totalPages: number) {
  return Math.min(
    Math.max(page, DEFAULT_ADMIN_DEFAULT_SKIN_TREAT_PAGE_NUMBER),
    Math.max(totalPages, DEFAULT_ADMIN_DEFAULT_SKIN_TREAT_PAGE_NUMBER),
  );
}

function buildAdminDefaultSkinTreatCategoryFilter(
  activeCategory: AdminDefaultSkinTreatCategoryId,
): NonNullable<ListAdminDefaultSkinTreatPayload["filter"]> {
  return {
    and: [
      {
        field: "category",
        operator: "eq",
        value: activeCategory,
      },
    ],
  };
}

type BuildAdminDefaultSkinTreatListState = {
  activeCategory: AdminDefaultSkinTreatCategoryId;
  currentPage: number;
  debouncedSearchValue: string;
  sortValue: AdminDefaultSkinTreatSortValue;
};

export function buildAdminDefaultSkinTreatListPayload({
  activeCategory,
  currentPage,
  debouncedSearchValue,
  sortValue,
}: BuildAdminDefaultSkinTreatListState): ListAdminDefaultSkinTreatPayload {
  return {
    page: currentPage,
    limit: DEFAULT_ADMIN_DEFAULT_SKIN_TREAT_PAGE_LIMIT,
    search: debouncedSearchValue || undefined,
    sort: [getAdminDefaultSkinTreatSortRequest(sortValue)],
    filter: buildAdminDefaultSkinTreatCategoryFilter(activeCategory),
  };
}

export function buildAdminDefaultSkinTreatListQueryKey({
  activeCategory,
  currentPage,
  debouncedSearchValue,
  sortValue,
}: BuildAdminDefaultSkinTreatListState) {
  return [
    ...ADMIN_DEFAULT_SKIN_TREAT_QUERY_KEY,
    activeCategory,
    currentPage,
    debouncedSearchValue,
    sortValue,
  ] as const;
}

export type PageLevelState = {
  activeCategory: AdminDefaultSkinTreatCategoryId;
  pageByCategory: Record<AdminDefaultSkinTreatCategoryId, number>;
  searchValue: string;
  debouncedSearchValue: string;
  sortValue: AdminDefaultSkinTreatSortValue;
  setActiveCategory: (value: AdminDefaultSkinTreatCategoryId) => void;
  setPage: (
    activeCategory: AdminDefaultSkinTreatCategoryId,
    page: number,
    totalPages: number,
  ) => void;
  setSearchValue: (value: string) => void;
  applyDebouncedSearch: (value: string) => void;
  setSortValue: (value: AdminDefaultSkinTreatSortValue) => void;
  resetToolbarState: () => void;
  resetPageLevelState: () => void;
  adminDefaultSkinTreatListQuery: UseQueryResult<ListDefaultSkinTreatResponse>;
  currentPage: number;
  totalPages: number;
};

function createInitialStoreState(
  activeCategory: AdminDefaultSkinTreatCategoryId,
) {
  return {
    activeCategory,
    pageByCategory: createInitialPageByCategory(),
    searchValue: "",
    debouncedSearchValue: "",
    sortValue: DEFAULT_ADMIN_DEFAULT_SKIN_TREAT_SORT_VALUE,
  };
}

export const createPageLevelStore = (
  initialActiveCategory: AdminDefaultSkinTreatCategoryId,
) => {
  return createStore<PageLevelState>((set) => ({
    ...createInitialStoreState(initialActiveCategory),
    setActiveCategory: (value) => set({ activeCategory: value }),
    setPage: (activeCategory, page, totalPages) =>
      set((state) => ({
        pageByCategory: {
          ...state.pageByCategory,
          [activeCategory]: clampPage(page, totalPages),
        },
      })),
    setSearchValue: (value) => set({ searchValue: value }),
    applyDebouncedSearch: (value) =>
      set({
        debouncedSearchValue: value.trim(),
        pageByCategory: createInitialPageByCategory(),
      }),
    setSortValue: (value) =>
      set({
        sortValue: value,
        pageByCategory: createInitialPageByCategory(),
      }),
    resetToolbarState: () =>
      set({
        searchValue: "",
        debouncedSearchValue: "",
        sortValue: DEFAULT_ADMIN_DEFAULT_SKIN_TREAT_SORT_VALUE,
        pageByCategory: createInitialPageByCategory(),
      }),
    resetPageLevelState: () =>
      set({
        ...createInitialStoreState(initialActiveCategory),
      }),
    // Keep the query result typed in the store so selectors preserve the
    // backend item shape instead of widening list items to `any`.
    adminDefaultSkinTreatListQuery:
      {} as UseQueryResult<ListDefaultSkinTreatResponse>,
    currentPage: DEFAULT_ADMIN_DEFAULT_SKIN_TREAT_PAGE_NUMBER,
    totalPages: DEFAULT_ADMIN_DEFAULT_SKIN_TREAT_PAGE_NUMBER,
  }));
};

const PageLevelStoreContext = React.createContext<ReturnType<
  typeof createPageLevelStore
> | null>(null);

export const usePageLevelStore = <T,>(
  selector: (state: PageLevelState) => T,
): T => {
  const store = React.useContext(PageLevelStoreContext);
  if (!store) {
    throw new Error(
      "usePageLevelStore must be used within a PageLevelStoreProvider",
    );
  }

  return useStore(store, selector);
};

interface ProviderProps {
  children: React.ReactNode;
  initialActiveCategory: AdminDefaultSkinTreatCategoryId;
}

export const PageLevelStoreProvider: React.FC<ProviderProps> = ({
  children,
  initialActiveCategory,
}) => {
  const hydrated = useHydrated();
  const [store] = useState(() => createPageLevelStore(initialActiveCategory));

  useEffect(() => {
    // Keep the client store aligned with the route-derived category in case
    // the page instance is preserved across search-param navigations.
    store.getState().setActiveCategory(initialActiveCategory);
  }, [initialActiveCategory, store]);

  const activeCategory = useStore(store, (state) => state.activeCategory);
  const currentPage = useStore(
    store,
    (state) =>
      state.pageByCategory[activeCategory] ??
      DEFAULT_ADMIN_DEFAULT_SKIN_TREAT_PAGE_NUMBER,
  );
  const debouncedSearchValue = useStore(
    store,
    (state) => state.debouncedSearchValue,
  );
  const sortValue = useStore(store, (state) => state.sortValue);

  const adminDefaultSkinTreatListQuery = useQuery({
    queryKey: buildAdminDefaultSkinTreatListQueryKey({
      activeCategory,
      currentPage,
      debouncedSearchValue,
      sortValue,
    }),
    queryFn: async () => {
      return await listDefaultSkinTreat(
        buildAdminDefaultSkinTreatListPayload({
          activeCategory,
          currentPage,
          debouncedSearchValue,
          sortValue,
        }),
      );
    },
    placeholderData: keepPreviousData,
    staleTime: CACHE_TIME_MS,
  });

  useEffect(() => {
    const totalPages =
      adminDefaultSkinTreatListQuery.data?.meta?.total_pages ??
      DEFAULT_ADMIN_DEFAULT_SKIN_TREAT_PAGE_NUMBER;
    store.setState({
      adminDefaultSkinTreatListQuery,
      currentPage,
      totalPages,
    });
  }, [adminDefaultSkinTreatListQuery, currentPage, store]);

  return (
    <PageLevelStoreContext.Provider value={store}>
      {hydrated ? children : null}
    </PageLevelStoreContext.Provider>
  );
};
