"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { BaseSidebar } from "@/components/atomic/organism/sidebar/BaseSidebar";
import { LogoutConfirmDialog } from "@/components/atomic/molecule/LogoutConfirmDialog";
import { APP_URL } from "@/constant";
import { useSidebarStore } from "@/store/sidebar-store";
import { cn } from "@/util/cn";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: APP_URL.APP,
    icon: "material-symbols:dashboard-rounded",
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

function NavMenu() {
  const pathname = usePathname();
  const { close } = useSidebarStore();

  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map(({ label, href, icon }) => {
        // Exact match for dashboard, prefix match for nested routes
        const isActive = href === APP_URL.APP ? pathname === APP_URL.APP : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            onClick={close}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150",
              isActive
                ? "bg-sidebar-foreground/15 text-sidebar-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground",
            )}
          >
            <Icon icon={icon} width={20} height={20} className="shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function LogoutSection() {
  function handleLogout() {
    // TODO: wire up actual logout logic (clear session/token, redirect to login)
    console.log("User confirmed logout");
  }

  return <LogoutConfirmDialog onConfirm={handleLogout} />;
}

export function AppSidebar() {
  return (
    <BaseSidebar title="Menu" bottomSection={<LogoutSection />}>
      <NavMenu />
    </BaseSidebar>
  );
}
