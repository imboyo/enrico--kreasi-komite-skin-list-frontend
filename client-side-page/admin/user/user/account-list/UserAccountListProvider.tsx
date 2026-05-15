"use client";

import {
  keepPreviousData,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { useStore } from "zustand";

import {
  listUserAccount,
  type ListUserAccountResponse,
} from "backend-service/admin/account/user";

import {
  buildListUserAccountPayload,
  buildUserAccountListQueryKey,
  createUserAccountListStore,
  DEFAULT_USER_ACCOUNT_PAGE_NUMBER,
  type UserAccountListStore,
} from "./utils/userAccountList.store";

type UserAccountListStoreApi = ReturnType<typeof createUserAccountListStore>;

const UserAccountListStoreContext = createContext<UserAccountListStoreApi | null>(
  null,
);

const UserAccountListQueryContext =
  createContext<UseQueryResult<ListUserAccountResponse> | null>(null);

export function useUserAccountListStore<T>(
  selector: (state: UserAccountListStore) => T,
) {
  const store = useContext(UserAccountListStoreContext);

  if (!store) {
    throw new Error(
      "useUserAccountListStore must be used within a UserAccountListProvider",
    );
  }

  return useStore(store, selector);
}

export function useUserAccountListQuery() {
  const userAccountQuery = useContext(UserAccountListQueryContext);

  if (!userAccountQuery) {
    throw new Error(
      "useUserAccountListQuery must be used within a UserAccountListProvider",
    );
  }

  return userAccountQuery;
}

interface UserAccountListProviderProps {
  children: React.ReactNode;
}

export function UserAccountListProvider({
  children,
}: Readonly<UserAccountListProviderProps>) {
  const [store] = useState<UserAccountListStoreApi>(createUserAccountListStore);
  const currentPage = useStore(store, (state) => state.currentPage);
  const debouncedSearchValue = useStore(
    store,
    (state) => state.debouncedSearchValue,
  );
  const selectedStatuses = useStore(store, (state) => state.selectedStatuses);
  const sortValue = useStore(store, (state) => state.sortValue);

  const userAccountQuery = useQuery({
    queryKey: buildUserAccountListQueryKey({
      currentPage,
      debouncedSearchValue,
      selectedStatuses,
      sortValue,
    }),
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

  const totalPages = Math.max(
    DEFAULT_USER_ACCOUNT_PAGE_NUMBER,
    userAccountQuery.data?.meta.total_pages ?? DEFAULT_USER_ACCOUNT_PAGE_NUMBER,
  );

  useEffect(() => {
    return () => {
      store.getState().cancelSearchDebounce();
    };
  }, [store]);

  useEffect(() => {
    if (currentPage > totalPages) {
      // When filters shrink the result set, clamp the stored page so the next
      // fetch stays aligned with the backend pagination metadata.
      store.getState().handlePageChange(currentPage, totalPages);
    }
  }, [currentPage, store, totalPages]);

  return (
    <UserAccountListStoreContext.Provider value={store}>
      <UserAccountListQueryContext.Provider value={userAccountQuery}>
        {children}
      </UserAccountListQueryContext.Provider>
    </UserAccountListStoreContext.Provider>
  );
}
