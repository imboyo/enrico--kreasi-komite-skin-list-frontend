"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useQueryClient } from "@tanstack/react-query";

import { Tabs } from "@/components/atomic/molecule/Tabs";
import {
  DashboardList,
  type DashboardListItem,
} from "@/components/atomic/organism/dashboard-list";
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
import { selectSkinTreatByTab, getUserSkinTreats } from "./page-app.utils";
import { FloatingAddButton } from "@/components/atomic/atom/FloatingAddButton";

type SelectedDashboardItem = {
  category: DashboardItemCategory;
  queryKey: readonly unknown[];
  item: DashboardEditableItem;
};

export function PageApp() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<TabId>("routines");
  const [selectedItem, setSelectedItem] =
    useState<SelectedDashboardItem | null>(null);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);

  function openItemDetails(
    category: DashboardItemCategory,
    queryKey: readonly unknown[],
    item: DashboardListItem,
  ) {
    setSelectedItem({ category, queryKey, item });
  }

  function handleItemSaved(updatedItem: DashboardEditableItem) {
    if (!selectedItem) return;
    setSelectedItem((previous) =>
      previous ? { ...previous, item: updatedItem } : previous,
    );
    void queryClient.invalidateQueries({ queryKey: selectedItem.queryKey });
  }

  function handleItemDeleted() {
    if (!selectedItem) return;
    const { queryKey } = selectedItem;
    setSelectedItem(null);
    void queryClient.invalidateQueries({ queryKey });
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
            onChange={setActiveTab}
            className="w-max min-w-full sm:w-full"
          />
        </div>

        {/* Tab panel section */}
        <div className="mt-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <DashboardList
                key={activeTab}
                queryKey={SKIN_TREAT_QUERY_KEY}
                queryFn={getUserSkinTreats}
                select={selectSkinTreatByTab(activeTab)}
                staleTime={SKIN_TREAT_CACHE_MS}
                gcTime={SKIN_TREAT_CACHE_MS}
                errorTitle={copy.errorTitle}
                emptyTitle={copy.emptyTitle}
                emptyDescription={copy.emptyDescription}
                onItemClick={(item) =>
                  openItemDetails(activeTab, SKIN_TREAT_QUERY_KEY, item)
                }
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

      {/* Floating action button */}
      <FloatingAddButton onClick={() => setIsAddSheetOpen(true)} />

      {/* Add skin treat sheet — opened by the FAB */}
      <AddSkinTreatSheet
        open={isAddSheetOpen}
        category={SKIN_TREAT_CATEGORY_BY_TAB[activeTab]}
        onClose={() => setIsAddSheetOpen(false)}
        onSuccess={handleSkinTreatAdded}
      />
    </motion.main>
  );
}
