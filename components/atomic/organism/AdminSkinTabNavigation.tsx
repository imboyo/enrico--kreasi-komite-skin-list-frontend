"use client";

import { useRouter } from "next/navigation";

import {
  ADMIN_SKIN_TAB_OPTIONS,
  getAdminSkinCategoryHref,
  type AdminSkinCategoryId,
} from "@/client-side-page/admin/skins/utils/skinCategory";
import { Tabs } from "components/atomic/molecule/Tabs";

interface AdminSkinTabNavigationProps {
  activeTabId: AdminSkinCategoryId;
}

export function AdminSkinTabNavigation({
  activeTabId,
}: Readonly<AdminSkinTabNavigationProps>) {
  const router = useRouter();

  function handleTabChange(tabId: AdminSkinCategoryId) {
    // Stay on one page and switch category through the query string so the
    // shared React Query cache remains warm across tab changes.
    if (tabId === activeTabId) {
      return;
    }

    router.push(getAdminSkinCategoryHref(tabId));
  }

  return (
    <Tabs
      options={ADMIN_SKIN_TAB_OPTIONS}
      activeId={activeTabId}
      onChange={handleTabChange}
      orientation="horizontal"
      className="overflow-x-auto"
      tabClassName="min-w-fit whitespace-nowrap px-4"
      layoutId="admin-skins-tabs"
    />
  );
}
