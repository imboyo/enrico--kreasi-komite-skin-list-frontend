"use client";

import type { DebouncedFunc } from "lodash";
import debounce from "lodash/debounce";
import { createStore } from "zustand";

import type { AccountStatus } from "backend-service/admin/account";
import type {
  ListUserAccountPayload,
  UserAccount,
} from "backend-service/admin/account/user";

import {
  DEFAULT_USER_SORT_VALUE,
  type UserSortValue,
} from "./userAccountListSort";

export const USER_ACCOUNT_QUERY_KEY = ["user-account-list"] as const;
export const DEFAULT_USER_ACCOUNT_PAGE_NUMBER = 1;
export const USER_ACCOUNT_PAGE_LIMIT = 10;

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

type BuildUserAccountListState = {
  currentPage: number;
  debouncedSearchValue: string;
  selectedStatuses: AccountStatus[];
  sortValue: UserSortValue;
};

export type UserAccountListStore = BuildUserAccountListState & {
  searchValue: string;
  handlePageChange: (page: number, totalPages: number) => void;
  handleSearchChange: (value: string) => void;
  handleSelectedStatusesChange: (statuses: AccountStatus[]) => void;
  handleSortChange: (value: UserSortValue) => void;
  resetToolbarState: () => void;
  cancelSearchDebounce: () => void;
};

function clampPage(page: number, totalPages: number) {
  return Math.min(
    Math.max(page, DEFAULT_USER_ACCOUNT_PAGE_NUMBER),
    Math.max(totalPages, DEFAULT_USER_ACCOUNT_PAGE_NUMBER),
  );
}

function createInitialStoreState(): BuildUserAccountListState & {
  searchValue: string;
} {
  return {
    currentPage: DEFAULT_USER_ACCOUNT_PAGE_NUMBER,
    searchValue: "",
    debouncedSearchValue: "",
    selectedStatuses: [],
    sortValue: DEFAULT_USER_SORT_VALUE,
  };
}

export function createUserAccountListStore() {
  const store = createStore<UserAccountListStore>((set) => ({
    ...createInitialStoreState(),
    handlePageChange: (page, totalPages) =>
      set({
        currentPage: clampPage(page, totalPages),
      }),
    handleSearchChange: (value) => {
      set({ searchValue: value });
      applyDebouncedSearch(value);
    },
    handleSelectedStatusesChange: (statuses) =>
      set({
        selectedStatuses: statuses,
        currentPage: DEFAULT_USER_ACCOUNT_PAGE_NUMBER,
      }),
    handleSortChange: (value) =>
      set({
        sortValue: value,
        currentPage: DEFAULT_USER_ACCOUNT_PAGE_NUMBER,
      }),
    resetToolbarState: () => {
      applyDebouncedSearch.cancel();
      set({
        ...createInitialStoreState(),
      });
    },
    cancelSearchDebounce: () => {
      applyDebouncedSearch.cancel();
    },
  }));

  const applyDebouncedSearch: DebouncedFunc<(value: string) => void> = debounce(
    (value: string) => {
      store.setState({
        debouncedSearchValue: value.trim(),
        currentPage: DEFAULT_USER_ACCOUNT_PAGE_NUMBER,
      });
    },
    400,
  );

  return store;
}

export function buildListUserAccountPayload({
  currentPage,
  debouncedSearchValue,
  selectedStatuses,
  sortValue,
}: BuildUserAccountListState): ListUserAccountPayload {
  return {
    page: currentPage,
    limit: USER_ACCOUNT_PAGE_LIMIT,
    search: debouncedSearchValue || undefined,
    sort: [USER_SORT_REQUEST_MAP[sortValue]],
    // Multiple statuses must expand the result set with OR so the backend
    // does not receive an impossible ACTIVE and INACTIVE intersection.
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

export function buildUserAccountListQueryKey({
  currentPage,
  debouncedSearchValue,
  selectedStatuses,
  sortValue,
}: BuildUserAccountListState) {
  return [
    ...USER_ACCOUNT_QUERY_KEY,
    currentPage,
    debouncedSearchValue,
    selectedStatuses.join(","),
    sortValue,
  ] as const;
}

export function getUserAccountsFromResponse(
  data?: {
    data?: UserAccount[];
  },
) {
  return data?.data ?? [];
}
