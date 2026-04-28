"use client";

import { BaseSidebar } from "@/components/atomic/organism/sidebar/BaseSidebar";
import { LogoutConfirmDialog } from "@/components/atomic/molecule/LogoutConfirmDialog";
import { SidebarMenuList } from "@/components/atomic/molecule/sidebar/SidebarMenuList";
import type { SidebarMenuItemProps } from "@/components/atomic/molecule/sidebar/SidebarMenuItem";
import { APP_URL } from "@/constant";

const NAV_ITEMS: SidebarMenuItemProps[] = [
  {
    label: "Dashboard",
    href: APP_URL.ADMIN,
    icon: "material-symbols:dashboard-rounded",
    exact: true,
  },
  {
    label: "User Management",
    href: APP_URL.ADMIN_USER_MANAGEMENT,
    icon: "material-symbols:manage-accounts-rounded",
  },
  {
    label: "Care/ Skin Management",
    href: APP_URL.ADMIN_CARE_SKIN_MANAGEMENT,
    icon: "material-symbols:spa-rounded",
  },
  {
    label: "Chats",
    href: APP_URL.ADMIN_CHATS,
    icon: "material-symbols:chat-rounded",
  },
];

function LogoutSection() {
  function handleLogout() {
    // TODO: wire up actual admin logout logic (clear session/token, redirect to login)
    console.log("Admin confirmed logout");
  }

  return <LogoutConfirmDialog onConfirm={handleLogout} />;
}

export function AdminSidebar() {
  return (
    <BaseSidebar title="Admin Menu" bottomSection={<LogoutSection />}>
      {/* Section: Admin navigation menu */}
      <SidebarMenuList items={NAV_ITEMS} />
    </BaseSidebar>
  );
}
