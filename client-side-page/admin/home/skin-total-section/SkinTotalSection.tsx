"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { QueryStateHandler } from "@/components/atomic/molecule/QueryStateHandler";
import { Tabs } from "@/components/atomic/molecule/Tabs";
import { getSkinCareCategorySummary } from "@/backend-service/admin/analytic/skin-care-category-summary.service";
import type { CategorySummaryItem } from "@/backend-service/admin/analytic/types";

import { LoadingState } from "./LoadingState";
import { SkinTotalCard, type SkinTotalCardData } from "./SkinTotalCard";

type TimeTab = "last_30_days" | "last_7_days" | "last_24_hours";

const TIME_TAB_OPTIONS = [
  { id: "last_30_days" as TimeTab, label: "30 Hari" },
  { id: "last_7_days" as TimeTab, label: "7 Hari" },
  { id: "last_24_hours" as TimeTab, label: "24 Jam" },
];

const CACHE_TIME_MS = 5 * 60 * 1000;

/**
 * Map backend category names to UI display config (label, icon, accent color).
 * Normalizes various naming conventions so the UI stays resilient.
 */
function getCategoryConfig(
  category: string,
): Omit<SkinTotalCardData, "key" | "total"> {
  const normalized = category.toLowerCase().replace(/[_\s-]/g, "");

  switch (normalized) {
    case "routine":
    case "routines":
      return {
        label: "Routine",
        icon: "mdi:calendar-check-outline",
        accentClassName: "bg-primary/10 text-primary",
      };
    case "barrier":
    case "barriers":
      return {
        label: "Barrier",
        icon: "mdi:shield-half-full",
        accentClassName: "bg-emerald-500/10 text-emerald-600",
      };
    case "color":
    case "colors":
      return {
        label: "Colors",
        icon: "mdi:palette-outline",
        accentClassName: "bg-sky-500/10 text-sky-600",
      };
    case "scar":
    case "scars":
      return {
        label: "Scars",
        icon: "mdi:bandage",
        accentClassName: "bg-rose-500/10 text-rose-600",
      };
    case "makeup":
    case "make_up":
    case "make-up":
      return {
        label: "Make Up",
        icon: "mdi:face-woman-shimmer",
        accentClassName: "bg-purple-500/10 text-purple-600",
      };
    default:
      return {
        label: category,
        icon: "mdi:folder-outline",
        accentClassName: "bg-gray-500/10 text-gray-600",
      };
  }
}

/**
 * Transform API category items into card data for the active time tab.
 * The backend returns all three time windows in one payload, so we simply
 * pick the field that matches the selected tab.
 */
function mapCategoriesToCards(
  categories: CategorySummaryItem[],
  timeTab: TimeTab,
): SkinTotalCardData[] {
  return categories.map((item) => ({
    key: item.category,
    total: item[timeTab],
    ...getCategoryConfig(item.category),
  }));
}

export function SkinTotalSection() {
  const [activeTab, setActiveTab] = useState<TimeTab>("last_30_days");

  // Single query fetches every time window at once. staleTime + gcTime keep
  // the payload cached so switching tabs (or revisiting the page quickly)
  // does not trigger redundant network requests.
  const skinTotalsQuery = useQuery({
    queryKey: ["admin-skin-care-category-summary"],
    queryFn: async () => {
      return await getSkinCareCategorySummary();
    },
    staleTime: CACHE_TIME_MS,
    gcTime: CACHE_TIME_MS,
  });

  const skinTotalCards = mapCategoriesToCards(
    skinTotalsQuery.data?.data.categories ?? [],
    activeTab,
  );

  return (
    <>
      {/* Section: Skins total overview */}
      <section className="flex flex-col gap-4">
        {/* Section: Time filter tabs */}
        <Tabs<TimeTab>
          options={TIME_TAB_OPTIONS}
          activeId={activeTab}
          onChange={setActiveTab}
          layoutId="skin-total-time-tabs"
        />

        {/* Section: Skin total cards */}
        <QueryStateHandler
          query={skinTotalsQuery}
          skeleton={<LoadingState />}
          isEmpty={skinTotalCards.length === 0}
          errorTitle="Failed to load skin totals."
          emptyTitle="No skin totals available."
          emptyDescription="The dashboard does not have any skin data yet."
        >
          <div className="grid grid-cols-2 gap-3">
            {skinTotalCards.map((card) => (
              <SkinTotalCard key={card.key} card={card} />
            ))}
          </div>
        </QueryStateHandler>
      </section>
    </>
  );
}
