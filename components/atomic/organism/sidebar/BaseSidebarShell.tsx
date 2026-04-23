"use client";

import type { ReactNode } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/atomic/atom/Button";

interface BaseSidebarShellProps {
  isOpen: boolean;
  title: string;
  topSection?: ReactNode;
  children?: ReactNode;
  bottomSection?: ReactNode;
  onClose: () => void;
}

export function BaseSidebarShell({
  isOpen,
  title,
  topSection,
  children,
  bottomSection,
  onClose,
}: BaseSidebarShellProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        // Fixed so the overlay and drawer always cover the full viewport height regardless of page content length.
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Section: Sidebar Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Section: Sidebar Mobile Shell */}
          <div className="pointer-events-none fixed inset-0 flex justify-center">
            <div className="relative h-full w-full overflow-hidden sm:max-w-125">
              {/* Section: Sidebar Drawer */}
              <motion.aside
                className="pointer-events-auto absolute inset-y-0 left-0 flex h-full min-h-0 w-72 flex-col bg-sidebar text-sidebar-foreground shadow-2xl"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 220 }}
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
                    className="rounded-full text-sidebar-foreground hover:bg-sidebar-foreground/10"
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
              </motion.aside>
            </div>
          </div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
