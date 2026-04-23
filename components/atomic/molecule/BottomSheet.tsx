"use client";

import { type ReactNode, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/util/cn";

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  panelClassName?: string;
  overlayClassName?: string;
  containerClassName?: string;
  closeOnBackdropClick?: boolean;
}

export function BottomSheet({
  open,
  onClose,
  children,
  panelClassName,
  overlayClassName,
  containerClassName,
  closeOnBackdropClick = true,
}: BottomSheetProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            key="backdrop"
            aria-hidden="true"
            className={cn("fixed inset-0 bg-black/40", overlayClassName)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOnBackdropClick ? onClose : undefined}
          />

          {/* Keep the sheet aligned with the 500px mobile shell on larger screens. */}
          <div
            className={cn(
              "pointer-events-none fixed inset-0 flex items-end justify-center",
              containerClassName,
            )}
          >
            <motion.div
              key="panel"
              role="dialog"
              aria-modal="true"
              className={cn(
                "pointer-events-auto relative mx-auto flex h-[50dvh] max-h-[50dvh] w-full max-w-125 flex-col overflow-hidden rounded-t-2xl bg-background shadow-xl",
                panelClassName,
              )}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
