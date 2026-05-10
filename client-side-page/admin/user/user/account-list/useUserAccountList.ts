"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import { useEffect, useMemo, useState } from "react";

import {
  listUserAccount,
  type UserAccount,
  type ListUserAccountPayload,
} from "backend-service/admin/account/user";
import type { AccountStatus } from "backend-service/admin/account";
import {
  DEFAULT_USER_SORT_VALUE,
  type UserSortValue,
} from "client-side-page/admin/user/user/account-list/CustomerListToolbar";

export const USER_ACCOUNT_QUERY_KEY = ["user-account-list"] as const;
const DEFAULT_PAGE_NUMBER = 1;
const PAGE_LIMIT = 10;

const USER_SORT_REQUEST_MAP: Record<
  UserSortValue,
  NonNullable<ListUserAccountPayload["sort"]>[number]
> = {
  "name-asc": {
    field: "full_name",
    direction: "ASC",
  },
  "name-desc": {
    field: "full_name",
    direction: "DESC",
  },
  "phone-asc": {
    field: "phone_number",
    direction: "ASC",
  },
  "phone-desc": {
    field: "phone_number",
    direction: "DESC",
  },
  "status-asc": {
    field: "status",
    direction: "ASC",
  },
};

function buildListUserAccountPayload({
  currentPage,
  debouncedSearchValue,
  selectedStatuses,
  sortValue,
}: {
  currentPage: number;
  debouncedSearchValue: string;
  selectedStatuses: AccountStatus[];
  sortValue: UserSortValue;
}): ListUserAccountPayload {
  return {
    page: currentPage,
    limit: PAGE_LIMIT,
    search: debouncedSearchValue || undefined,
    sort: [USER_SORT_REQUEST_MAP[sortValue]],
    // Use OR here so selecting multiple statuses widens the backend filter
    // instead of producing an impossible ACTIVE and INACTIVE intersection.
    filter:
      selectedStatuses.length > 0
        ? {
            or: selectedStatuses.map((status) => ({
              field: "status",
              operator: "eq",
              value: status,
            })),
          }
        : undefined,
  };
}

export function useUserAccountList() {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<AccountStatus[]>([]);
  const [sortValue, setSortValue] = useState<UserSortValue>(
    DEFAULT_USER_SORT_VALUE,
  );

  const applyDebouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearchValue(value.trim());
        setCurrentPage(DEFAULT_PAGE_NUMBER);
      }, 400),
    [],
  );

  useEffect(() => () => applyDebouncedSearch.cancel(), [applyDebouncedSearch]);

  const userAccountQuery = useQuery({
    queryKey: [
      ...USER_ACCOUNT_QUERY_KEY,
      currentPage,
      debouncedSearchValue,
      selectedStatuses.join(","),
      sortValue,
    ],
    queryFn: async () => {
      return await listUserAccount(
        buildListUserAccountPayload({
          currentPage,
          debouncedSearchValue,
          selectedStatuses,
          sortValue,
        }),
      );
    },
    placeholderData: keepPreviousData,
  });

  const userAccounts = userAccountQuery.data?.data ?? [];
  const totalPages = Math.max(
    DEFAULT_PAGE_NUMBER,
    userAccountQuery.data?.meta.total_pages ?? DEFAULT_PAGE_NUMBER,
  );

  function handlePageChange(page: number) {
    setCurrentPage(Math.min(Math.max(page, DEFAULT_PAGE_NUMBER), totalPages));
  }

  function handleSearchChange(value: string) {
    setSearchValue(value);
    applyDebouncedSearch(value);
  }

  function handleSelectedStatusesChange(statuses: AccountStatus[]) {
    setSelectedStatuses(statuses);
    setCurrentPage(DEFAULT_PAGE_NUMBER);
  }

  function handleSortChange(nextSortValue: UserSortValue) {
    setSortValue(nextSortValue);
    setCurrentPage(DEFAULT_PAGE_NUMBER);
  }

  return {
    userAccounts,
    userAccountQuery,
    currentPage: Math.min(currentPage, totalPages),
    totalPages,
    searchValue,
    selectedStatuses,
    sortValue,
    handlePageChange,
    handleSearchChange,
    handleSelectedStatusesChange,
    handleSortChange,
  } satisfies {
    userAccounts: UserAccount[];
    userAccountQuery: typeof userAccountQuery;
    currentPage: number;
    totalPages: number;
    searchValue: string;
    selectedStatuses: AccountStatus[];
    sortValue: UserSortValue;
    handlePageChange: (page: number) => void;
    handleSearchChange: (value: string) => void;
    handleSelectedStatusesChange: (statuses: AccountStatus[]) => void;
    handleSortChange: (nextSortValue: UserSortValue) => void;
  };
}
