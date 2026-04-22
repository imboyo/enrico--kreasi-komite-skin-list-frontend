"use client";

import { ReactNode } from "react";
import { Icon } from "@iconify/react";
import { useSidebarStore } from "@/store/sidebar-store";

interface BaseTopbarProps {
  rightSection?: ReactNode;
}

export function BaseTopbar({ rightSection }: BaseTopbarProps) {
  const { toggle } = useSidebarStore();

  return (
    <header className="relative flex items-center justify-between px-4 py-3 bg-background border-b border-border">
      {/* Hamburger — toggles sidebar */}
      <button
        onClick={toggle}
        className="rounded-full p-1.5 hover:bg-muted transition-colors"
        aria-label="Open menu"
      >
        <Icon icon="material-symbols:menu-rounded" width={24} height={24} />
      </button>

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
