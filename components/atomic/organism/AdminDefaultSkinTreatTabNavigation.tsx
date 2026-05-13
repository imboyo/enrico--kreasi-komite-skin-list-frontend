"use client";

import { useRouter } from "next/navigation";

import {
  ADMIN_DEFAULT_SKIN_TREAT_TAB_OPTIONS,
  getAdminDefaultSkinTreatCategoryHref,
  type AdminDefaultSkinTreatCategoryId,
} from "@/client-side-page/admin/default-skin-treat/utils/defaultSkinTreatCategory";
import { Tabs } from "components/atomic/molecule/Tabs";

interface AdminDefaultSkinTreatTabNavigationProps {
  activeTabId: AdminDefaultSkinTreatCategoryId;
}

export function AdminDefaultSkinTreatTabNavigation({
  activeTabId,
}: Readonly<AdminDefaultSkinTreatTabNavigationProps>) {
  const router = useRouter();

  function handleTabChange(tabId: AdminDefaultSkinTreatCategoryId) {
    // Stay on one page and switch category through the query string so the
    // shared React Query cache remains warm across tab changes.
    if (tabId === activeTabId) {
      return;
    }

    router.push(getAdminDefaultSkinTreatCategoryHref(tabId));
  }

  return (
    <Tabs
      options={ADMIN_DEFAULT_SKIN_TREAT_TAB_OPTIONS}
      activeId={activeTabId}
      onChange={handleTabChange}
      orientation="horizontal"
      className="overflow-x-auto"
      tabClassName="min-w-fit whitespace-nowrap px-4"
      layoutId="admin-default-skin-treat-tabs"
    />
  );
}
