"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/store/sidebar-store";

export interface SidebarMenuItemProps {
  label: string;
  href: string;
  icon?: string;
  exact?: boolean;
}

export function SidebarMenuItem({
  label,
  href,
  icon,
  exact = false,
}: SidebarMenuItemProps) {
  const pathname = usePathname();
  const close = useSidebarStore((s) => s.close);
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={close}
      className={[
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-sidebar-foreground/15 text-sidebar-foreground"
          : "text-sidebar-foreground/80 hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground",
      ].join(" ")}
    >
      {icon && (
        <Icon icon={icon} width={20} height={20} className="shrink-0" />
      )}
      <span className="flex-1">{label}</span>
      <Icon icon="mdi:chevron-right" width={16} height={16} className="shrink-0 ml-auto" />
    </Link>
  );
}
