"use client";

import { BaseSidebar } from "@/components/atomic/organism/sidebar/BaseSidebar";
import { LogoutConfirmDialog } from "@/components/atomic/molecule/LogoutConfirmDialog";
import { SidebarMenuList } from "@/components/atomic/molecule/sidebar/SidebarMenuList";
import type { SidebarMenuItemProps } from "@/components/atomic/molecule/sidebar/SidebarMenuItem";
import { APP_URL } from "@/constant";
import { useLogout } from "@/hooks/useLogout";

const NAV_ITEMS: SidebarMenuItemProps[] = [
  {
    label: "Dashboard",
    href: APP_URL.ADMIN,
    icon: "material-symbols:dashboard-rounded",
    exact: true,
  },
  {
    label: "Customer Accounts",
    href: APP_URL.ADMIN_CUSTOMER_ACCOUNTS,
    icon: "material-symbols:manage-accounts-rounded",
  },
  {
    label: "Admin Accounts",
    href: APP_URL.ADMIN_ADMIN_ACCOUNTS,
    icon: "material-symbols:admin-panel-settings-rounded",
  },
  {
    label: "Default Skin Treat",
    href: APP_URL.ADMIN_DEFAULT_SKIN_TREAT,
    icon: "material-symbols:spa-rounded",
  },
  {
    label: "Chats",
    href: APP_URL.ADMIN_CHATS,
    icon: "material-symbols:chat-rounded",
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

export function AdminSidebar() {
  return (
    <BaseSidebar title="Admin Menu" bottomSection={<LogoutSection />}>
      {/* Section: Admin navigation menu */}
      <SidebarMenuList items={NAV_ITEMS} />
    </BaseSidebar>
  );
}
