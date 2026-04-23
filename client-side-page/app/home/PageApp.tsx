"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useQueryClient } from "@tanstack/react-query";

import { Tabs } from "@/components/atomic/molecule/Tabs";
import {
  DashboardList,
  type DashboardListItem,
} from "@/components/atomic/organism/DashboardList";
import { ItemDialog } from "@/client-side-page/app/home/item-dialog/ItemDialog";
import { getUserRoutines } from "@/mock-backend/user/dashboard/get-routines";
import { getUserColors } from "@/mock-backend/user/dashboard/get-colors";
import { getUserMakeUps } from "@/mock-backend/user/dashboard/get-make-ups";
import { getUserBarriers } from "@/mock-backend/user/dashboard/get-barriers";
import { getUserScars } from "@/mock-backend/user/dashboard/get-scars";
import type {
  DashboardEditableItem,
  DashboardItemCategory,
} from "@/mock-backend/user/dashboard/item-store";

type TabId = "routines" | "colors" | "make-ups" | "barriers" | "scars";

type SelectedDashboardItem = {
  category: DashboardItemCategory;
  queryKey: string[];
  item: DashboardEditableItem;
};

const TABS = [
  { id: "routines", label: "Routines" },
  { id: "colors", label: "Colors" },
  { id: "make-ups", label: "Make Up" },
  { id: "barriers", label: "Barriers" },
  { id: "scars", label: "Scars" },
] as const;

export function PageApp() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<TabId>("routines");
  const [selectedItem, setSelectedItem] = useState<SelectedDashboardItem | null>(null);

  function openItemDetails(
    category: DashboardItemCategory,
    queryKey: string[],
    item: DashboardListItem,
  ) {
    setSelectedItem({
      category,
      queryKey,
      item,
    });
  }

  function handleItemSaved(updatedItem: DashboardEditableItem) {
    if (!selectedItem) {
      return;
    }

    setSelectedItem((previous) =>
      previous
        ? {
            ...previous,
            item: updatedItem,
          }
        : previous,
    );

    void queryClient.invalidateQueries({ queryKey: selectedItem.queryKey });
  }

  const renderContent = () => {
    switch (activeTab) {
      case "routines":
        return (
          <DashboardList
            key="routines"
            queryKey={["user-dashboard-routines"]}
            queryFn={() => getUserRoutines()}
            errorTitle="Routine list is unavailable."
            emptyTitle="No routines available yet."
            emptyDescription="Add your routine data or retry the request to load this checklist again."
            onItemClick={(item) =>
              openItemDetails("routines", ["user-dashboard-routines"], item)
            }
          />
        );
      case "colors":
        return (
          <DashboardList
            key="colors"
            queryKey={["user-dashboard-colors"]}
            queryFn={() => getUserColors()}
            errorTitle="Color list is unavailable."
            emptyTitle="No colors available yet."
            emptyDescription="Add your color data to load this checklist again."
            onItemClick={(item) =>
              openItemDetails("colors", ["user-dashboard-colors"], item)
            }
          />
        );
      case "make-ups":
        return (
          <DashboardList
            key="make-ups"
            queryKey={["user-dashboard-make-ups"]}
            queryFn={() => getUserMakeUps()}
            errorTitle="Make up list is unavailable."
            emptyTitle="No make ups available yet."
            emptyDescription="Add your make up data to load this checklist again."
            onItemClick={(item) =>
              openItemDetails("make-ups", ["user-dashboard-make-ups"], item)
            }
          />
        );
      case "barriers":
        return (
          <DashboardList
            key="barriers"
            queryKey={["user-dashboard-barriers"]}
            queryFn={() => getUserBarriers()}
            errorTitle="Barrier list is unavailable."
            emptyTitle="No barriers available yet."
            emptyDescription="Add your barrier data to load this checklist again."
            onItemClick={(item) =>
              openItemDetails("barriers", ["user-dashboard-barriers"], item)
            }
          />
        );
      case "scars":
        return (
          <DashboardList
            key="scars"
            queryKey={["user-dashboard-scars"]}
            queryFn={() => getUserScars()}
            errorTitle="Scar list is unavailable."
            emptyTitle="No scars available yet."
            emptyDescription="Add your scar data to load this checklist again."
            onItemClick={(item) =>
              openItemDetails("scars", ["user-dashboard-scars"], item)
            }
          />
        );
      default:
        return null;
    }
  };

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
              {renderContent()}
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
      />
    </motion.main>
  );
}
