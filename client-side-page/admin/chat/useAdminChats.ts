import { keepPreviousData, useQuery } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import { useEffect, useMemo, useState } from "react";

import { listAdminSkinChatThread } from "backend-service/admin/skin-chat";

const PAGE_LIMIT = 10;
const DEFAULT_PAGE = 1;

export function useAdminChats() {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  const applyDebouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearchValue(value.trim());
        setCurrentPage(DEFAULT_PAGE);
      }, 400),
    [],
  );

  useEffect(() => () => applyDebouncedSearch.cancel(), [applyDebouncedSearch]);

  const adminChatsQuery = useQuery({
    queryKey: ["admin-skin-chat-threads", currentPage, debouncedSearchValue],
    queryFn: async () => {
      return await listAdminSkinChatThread({
        page: currentPage,
        limit: PAGE_LIMIT,
        search: debouncedSearchValue || undefined,
      });
    },
    placeholderData: keepPreviousData,
  });

  const conversations = adminChatsQuery.data?.data ?? [];
  const totalPages = Math.max(
    DEFAULT_PAGE,
    adminChatsQuery.data?.meta.total_pages ?? DEFAULT_PAGE,
  );
  const totalCount = adminChatsQuery.data?.meta.total ?? 0;

  function handlePageChange(page: number) {
    setCurrentPage(Math.min(Math.max(page, DEFAULT_PAGE), totalPages));
  }

  function handleSearchChange(value: string) {
    setSearchValue(value);
    applyDebouncedSearch(value);
  }

  return {
    adminChatsQuery,
    conversations,
    currentPage: Math.min(currentPage, totalPages),
    totalPages,
    totalCount,
    searchValue,
    handlePageChange,
    handleSearchChange,
  };
}
