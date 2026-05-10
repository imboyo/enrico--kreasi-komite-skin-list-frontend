"use client";

import { Icon } from "@iconify/react";
import { SkinCareAdminCard } from "@/components/atomic/organism/SkinCareAdminCard";
import { AdminSkinTabNavigation } from "@/components/atomic/organism/AdminSkinTabNavigation";
import { MobilePagination } from "@/components/atomic/molecule/MobilePagination";
import { QueryStateHandler } from "@/components/atomic/molecule/QueryStateHandler";
import { SkinCareAdminCardSkeleton } from "@/components/atomic/molecule/SkinCareAdminCardSkeleton";

import { AdminSkinToolbar } from "./toolbar/AdminSkinToolbar";
import { ItemActions } from "./item-actions/ItemActions";
import { useAdminSkinList } from "./utils/useAdminSkinList";
import type { AdminSkinCategoryId } from "./utils/skinCategory";

interface PageAdminSkinsProps {
  activeCategory: AdminSkinCategoryId;
}

export function PageAdminSkins({
  activeCategory,
}: Readonly<PageAdminSkinsProps>) {
  const {
    activeCategoryConfig,
    activeItems,
    adminSkinListQuery,
    currentPage,
    searchValue,
    sortValue,
    totalPages,
    handlePageChange,
    handleSearchChange,
    handleSortChange,
  } = useAdminSkinList(activeCategory);

  return (
    <div className="flex flex-col gap-4">
      {/* Section: Skin care category tabs */}
      <AdminSkinTabNavigation activeTabId={activeCategory} />

      {/* Section: Toolbar with search, sort and add new skin care */}
      <AdminSkinToolbar
        activeCategory={activeCategory}
        activeCategoryConfig={activeCategoryConfig}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        sortValue={sortValue}
        onSortChange={handleSortChange}
      />

      <QueryStateHandler
        query={adminSkinListQuery}
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
              actions={
                <ItemActions
                  item={item}
                  actions={activeCategoryConfig.actions}
                />
              }
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
  );
}
