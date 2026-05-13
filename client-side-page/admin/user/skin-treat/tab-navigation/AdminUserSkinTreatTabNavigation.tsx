"use client";

import { useRouter } from "next/navigation";

import { SkinTreatTabNavigation } from "components/atomic/organism/SkinTreatTabNavigation";

import {
  ADMIN_USER_SKIN_TREAT_TAB_OPTIONS,
  getAdminUserSkinTreatCategoryHref,
  type AdminUserSkinTreatCategoryId,
} from "../utils/adminUserSkinTreatCategory";

interface AdminUserSkinTreatTabNavigationProps {
  userUuid: string;
  activeTabId: AdminUserSkinTreatCategoryId;
}

export function AdminUserSkinTreatTabNavigation({
  userUuid,
  activeTabId,
}: Readonly<AdminUserSkinTreatTabNavigationProps>) {
  const router = useRouter();

  function handleTabChange(tabId: AdminUserSkinTreatCategoryId) {
    // Stay on one page and switch category through the query string so the
    // shared React Query cache remains warm across tab changes.
    if (tabId === activeTabId) {
      return;
    }

    router.push(getAdminUserSkinTreatCategoryHref(userUuid, tabId));
  }

  return (
    <SkinTreatTabNavigation
      activeTabId={activeTabId}
      options={ADMIN_USER_SKIN_TREAT_TAB_OPTIONS}
      onChange={handleTabChange}
      selectId="admin-user-skin-treat-category-select"
      layoutId="admin-user-skin-treat-tabs"
    />
  );
}
