"use client";

import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import debounce from "lodash/debounce";

import { Tabs } from "@/components/atomic/molecule/Tabs";
import {
  DashboardList,
  type DashboardListItem,
} from "@/components/atomic/organism/dashboard-list";
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
import { selectSkinTreatPage, getUserSkinTreats } from "./page-app.utils";
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
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // Separate state so the query key only changes after the debounce delay, preventing rapid re-fetches on every keystroke.
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
  ] as const;

  const fetchSkinTreatPage = () =>
    getUserSkinTreats({
      tabId: activeTab,
      search: debouncedSearchQuery,
      page: currentPage,
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
    item: DashboardListItem,
  ) {
    setSelectedItem({ category, item });
  }

  function handleItemSaved(updatedItem: DashboardEditableItem) {
    if (!selectedItem) return;
    setSelectedItem((previous) =>
      previous ? { ...previous, item: updatedItem } : previous,
    );
    void queryClient.invalidateQueries({ queryKey: SKIN_TREAT_QUERY_KEY });
  }

  function handleItemDeleted() {
    if (!selectedItem) return;
    setSelectedItem(null);
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
        {/* Page header section */}
        <div className="flex flex-col gap-1">
          <h1 className="text-[40px] font-medium">Dashboard</h1>
          <h6 className="text-muted-foreground text-sm">
            &#34;Manage your personalized skin checklists.&#34;
          </h6>
        </div>

        {/* Tabs section */}
        <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:overflow-visible sm:px-0 sm:mx-0 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Tabs<TabId>
            options={[...TABS]}
            activeId={activeTab}
            onChange={handleTabChange}
            className="w-max min-w-full sm:w-full"
          />
        </div>

        {/* Toolbar section - search, refresh, pagination */}
        <SectionToolbar
          searchValue={searchQuery}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Search items..."
          onRefresh={handleRefresh}
          isRefreshing={skinTreatPageQuery.isFetching}
          pagination={{
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
          }}
        />

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
              <DashboardList
                key={`${activeTab}-${searchQuery}-${currentPage}`}
                queryKey={skinTreatQueryKey}
                queryFn={fetchSkinTreatPage}
                select={selectSkinTreatPage()}
                staleTime={SKIN_TREAT_CACHE_MS}
                gcTime={SKIN_TREAT_CACHE_MS}
                errorTitle={copy.errorTitle}
                emptyTitle={copy.emptyTitle}
                emptyDescription={copy.emptyDescription}
                onItemClick={(item) => openItemDetails(activeTab, item)}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Item detail dialog section — controlled by this page */}
      <ItemDialog
        item={selectedItem?.item ?? null}
        category={selectedItem?.category ?? null}
        onClose={() => setSelectedItem(null)}
        onSave={handleItemSaved}
        onDelete={handleItemDeleted}
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
