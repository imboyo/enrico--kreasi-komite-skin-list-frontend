"use client";

import { useRouter } from "next/navigation";

import { Select } from "components/atomic/atom/Select";
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
    <div className="w-full lg:w-64 lg:shrink-0">
      <div className="lg:hidden">
        <Select
          id="admin-default-skin-treat-category-select"
          value={activeTabId}
          onChange={(event) =>
            handleTabChange(event.target.value as AdminDefaultSkinTreatCategoryId)
          }
          options={ADMIN_DEFAULT_SKIN_TREAT_TAB_OPTIONS.map((option) => ({
            value: option.id,
            label: option.label,
          }))}
          surface="transparent"
        />
      </div>

      <div className="hidden lg:block">
        <Tabs
          options={ADMIN_DEFAULT_SKIN_TREAT_TAB_OPTIONS}
          activeId={activeTabId}
          onChange={handleTabChange}
          className="w-full lg:flex lg:flex-col"
          layoutId="admin-default-skin-treat-tabs"
        />
      </div>
    </div>
  );
}
