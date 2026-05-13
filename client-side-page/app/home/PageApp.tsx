"use client";

import { AnimatePresence, motion } from "motion/react";

import { MobilePagination } from "@/components/atomic/molecule/MobilePagination";
import { SkinTreatList } from "client-side-page/app/home/skin-treat-list/index";
import { SectionToolbar } from "@/components/atomic/organism/SectionToolbar";
import { ItemDialog } from "@/client-side-page/app/home/item-dialog/ItemDialog";
import { AddSkinTreatSheet } from "@/client-side-page/app/home/add-skin-treat-sheet/AddSkinTreatSheet";
import { FloatingAddButton } from "@/components/atomic/atom/FloatingAddButton";
import { SkinTreatTabNavigation } from "@/components/atomic/organism/SkinTreatTabNavigation";
import { mapSkinTreatLabel } from "libs/util/mapSkinTreatLabel";

import { TABS, SKIN_TREAT_CACHE_MS } from "./page-app.constants";
import { usePageApp } from "./util/usePageApp";

export function PageApp() {
  const {
    activeTab,
    copy,
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
    selectedTabCategory,
    setCurrentPage,
    setIsAddSheetOpen,
    skinTreatPageQuery,
    skinTreatQueryKey,
    skinTreatSelect,
    sortDirection,
    totalPages,
  } = usePageApp();

  return (
    <motion.main
      className="mx-auto flex w-full min-h-screen flex-col lg:flex-row gap-6 lg:gap-8 px-4 py-6 lg:py-8 lg:px-8 max-w-screen-2xl lg:max-w-none lg:pr-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Sidebar - Tabs section (vertical on desktop, horizontal on mobile) */}
      <SkinTreatTabNavigation
        activeTabId={activeTab}
        options={TABS}
        onChange={handleTabChange}
        selectId="category-select"
        className="lg:sticky lg:top-6 lg:self-start"
      />

      {/* Main content area */}
      <div className="flex-1 w-full lg:min-w-0">
        <div className="flex flex-col gap-6">
          {/* Toolbar section - search, sort, and refresh */}
          <div className="sticky top-0 z-10 backdrop-blur-sm -mx-4 px-4 lg:mx-0 lg:px-0 py-4 lg:py-0">
            <SectionToolbar
              searchValue={searchQuery}
              onSearchChange={handleSearchChange}
              searchPlaceholder={`Cari ${mapSkinTreatLabel(TABS.find((tab) => tab.id === activeTab)?.label ?? "item").toLowerCase()}...`}
              sortDirection={sortDirection}
              onSortChange={handleSortChange}
              onRefresh={handleRefresh}
              isRefreshing={skinTreatPageQuery.isFetching}
            />
          </div>

          {/* Top pagination section */}
          {totalPages > 1 && (
            <div className="flex justify-center lg:justify-start">
              <MobilePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <SkinTreatList
                key={`${activeTab}-${searchQuery}-${currentPage}-${sortDirection}`}
                queryKey={skinTreatQueryKey}
                queryFn={fetchSkinTreatPage}
                select={skinTreatSelect}
                staleTime={SKIN_TREAT_CACHE_MS}
                gcTime={SKIN_TREAT_CACHE_MS}
                errorTitle={copy.errorTitle}
                emptyTitle={copy.emptyTitle}
                emptyDescription={copy.emptyDescription}
                deletingItemId={deletingItemId}
                onItemClick={(item) =>
                  openItemDetails(selectedTabCategory, item)
                }
              />
            </motion.div>
          </AnimatePresence>

          {/* Bottom pagination section */}
          {totalPages > 1 && (
            <div className="flex justify-center lg:justify-start pb-6">
              <MobilePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>

      {/* Item detail dialog section — controlled by this page */}
      <ItemDialog
        item={selectedItem?.item ?? null}
        category={selectedItem?.category ?? null}
        isDeleting={selectedItem?.item.id === deletingItemId}
        onClose={handleItemDialogClose}
        onSave={handleItemSaved}
        onDeleteStart={handleItemDeleteStart}
        onDelete={handleItemDeleted}
        onDeleteError={handleItemDeleteError}
      />

      <FloatingAddButton onClick={() => setIsAddSheetOpen(true)} />

      <AddSkinTreatSheet
        open={isAddSheetOpen}
        category={selectedTabCategory}
        onClose={() => setIsAddSheetOpen(false)}
        onSuccess={handleSkinTreatAdded}
      />
    </motion.main>
  );
}
