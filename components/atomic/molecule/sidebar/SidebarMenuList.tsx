"use client";

import {
  SidebarMenuItem,
  type SidebarMenuItemProps,
} from "./SidebarMenuItem";

interface SidebarMenuListProps {
  items: SidebarMenuItemProps[];
}

export function SidebarMenuList({ items }: SidebarMenuListProps) {
  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => (
        <SidebarMenuItem key={item.href} {...item} />
      ))}
    </nav>
  );
}
