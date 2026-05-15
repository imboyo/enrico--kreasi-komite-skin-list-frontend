"use client";

import { useRouter } from "next/navigation";

import { SkinTreatTabNavigation } from "components/atomic/organism/SkinTreatTabNavigation";

import {
  ADMIN_DEFAULT_SKIN_TREAT_TAB_OPTIONS,
  getAdminDefaultSkinTreatCategoryHref,
  type AdminDefaultSkinTreatCategoryId,
} from "@/client-side-page/admin/default-skin-treat/utils/defaultSkinTreatCategory";
import { usePageLevelStore } from "@/client-side-page/admin/default-skin-treat/page-level.store";

export function AdminDefaultSkinTreatTabNavigation() {
  const router = useRouter();
  const activeTabId = usePageLevelStore((state) => state.activeCategory);

  function handleTabChange(tabId: AdminDefaultSkinTreatCategoryId) {
    if (tabId === activeTabId) {
      return;
    }

    router.push(getAdminDefaultSkinTreatCategoryHref(tabId));
  }

  return (
    <SkinTreatTabNavigation
      activeTabId={activeTabId}
      options={ADMIN_DEFAULT_SKIN_TREAT_TAB_OPTIONS}
      onChange={handleTabChange}
      selectId="admin-default-skin-treat-category-select"
      layoutId="admin-default-skin-treat-tabs"
    />
  );
}
