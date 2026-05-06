"use client";

import { BaseSidebar } from "@/components/atomic/organism/sidebar/BaseSidebar";
import { LogoutConfirmDialog } from "@/components/atomic/molecule/LogoutConfirmDialog";
import {
  SidebarMenuList,
} from "@/components/atomic/molecule/sidebar/SidebarMenuList";
import type { SidebarMenuItemProps } from "@/components/atomic/molecule/sidebar/SidebarMenuItem";
import { APP_URL } from "@/constant";
import { useLogout } from "@/hooks/useLogout";

const NAV_ITEMS: SidebarMenuItemProps[] = [
  {
    label: "Dashboard",
    href: APP_URL.APP,
    icon: "material-symbols:dashboard-rounded",
    exact: true,
  },
  {
    label: "Chat With Us",
    href: APP_URL.APP_CHAT,
    icon: "material-symbols:chat-rounded",
  },
  {
    label: "Ask AI",
    href: APP_URL.APP_ASK_AI,
    icon: "material-symbols:smart-toy-rounded",
  },
  {
    label: "Profile",
    href: APP_URL.APP_PROFILE,
    icon: "material-symbols:person-rounded",
  },
];

function LogoutSection() {
  const { logout, isLoggingOut } = useLogout();

  return (
    <LogoutConfirmDialog
      onConfirm={logout}
      isConfirming={isLoggingOut}
      keepOpenOnConfirm
    />
  );
}

export function AppSidebar() {
  return (
    <BaseSidebar title="Menu" bottomSection={<LogoutSection />}>
      {/* Section: App navigation menu */}
      <SidebarMenuList items={NAV_ITEMS} />
    </BaseSidebar>
  );
}
