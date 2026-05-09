"use client";

import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import debounce from "lodash/debounce";

import { Tabs } from "@/components/atomic/molecule/Tabs";
import { MobilePagination } from "@/components/atomic/molecule/MobilePagination";
import {
  SkinTreatList,
  type SkinTreatListItem,
} from "@/components/domain/user/skin-treat-list";
import { SectionToolbar } from "@/components/atomic/organism/SectionToolbar";
import { ItemDialog } from "@/client-side-page/app/home/item-dialog/ItemDialog";
import { AddSkinTreatSheet } from "@/client-side-page/app/home/add-skin-treat-sheet/AddSkinTreatSheet";
import type {
  DashboardEditableItem,
  DashboardItemCategory,
} from "@/mock-backend/user/dashboard/item-store";

import {
  TABS,
  SKIN_TREAT_QUERY_KEY,
  SKIN_TREAT_CACHE_MS,
  SKIN_TREAT_CATEGORY_BY_TAB,
  TAB_CONTENT_COPY,
  type TabId,
} from "./page-app.constants";
import {
  selectSkinTreatPage,
  getUserSkinTreats,
  type SortDirection,
} from "./page-app.utils";
import { FloatingAddButton } from "@/components/atomic/atom/FloatingAddButton";

type SelectedDashboardItem = {
  category: DashboardItemCategory;
  item: DashboardEditableItem;
};

export function PageApp() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<TabId>("routines");
  const [selectedItem, setSelectedItem] =
    useState<SelectedDashboardItem | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // Separate state so the query key only changes after the debounce delay, preventing rapid re-fetches on every keystroke.
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

  // Cancel pending debounce on unmount to avoid state updates on an unmounted component.
  useEffect(() => () => applyDebouncedSearch.cancel(), [applyDebouncedSearch]);

  const skinTreatQueryKey = [
    ...SKIN_TREAT_QUERY_KEY,
    activeTab,
    debouncedSearchQuery,
    currentPage,
    sortDirection,
  ] as const;

  const fetchSkinTreatPage = () =>
    getUserSkinTreats({
      tabId: activeTab,
      search: debouncedSearchQuery,
      page: currentPage,
      sortDirection,
    });

  // Deduped query (same key as DashboardList) - only used for pagination meta + isFetching.
  // React Query shares the cache so pagination controls do not add another backend request.
  const skinTreatPageQuery = useQuery({
    queryKey: skinTreatQueryKey,
    queryFn: fetchSkinTreatPage,
    staleTime: SKIN_TREAT_CACHE_MS,
    gcTime: SKIN_TREAT_CACHE_MS,
  });

  const totalPages = Math.max(
    1,
    skinTreatPageQuery.data?.meta.total_pages ?? 1,
  );

  async function syncPaginationWithBackend() {
    const nextPageResponse = await queryClient.fetchQuery({
      queryKey: skinTreatQueryKey,
      queryFn: fetchSkinTreatPage,
      staleTime: 0,
    });
    const nextTotalPages = Math.max(1, nextPageResponse.meta.total_pages ?? 1);

    // Keep pagination state aligned with the backend after mutations or manual refreshes.
    if (currentPage > nextTotalPages) {
      setCurrentPage(nextTotalPages);
    }
  }

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
    // Update the visible input immediately; the query key updates after debounce delay.
    setSearchQuery(value);
    applyDebouncedSearch(value);
  }

  function handleRefresh() {
    void syncPaginationWithBackend();
  }

  function openItemDetails(
    category: DashboardItemCategory,
    item: SkinTreatListItem,
  ) {
    // Ignore taps for the row currently being deleted so the dialog cannot
    // reopen while the backend is still processing removal.
    if (deletingItemId === item.id) {
      return;
    }

    setSelectedItem({ category, item });
  }

  function handleItemSaved(updatedItem: DashboardEditableItem) {
    if (!selectedItem) return;
    setSelectedItem((previous) =>
      previous ? { ...previous, item: updatedItem } : previous,
    );
    void queryClient.invalidateQueries({ queryKey: SKIN_TREAT_QUERY_KEY });
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

  const copy = TAB_CONTENT_COPY[activeTab];

  return (
    <motion.main
      className="mx-auto flex w-full max-w-125 flex-col gap-6 px-4 py-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Dashboard content section */}
      <div className="flex flex-col gap-4">
        {/* Tabs section */}
        <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:overflow-visible sm:px-0 sm:mx-0 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Tabs<TabId>
            options={[...TABS]}
            activeId={activeTab}
            onChange={handleTabChange}
            className="w-max min-w-full sm:w-full"
          />
        </div>

        {/* Toolbar section - search, sort, and refresh */}
        <SectionToolbar
          searchValue={searchQuery}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Cari item..."
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
          onRefresh={handleRefresh}
          isRefreshing={skinTreatPageQuery.isFetching}
        />

        {/* Top pagination section */}
        {totalPages > 1 && (
          <MobilePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* Tab panel section */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <SkinTreatList
                key={`${activeTab}-${searchQuery}-${currentPage}-${sortDirection}`}
                queryKey={skinTreatQueryKey}
                queryFn={fetchSkinTreatPage}
                select={selectSkinTreatPage()}
                staleTime={SKIN_TREAT_CACHE_MS}
                gcTime={SKIN_TREAT_CACHE_MS}
                errorTitle={copy.errorTitle}
                emptyTitle={copy.emptyTitle}
                emptyDescription={copy.emptyDescription}
                deletingItemId={deletingItemId}
                onItemClick={(item) => openItemDetails(activeTab, item)}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom pagination section */}
        {totalPages > 1 && (
          <MobilePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* Item detail dialog section — controlled by this page */}
      <ItemDialog
        item={selectedItem?.item ?? null}
        category={selectedItem?.category ?? null}
        isDeleting={selectedItem?.item.id === deletingItemId}
        onClose={() => {
          if (!deletingItemId) {
            setSelectedItem(null);
          }
        }}
        onSave={handleItemSaved}
        onDeleteStart={handleItemDeleteStart}
        onDelete={handleItemDeleted}
        onDeleteError={handleItemDeleteError}
      />

      <FloatingAddButton onClick={() => setIsAddSheetOpen(true)} />

      <AddSkinTreatSheet
        open={isAddSheetOpen}
        category={SKIN_TREAT_CATEGORY_BY_TAB[activeTab]}
        onClose={() => setIsAddSheetOpen(false)}
        onSuccess={handleSkinTreatAdded}
      />
    </motion.main>
  );
}
