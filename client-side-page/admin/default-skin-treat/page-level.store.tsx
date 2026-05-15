"use client";

import { create } from "zustand";

import type { ListAdminDefaultSkinTreatPayload } from "backend-service/admin/default-skin-care";

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
  // The active tab is treated as a mandatory backend filter so search and sort
  // never bleed into records from another category.
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

type AdminDefaultSkinTreatPageLevelStore = {
  pageByCategory: Record<AdminDefaultSkinTreatCategoryId, number>;
  searchValue: string;
  debouncedSearchValue: string;
  sortValue: AdminDefaultSkinTreatSortValue;
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
};

const initialPageByCategory = createInitialPageByCategory();

function createInitialStoreState() {
  return {
    pageByCategory: createInitialPageByCategory(),
    searchValue: "",
    debouncedSearchValue: "",
    sortValue: DEFAULT_ADMIN_DEFAULT_SKIN_TREAT_SORT_VALUE,
  };
}

export const useAdminDefaultSkinTreatPageLevelStore =
  create<AdminDefaultSkinTreatPageLevelStore>((set) => ({
    ...createInitialStoreState(),
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
        // Search and sort are shared across tabs, so every tab page index must
        // reset when the query criteria changes.
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
        ...createInitialStoreState(),
      }),
  }));

export function getAdminDefaultSkinTreatCurrentPage(
  pageByCategory: Record<AdminDefaultSkinTreatCategoryId, number>,
  activeCategory: AdminDefaultSkinTreatCategoryId,
) {
  return pageByCategory[activeCategory] ?? initialPageByCategory[activeCategory];
}
