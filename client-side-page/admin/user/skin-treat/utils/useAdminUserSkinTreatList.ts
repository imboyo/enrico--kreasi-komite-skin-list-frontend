"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import { useEffect, useMemo, useState } from "react";

import {
  listAdminUserSkinTreat,
  type AdminUserSkinTreat,
  type ListAdminUserSkinTreatPayload,
} from "backend-service/admin/user/skin-treat";

import {
  ADMIN_USER_SKIN_TREAT_QUERY_KEY,
  ADMIN_USER_SKIN_TREAT_CATEGORY_IDS,
  getAdminUserSkinTreatCategoryConfig,
  type AdminUserSkinTreatCategoryConfig,
  type AdminUserSkinTreatCategoryId,
} from "./adminUserSkinTreatCategory";
import {
  DEFAULT_ADMIN_USER_SKIN_TREAT_SORT_VALUE,
  getAdminUserSkinTreatSortRequest,
  type AdminUserSkinTreatSortValue,
} from "./adminUserSkinTreatListSort";

const CACHE_TIME_MS = 5 * 60 * 1000;
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 20;

function buildAdminUserSkinTreatListPayload({
  activeCategory,
  currentPage,
  debouncedSearchValue,
  sortValue,
  userUuid,
}: {
  activeCategory: AdminUserSkinTreatCategoryId;
  currentPage: number;
  debouncedSearchValue: string;
  sortValue: AdminUserSkinTreatSortValue;
  userUuid: string;
}): ListAdminUserSkinTreatPayload {
  return {
    page: currentPage,
    limit: DEFAULT_PAGE_LIMIT,
    search: debouncedSearchValue || undefined,
    sort: [getAdminUserSkinTreatSortRequest(sortValue)],
    filter: {
      and: [
        {
          field: "category",
          operator: "eq",
          value: activeCategory,
        },
        {
          field: "user_account.uuid",
          operator: "eq",
          value: userUuid,
        },
      ],
    },
  };
}

export function useAdminUserSkinTreatList(
  activeCategory: AdminUserSkinTreatCategoryId,
  userUuid: string,
) {
  const [pageByCategory, setPageByCategory] = useState<
    Record<AdminUserSkinTreatCategoryId, number>
  >(() =>
    ADMIN_USER_SKIN_TREAT_CATEGORY_IDS.reduce(
      (result, categoryId) => {
        result[categoryId] = DEFAULT_PAGE_NUMBER;
        return result;
      },
      {} as Record<AdminUserSkinTreatCategoryId, number>,
    ),
  );
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [sortValue, setSortValue] = useState<AdminUserSkinTreatSortValue>(
    DEFAULT_ADMIN_USER_SKIN_TREAT_SORT_VALUE,
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

  const adminUserSkinTreatListQuery = useQuery({
    queryKey: [
      ...ADMIN_USER_SKIN_TREAT_QUERY_KEY,
      userUuid,
      activeCategory,
      currentPage,
      debouncedSearchValue,
      sortValue,
    ],
    queryFn: async () => {
      return await listAdminUserSkinTreat(
        buildAdminUserSkinTreatListPayload({
          activeCategory,
          currentPage,
          debouncedSearchValue,
          sortValue,
          userUuid,
        }),
      );
    },
    staleTime: CACHE_TIME_MS,
    gcTime: CACHE_TIME_MS,
    placeholderData: keepPreviousData,
  });

  const totalPages = Math.max(
    DEFAULT_PAGE_NUMBER,
    adminUserSkinTreatListQuery.data?.meta.total_pages ?? DEFAULT_PAGE_NUMBER,
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

  function handleSortChange(nextSortValue: AdminUserSkinTreatSortValue) {
    setSortValue(nextSortValue);
    setPageByCategory((previousPageByCategory) => ({
      ...previousPageByCategory,
      [activeCategory]: DEFAULT_PAGE_NUMBER,
    }));
  }

  return {
    activeCategoryConfig: getAdminUserSkinTreatCategoryConfig(activeCategory),
    activeItems: adminUserSkinTreatListQuery.data?.data ?? [],
    adminUserSkinTreatListQuery,
    currentPage: Math.min(currentPage, totalPages),
    totalPages,
    searchValue,
    sortValue,
    handlePageChange,
    handleSearchChange,
    handleSortChange,
  } satisfies {
    activeCategoryConfig: AdminUserSkinTreatCategoryConfig;
    activeItems: AdminUserSkinTreat[];
    adminUserSkinTreatListQuery: typeof adminUserSkinTreatListQuery;
    currentPage: number;
    totalPages: number;
    searchValue: string;
    sortValue: AdminUserSkinTreatSortValue;
    handlePageChange: (page: number) => void;
    handleSearchChange: (value: string) => void;
    handleSortChange: (value: AdminUserSkinTreatSortValue) => void;
  };
}
