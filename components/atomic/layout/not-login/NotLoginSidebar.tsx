"use client";

import { BaseSidebar } from "@/components/atomic/organism/sidebar/BaseSidebar";
import { SidebarMenuList } from "@/components/atomic/molecule/sidebar/SidebarMenuList";
import { SidebarMenuItem, type SidebarMenuItemProps } from "@/components/atomic/molecule/sidebar/SidebarMenuItem";

const items: SidebarMenuItemProps[] = [
  { label: "Home", href: "/", icon: "material-symbols:home-outline-rounded", exact: true },
  { label: "About Us", href: "/about", icon: "material-symbols:info-outline-rounded" },
  { label: "Terms", href: "/terms", icon: "material-symbols:description-outline-rounded" },
  { label: "Contact", href: "/contact", icon: "material-symbols:mail-outline-rounded" },
];

export function NotLoginSidebar() {
  return (
    <BaseSidebar
      title="WELCOME!"
      bottomSection={
        <SidebarMenuItem
          label="Login"
          href="/login"
          icon="material-symbols:person-outline-rounded"
        />
      }
    >
      <SidebarMenuList items={items} />
    </BaseSidebar>
  );
}
