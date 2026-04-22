"use client";

import { ReactNode, useEffect } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";
import { useSidebarStore } from "@/store/sidebar-store";

interface BaseSidebarProps {
  title: string;
  topSection?: ReactNode;
  children?: ReactNode;
}

export function BaseSidebar({ title, topSection, children }: BaseSidebarProps) {
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
        // Overlay — absolute within MobileContainer inner div so drawer stays inside the 500px shell
        <div className="absolute inset-0 z-50 overflow-hidden">
          {/* Backdrop — click outside to close */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          />

          {/* Drawer panel */}
          <motion.aside
            className="absolute inset-y-0 left-0 flex w-72 flex-col bg-background shadow-2xl"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
          >
            {/* Shared header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-border">
              <span className="text-base font-semibold text-foreground">
                {title}
              </span>
              <button
                onClick={close}
                className="rounded-full p-1.5 hover:bg-muted transition-colors"
                aria-label="Close sidebar"
              >
                <Icon
                  icon="material-symbols:close-rounded"
                  width={20}
                  height={20}
                />
              </button>
            </div>

            {/* Dynamic top section — passed via props, rendered above logo */}
            {topSection && (
              <div className="px-4 py-4 border-b border-border">
                {topSection}
              </div>
            )}

            {/* Dynamic menu section — children */}
            <div className="flex-1 overflow-y-auto px-4 py-4">{children}</div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
