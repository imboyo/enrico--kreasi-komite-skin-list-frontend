"use client";

import { useEffect } from "react";

export function useSidebarCloseOnEscape(
  isOpen: boolean,
  close: () => void,
) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [close, isOpen]);
}
