"use client";

import { usePathname, useRouter } from "next/navigation";

import { Tabs, type TabOption } from "components/atomic/molecule/Tabs";
import { APP_URL } from "constant";

type SkinsTabId = "routines" | "colors" | "scars" | "make-ups";

const SKINS_TABS: Array<TabOption<SkinsTabId> & { href: string }> = [
  {
    id: "routines",
    label: "Routines",
    href: `${APP_URL.ADMIN_CARE_SKIN_MANAGEMENT}/routines`,
  },
  {
    id: "colors",
    label: "Colors",
    href: `${APP_URL.ADMIN_CARE_SKIN_MANAGEMENT}/colors`,
  },
  {
    id: "scars",
    label: "Scars",
    href: `${APP_URL.ADMIN_CARE_SKIN_MANAGEMENT}/scars`,
  },
  {
    id: "make-ups",
    label: "Make Ups",
    href: `${APP_URL.ADMIN_CARE_SKIN_MANAGEMENT}/make-ups`,
  },
];

function getActiveTabId(pathname: string): SkinsTabId {
  const activeTab = SKINS_TABS.find((tab) => {
    return pathname.startsWith(tab.href);
  });

  return activeTab?.id ?? "routines";
}

export function AdminSkinTabNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const activeTabId = getActiveTabId(pathname);

  function handleTabChange(tabId: SkinsTabId) {
    const nextTab = SKINS_TABS.find((tab) => tab.id === tabId);

    if (!nextTab || nextTab.href === pathname) {
      return;
    }

    router.push(nextTab.href);
  }

  return (
    <Tabs
      options={SKINS_TABS}
      activeId={activeTabId}
      onChange={handleTabChange}
      className="overflow-x-auto"
      tabClassName="min-w-fit whitespace-nowrap px-4"
      layoutId="admin-skins-tabs"
    />
  );
}
