"use client";

import type { ReactNode } from "react";
import { Icon } from "@iconify/react";
import { cn } from "libs/util/cn";

import { Button } from "@/components/atomic/atom/Button";

interface BaseSidebarShellProps {
  isOpen: boolean;
  isFloating: boolean;
  title: string;
  topSection?: ReactNode;
  children?: ReactNode;
  bottomSection?: ReactNode;
  onClose: () => void;
}

export function BaseSidebarShell({
  isOpen,
  isFloating,
  title,
  topSection,
  children,
  bottomSection,
  onClose,
}: BaseSidebarShellProps) {
  return (
    // Keep the sidebar mounted so it behaves like a normal off-canvas UI instead of a modal overlay.
    // On mobile it slides in/out; on desktop it stays visible as a static sidebar.
    <aside
      aria-hidden={isFloating && !isOpen}
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-dvh min-h-0 w-72 flex-col bg-sidebar text-sidebar-foreground shadow-2xl transition-transform duration-300 ease-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:relative md:z-auto md:h-auto md:self-stretch md:translate-x-0 md:shadow-none"
      )}
    >
      {/* Section: Sidebar Header */}
      <div className="flex items-center justify-between border-b border-sidebar-foreground/15 px-4 py-4">
        <span className="text-base font-semibold text-sidebar-foreground">
          {title}
        </span>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          iconOnly
          aria-label="Close sidebar"
          className="rounded-full text-sidebar-foreground hover:bg-sidebar-foreground/10 md:hidden"
        >
          <Icon
            icon="material-symbols:close-rounded"
            width={20}
            height={20}
          />
        </Button>
      </div>

      {/* Section: Sidebar Top */}
      {topSection ? (
        <div className="border-b border-sidebar-foreground/15 px-4 py-4">
          {topSection}
        </div>
      ) : null}

      {/* Section: Sidebar Content */}
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        {children}
      </div>

      {/* Section: Sidebar Bottom */}
      {bottomSection ? (
        <div className="border-t border-sidebar-foreground/15 px-4 py-4">
          {bottomSection}
        </div>
      ) : null}
    </aside>
  );
}
