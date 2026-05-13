import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import debounce from "lodash/debounce";

import type { SkinTreatListItem } from "components/atomic/organism/user-skin-treat-list";
import type { SkinTreatCategory } from "@/backend-service/user/skin-treat";
import type { DashboardEditableItem } from "@/mock-backend/user/dashboard/item-store";

import {
  SKIN_TREAT_CACHE_MS,
  SKIN_TREAT_CATEGORY_BY_TAB,
  SKIN_TREAT_QUERY_KEY,
  TAB_CONTENT_COPY,
  type TabId,
} from "../page-app.constants";
import {
  getUserSkinTreats,
  selectSkinTreatPage,
  type SortDirection,
} from "./page-app.utils";

type SelectedDashboardItem = {
  category: SkinTreatCategory;
  item: DashboardEditableItem;
};

export function usePageApp() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<TabId>("routines");
  const [selectedItem, setSelectedItem] =
    useState<SelectedDashboardItem | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState<SortDirection>("DESC");

  const applyDebouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearchQuery(value);
        setCurrentPage(1);
      }, 400),
    [],
  );

  useEffect(() => () => applyDebouncedSearch.cancel(), [applyDebouncedSearch]);

  const skinTreatQueryKey = useMemo(
    () =>
      [
        ...SKIN_TREAT_QUERY_KEY,
        activeTab,
        debouncedSearchQuery,
        currentPage,
        sortDirection,
      ] as const,
    [activeTab, debouncedSearchQuery, currentPage, sortDirection],
  );

  const fetchSkinTreatPage = useCallback(
    () =>
      getUserSkinTreats({
        tabId: activeTab,
        search: debouncedSearchQuery,
        page: currentPage,
        sortDirection,
      }),
    [activeTab, currentPage, debouncedSearchQuery, sortDirection],
  );

  const skinTreatPageQuery = useQuery({
    queryKey: skinTreatQueryKey,
    queryFn: fetchSkinTreatPage,
    staleTime: SKIN_TREAT_CACHE_MS,
    gcTime: SKIN_TREAT_CACHE_MS,
  });
  const skinTreatSelect = useMemo(() => selectSkinTreatPage(), []);

  const totalPages = Math.max(
    1,
    skinTreatPageQuery.data?.meta.total_pages ?? 1,
  );

  const syncPaginationWithBackend = useCallback(async () => {
    const nextPageResponse = await queryClient.fetchQuery({
      queryKey: skinTreatQueryKey,
      queryFn: fetchSkinTreatPage,
      staleTime: 0,
    });
    const nextTotalPages = Math.max(1, nextPageResponse.meta.total_pages ?? 1);

    if (currentPage > nextTotalPages) {
      setCurrentPage(nextTotalPages);
    }
  }, [currentPage, fetchSkinTreatPage, queryClient, skinTreatQueryKey]);

  function handleTabChange(tab: TabId) {
    setActiveTab(tab);
    setSearchQuery("");
    setDebouncedSearchQuery("");
    applyDebouncedSearch.cancel();
    setCurrentPage(1);
  }

  function handleSortChange(direction: SortDirection) {
    setSortDirection(direction);
    setCurrentPage(1);
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    applyDebouncedSearch(value);
  }

  function handleRefresh() {
    void syncPaginationWithBackend();
  }

  function openItemDetails(
    category: SkinTreatCategory,
    item: SkinTreatListItem,
  ) {
    if (deletingItemId === item.id) {
      return;
    }

    setSelectedItem({ category, item });
  }

  function handleItemSaved(
    updatedItem: DashboardEditableItem,
    category: SkinTreatCategory,
  ) {
    if (!selectedItem) return;
    setSelectedItem((previous) =>
      previous ? { ...previous, category, item: updatedItem } : previous,
    );
    void queryClient.invalidateQueries({ queryKey: SKIN_TREAT_QUERY_KEY });
    void syncPaginationWithBackend();
  }

  function handleItemDeleteStart(item: DashboardEditableItem) {
    setDeletingItemId(item.id);
  }

  function handleItemDeleteError(item: DashboardEditableItem) {
    setDeletingItemId((currentId) =>
      currentId === item.id ? null : currentId,
    );
  }

  function handleItemDeleted(item: DashboardEditableItem) {
    setDeletingItemId((currentId) =>
      currentId === item.id ? null : currentId,
    );
    setSelectedItem((previous) =>
      previous?.item.id === item.id ? null : previous,
    );
    void queryClient.invalidateQueries({ queryKey: SKIN_TREAT_QUERY_KEY });
    void syncPaginationWithBackend();
  }

  function handleSkinTreatAdded() {
    setIsAddSheetOpen(false);
    void queryClient.invalidateQueries({ queryKey: SKIN_TREAT_QUERY_KEY });
  }

  function handleItemDialogClose() {
    if (!deletingItemId) {
      setSelectedItem(null);
    }
  }

  return {
    activeTab,
    copy: TAB_CONTENT_COPY[activeTab],
    currentPage,
    deletingItemId,
    fetchSkinTreatPage,
    handleItemDeleteError,
    handleItemDeleteStart,
    handleItemDeleted,
    handleItemDialogClose,
    handleItemSaved,
    handleRefresh,
    handleSearchChange,
    handleSkinTreatAdded,
    handleSortChange,
    handleTabChange,
    isAddSheetOpen,
    openItemDetails,
    searchQuery,
    selectedItem,
    selectedTabCategory: SKIN_TREAT_CATEGORY_BY_TAB[activeTab],
    setCurrentPage,
    setIsAddSheetOpen,
    skinTreatPageQuery,
    skinTreatQueryKey,
    skinTreatSelect,
    sortDirection,
    totalPages,
  };
}
