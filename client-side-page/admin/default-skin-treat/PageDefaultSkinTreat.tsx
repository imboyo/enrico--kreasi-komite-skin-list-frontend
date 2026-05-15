"use client";

import { Icon } from "@iconify/react";
import { SkinCareAdminCard } from "@/components/atomic/organism/SkinCareAdminCard";
import { AdminDefaultSkinTreatTabNavigation } from "@/components/atomic/organism/AdminDefaultSkinTreatTabNavigation";
import { MobilePagination } from "@/components/atomic/molecule/MobilePagination";
import { QueryStateHandler } from "@/components/atomic/molecule/QueryStateHandler";
import { SkinCareAdminCardSkeleton } from "@/components/atomic/molecule/SkinCareAdminCardSkeleton";

import { ItemActions } from "./item-actions/ItemActions";
import { AdminDefaultSkinTreatToolbar } from "./toolbar/AdminDefaultSkinTreatToolbar";
import { usePageLevelStore } from "./page-level.store";
import {
  getAdminDefaultSkinTreatCategoryConfig,
  type AdminDefaultSkinTreatCategoryId,
} from "./utils/defaultSkinTreatCategory";

interface PageDefaultSkinTreatProps {
  activeCategory: AdminDefaultSkinTreatCategoryId;
}

export function PageDefaultSkinTreat({
  activeCategory,
}: Readonly<PageDefaultSkinTreatProps>) {
  const activeCategoryConfig =
    getAdminDefaultSkinTreatCategoryConfig(activeCategory);

  const adminDefaultSkinTreatListQuery = usePageLevelStore(
    (state) => state.adminDefaultSkinTreatListQuery,
  );

  const currentPage = usePageLevelStore((state) => state.currentPage);
  const totalPages = usePageLevelStore((state) => state.totalPages);
  const setPage = usePageLevelStore((state) => state.setPage);

  const activeItems = adminDefaultSkinTreatListQuery.data?.data ?? [];

  function handlePageChange(page: number) {
    setPage(activeCategory, page, totalPages);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
      {/* Section: Default skin treat category navigation */}
      <AdminDefaultSkinTreatTabNavigation />

      <div className="flex flex-col gap-4 w-full">
        <AdminDefaultSkinTreatToolbar />

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
