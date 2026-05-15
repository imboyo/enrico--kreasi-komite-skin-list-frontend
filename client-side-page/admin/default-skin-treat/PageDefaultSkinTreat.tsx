"use client";

import { Icon } from "@iconify/react";
import { SkinCareAdminCard } from "@/components/atomic/organism/SkinCareAdminCard";
import { AdminDefaultSkinTreatTabNavigation } from "@/components/atomic/organism/AdminDefaultSkinTreatTabNavigation";
import { MobilePagination } from "@/components/atomic/molecule/MobilePagination";
import { QueryStateHandler } from "@/components/atomic/molecule/QueryStateHandler";
import { SkinCareAdminCardSkeleton } from "@/components/atomic/molecule/SkinCareAdminCardSkeleton";

import { ItemActions } from "./item-actions/ItemActions";
import { AdminDefaultSkinTreatToolbar } from "./toolbar/AdminDefaultSkinTreatToolbar";
import { useAdminDefaultSkinTreatList } from "./utils/useAdminDefaultSkinTreatList";
import type { AdminDefaultSkinTreatCategoryId } from "./utils/defaultSkinTreatCategory";

interface PageDefaultSkinTreatProps {
  activeCategory: AdminDefaultSkinTreatCategoryId;
}

export function PageDefaultSkinTreat({
  activeCategory,
}: Readonly<PageDefaultSkinTreatProps>) {
  const {
    activeCategoryConfig,
    activeItems,
    adminDefaultSkinTreatListQuery,
    currentPage,
    searchValue,
    sortValue,
    totalPages,
    handlePageChange,
    handleReset,
    handleSearchChange,
    handleSortChange,
  } = useAdminDefaultSkinTreatList(activeCategory);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
      {/* Section: Skin care category tabs */}
      <AdminDefaultSkinTreatTabNavigation activeTabId={activeCategory} />

      <div className="flex flex-col gap-4 w-full">
        {/* Section: Toolbar with search, sort, and add actions */}
        <AdminDefaultSkinTreatToolbar
          activeCategory={activeCategory}
          activeCategoryConfig={activeCategoryConfig}
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          sortValue={sortValue}
          onSortChange={handleSortChange}
          onReset={handleReset}
        />

        <QueryStateHandler
          query={adminDefaultSkinTreatListQuery}
          skeleton={<SkinCareAdminCardSkeleton />}
          isEmpty={activeItems.length === 0}
          errorTitle={activeCategoryConfig.errorTitle}
          emptyTitle={activeCategoryConfig.emptyTitle}
          emptyDescription={activeCategoryConfig.emptyDescription}
        >
          {/* Section: Active skin category card list */}
          <div className="flex flex-col gap-3">
            {activeItems.map((item) => (
              <SkinCareAdminCard
                key={item.uuid}
                item={item}
                icon={
                  <Icon icon={activeCategoryConfig.icon} className="size-6" />
                }
                actions={<ItemActions item={item} />}
              />
            ))}
          </div>
        </QueryStateHandler>

        <MobilePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
