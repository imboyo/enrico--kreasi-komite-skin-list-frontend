"use client";

import { Icon } from "@iconify/react";
import { SkinCareAdminCard } from "@/components/atomic/organism/SkinCareAdminCard";
import { MobilePagination } from "@/components/atomic/molecule/MobilePagination";
import { QueryStateHandler } from "@/components/atomic/molecule/QueryStateHandler";
import { SkinCareAdminCardSkeleton } from "@/components/atomic/molecule/SkinCareAdminCardSkeleton";

import { ItemActions } from "./item-actions/ItemActions";
import { AdminUserSkinTreatToolbar } from "./toolbar/AdminUserSkinTreatToolbar";
import { AdminUserSkinTreatTabNavigation } from "./tab-navigation/AdminUserSkinTreatTabNavigation";
import { useAdminUserSkinTreatList } from "./utils/useAdminUserSkinTreatList";
import type { AdminUserSkinTreatCategoryId } from "./utils/adminUserSkinTreatCategory";

interface PageUserSkinTreatProps {
  userUuid: string;
  activeCategory: AdminUserSkinTreatCategoryId;
}

export function PageUserSkinTreat({
  userUuid,
  activeCategory,
}: Readonly<PageUserSkinTreatProps>) {
  const {
    activeCategoryConfig,
    activeItems,
    adminUserSkinTreatListQuery,
    currentPage,
    searchValue,
    sortValue,
    totalPages,
    handlePageChange,
    handleSearchChange,
    handleSortChange,
  } = useAdminUserSkinTreatList(activeCategory, userUuid);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
      {/* Section: Skin care category tabs */}
      <AdminUserSkinTreatTabNavigation
        userUuid={userUuid}
        activeTabId={activeCategory}
      />

      <div className="flex flex-col gap-4 w-full">
        {/* Section: Toolbar with search and sort (read-only, no add button) */}
        <AdminUserSkinTreatToolbar
          activeCategoryConfig={activeCategoryConfig}
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          sortValue={sortValue}
          onSortChange={handleSortChange}
        />

        <QueryStateHandler
          query={adminUserSkinTreatListQuery}
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
