"use client";

import { ReactNode } from "react";
import { Icon } from "@iconify/react";
import { useSidebarStore } from "@/store/sidebar-store";
import { Button } from "@/components/atomic/atom/Button";

interface BaseTopbarProps {
  rightSection?: ReactNode;
}

export function BaseTopbar({ rightSection }: BaseTopbarProps) {
  const { toggle } = useSidebarStore();

  return (
    <header className="relative flex items-center justify-between px-4 py-3 bg-background border-b border-[#b8b8b8]">
      {/* Hamburger — toggles sidebar */}
      <Button
        variant="ghost"
        size="md"
        iconOnly
        onClick={toggle}
        aria-label="Open menu"
        className="rounded-full"
      >
        <Icon icon="material-symbols:menu-rounded" />
      </Button>

      {/* Keep the brand absolutely centered so the menu button never shifts it off-axis. */}
      <div className="pointer-events-none absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5">
        <Icon icon="material-symbols:spa-outline-rounded" width={20} height={20} className="text-orange-500" />
        <span className="text-base font-bold tracking-tight">Skin List</span>
      </div>

      {/* Match the menu button width when there is no action so the row stays visually balanced. */}
      <div className="flex w-10 shrink-0 items-center justify-end">
        {rightSection}
      </div>
    </header>
  );
}
