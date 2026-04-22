"use client";

import { ReactNode, useEffect } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";
import { useSidebarStore } from "@/store/sidebar-store";
import { Button } from "@/components/atomic/atom/Button";

interface BaseSidebarProps {
  title: string;
  topSection?: ReactNode;
  children?: ReactNode;
  bottomSection?: ReactNode;
}

export function BaseSidebar({ title, topSection, children, bottomSection }: BaseSidebarProps) {
  const { isOpen, close } = useSidebarStore();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close]);

  return (
    <AnimatePresence>
      {isOpen && (
        // Fixed so the overlay and drawer always cover the full viewport height regardless of page content length.
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop — click outside to close */}
          <motion.div
            className="fixed inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          />

          {/* Constrains the drawer to the mobile container column on wider screens */}
          <div className="pointer-events-none fixed inset-0 flex justify-center">
            <div className="relative h-full w-full overflow-hidden sm:max-w-125">

              {/* Drawer panel */}
              <motion.aside
                className="pointer-events-auto absolute inset-y-0 left-0 flex h-full min-h-0 w-72 flex-col bg-sidebar text-sidebar-foreground shadow-2xl"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 220 }}
              >
                {/* Shared header with close button on the right */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-sidebar-foreground/15">
                  <span className="text-base font-semibold text-sidebar-foreground">
                    {title}
                  </span>
                  <Button
                    onClick={close}
                    variant="ghost"
                    size="sm"
                    iconOnly
                    aria-label="Close sidebar"
                    className="text-sidebar-foreground hover:bg-sidebar-foreground/10 rounded-full"
                  >
                    <Icon icon="material-symbols:close-rounded" width={20} height={20} />
                  </Button>
                </div>

                {/* Dynamic top section — passed via props, rendered above logo */}
                {topSection && (
                  <div className="px-4 py-4 border-b border-sidebar-foreground/15">
                    {topSection}
                  </div>
                )}

                {/* Only the menu area scrolls so the header and bottom action stay visible. */}
                <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">{children}</div>

                {/* Bottom section — pinned to bottom */}
                {bottomSection && (
                  <div className="px-4 py-4 border-t border-sidebar-foreground/15">
                    {bottomSection}
                  </div>
                )}
              </motion.aside>

            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
