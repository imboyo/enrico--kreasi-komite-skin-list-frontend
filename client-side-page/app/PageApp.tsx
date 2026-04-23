"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { Tabs } from "@/components/atomic/molecule/Tabs";
import { DashboardList } from "@/client-side-page/app/DashboardList";
import { getUserRoutines } from "@/mock-backend/user/dashboard/get-routines";
import { getUserColors } from "@/mock-backend/user/dashboard/get-colors";
import { getUserMakeUps } from "@/mock-backend/user/dashboard/get-make-ups";
import { getUserBarriers } from "@/mock-backend/user/dashboard/get-barriers";
import { getUserScars } from "@/mock-backend/user/dashboard/get-scars";

type TabId = "routines" | "colors" | "make-ups" | "barriers" | "scars";

const TABS = [
  { id: "routines", label: "Routines" },
  { id: "colors", label: "Colors" },
  { id: "make-ups", label: "Make Up" },
  { id: "barriers", label: "Barriers" },
  { id: "scars", label: "Scars" },
] as const;

export function PageApp() {
  const [activeTab, setActiveTab] = useState<TabId>("routines");

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
    </motion.main>
  );
}
