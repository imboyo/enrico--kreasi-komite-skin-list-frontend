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
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b border-[#b8b8b8]">
      {/* Left: hamburger toggle (mobile only) + brand */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="md"
          iconOnly
          onClick={toggle}
          aria-label="Open menu"
          className="rounded-full md:hidden"
        >
          <Icon icon="material-symbols:menu-rounded" />
        </Button>

        <div className="flex items-center gap-1.5">
          <Icon icon="material-symbols:spa-outline-rounded" width={20} height={20} className="text-orange-500" />
          <span className="text-base font-bold tracking-tight">Skin List</span>
        </div>
      </div>

      {/* Right: profile / actions */}
      <div className="flex items-center">
        {rightSection}
      </div>
    </header>
  );
}
