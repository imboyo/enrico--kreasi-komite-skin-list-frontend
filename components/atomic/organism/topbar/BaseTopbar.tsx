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
    <header className="relative flex items-center justify-between px-4 py-3 bg-background border-b border-border">
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

      {/* Logo — centered when rightSection present, otherwise right-aligned */}
      <div
        className={`flex items-center gap-1.5 ${
          rightSection
            ? "absolute left-1/2 -translate-x-1/2 pointer-events-none"
            : ""
        }`}
      >
        <Icon icon="material-symbols:spa-outline-rounded" width={20} height={20} className="text-orange-500" />
        <span className="text-base font-bold tracking-tight">Skin List</span>
      </div>

      {/* Dynamic right section — hidden placeholder keeps spacing when absent */}
      {rightSection && <div className="flex items-center">{rightSection}</div>}
    </header>
  );
}
