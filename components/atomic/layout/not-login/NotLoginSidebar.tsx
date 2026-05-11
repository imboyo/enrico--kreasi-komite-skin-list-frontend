"use client";

import { BaseSidebar } from "@/components/atomic/organism/sidebar/BaseSidebar";
import { SidebarMenuList } from "@/components/atomic/molecule/sidebar/SidebarMenuList";
import { SidebarMenuItem, type SidebarMenuItemProps } from "@/components/atomic/molecule/sidebar/SidebarMenuItem";
import { APP_URL } from "@/constant";

const items: SidebarMenuItemProps[] = [
  { label: "Home", href: APP_URL.HOME, icon: "material-symbols:home-outline-rounded", exact: true },
  { label: "About Us", href: APP_URL.ABOUT, icon: "material-symbols:info-outline-rounded" },
  { label: "Terms", href: APP_URL.TERMS, icon: "material-symbols:description-outline-rounded" },
  { label: "Contact", href: APP_URL.CONTACT, icon: "material-symbols:mail-outline-rounded" },
];

export function NotLoginSidebar() {
  return (
    <BaseSidebar
      title="WELCOME!"
      bottomSection={
        <>
          <SidebarMenuItem
            label="Login"
            href={APP_URL.LOGIN_DIRECT}
            icon="material-symbols:person-outline-rounded"
          />
          <SidebarMenuItem
            label="Sign Up"
            href={APP_URL.REGISTER_DIRECT}
            icon="material-symbols:person-add-outline-rounded"
          />
        </>
      }
    >
      <SidebarMenuList items={items} />
    </BaseSidebar>
  );
}
