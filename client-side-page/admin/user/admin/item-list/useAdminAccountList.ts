"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import { useEffect, useMemo, useState } from "react";

import {
  listAdminAccount,
  type AdminAccount,
  type ListAdminAccountPayload,
} from "backend-service/admin/account/admin";
import {
  DEFAULT_ADMIN_SORT_VALUE,
  type AdminSortValue,
  type AdminStatusFilterValue,
} from "client-side-page/admin/user/admin/item-list/AdminListToolbar";

const ADMIN_ACCOUNT_QUERY_KEY = ["admin-account-list"] as const;
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 10;

const ADMIN_SORT_REQUEST_MAP: Record<
  AdminSortValue,
  NonNullable<ListAdminAccountPayload["sort"]>[number]
> = {
  "full-name-asc": {
    field: "full_name",
    direction: "ASC",
  },
  "full-name-desc": {
    field: "full_name",
    direction: "DESC",
  },
  "email-asc": {
    field: "email",
    direction: "ASC",
  },
  "status-asc": {
    field: "status",
    direction: "ASC",
  },
};

function buildListAdminAccountPayload({
  currentPage,
  debouncedSearchValue,
  selectedStatuses,
  sortValue,
}: {
  currentPage: number;
  debouncedSearchValue: string;
  selectedStatuses: AdminStatusFilterValue[];
  sortValue: AdminSortValue;
}): ListAdminAccountPayload {
  return {
    page: currentPage,
    limit: DEFAULT_PAGE_LIMIT,
    search: debouncedSearchValue || undefined,
    sort: [ADMIN_SORT_REQUEST_MAP[sortValue]],
    // Send status filters directly in the payload so pagination metadata stays
    // aligned with the actual backend result set instead of a client-side slice.
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

export function useAdminAccountList() {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<
    AdminStatusFilterValue[]
  >([]);
  const [sortValue, setSortValue] = useState<AdminSortValue>(
    DEFAULT_ADMIN_SORT_VALUE,
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

  const adminAccountsQuery = useQuery({
    queryKey: [
      ...ADMIN_ACCOUNT_QUERY_KEY,
      currentPage,
      debouncedSearchValue,
      selectedStatuses.join(","),
      sortValue,
    ],
    queryFn: async () => {
      return await listAdminAccount(
        buildListAdminAccountPayload({
          currentPage,
          debouncedSearchValue,
          selectedStatuses,
          sortValue,
        }),
      );
    },
    placeholderData: keepPreviousData,
  });

  const adminAccounts = adminAccountsQuery.data?.data ?? [];
  const totalPages = Math.max(
    DEFAULT_PAGE_NUMBER,
    adminAccountsQuery.data?.meta.total_pages ?? DEFAULT_PAGE_NUMBER,
  );

  function handlePageChange(page: number) {
    setCurrentPage(Math.min(Math.max(page, DEFAULT_PAGE_NUMBER), totalPages));
  }

  function handleSearchChange(value: string) {
    setSearchValue(value);
    applyDebouncedSearch(value);
  }

  function handleSelectedStatusesChange(statuses: AdminStatusFilterValue[]) {
    setSelectedStatuses(statuses);
    setCurrentPage(DEFAULT_PAGE_NUMBER);
  }

  function handleSortChange(nextSortValue: AdminSortValue) {
    setSortValue(nextSortValue);
    setCurrentPage(DEFAULT_PAGE_NUMBER);
  }

  return {
    adminAccounts,
    adminAccountsQuery,
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
    adminAccounts: AdminAccount[];
    adminAccountsQuery: typeof adminAccountsQuery;
    currentPage: number;
    totalPages: number;
    searchValue: string;
    selectedStatuses: AdminStatusFilterValue[];
    sortValue: AdminSortValue;
    handlePageChange: (page: number) => void;
    handleSearchChange: (value: string) => void;
    handleSelectedStatusesChange: (
      statuses: AdminStatusFilterValue[],
    ) => void;
    handleSortChange: (nextSortValue: AdminSortValue) => void;
  };
}
