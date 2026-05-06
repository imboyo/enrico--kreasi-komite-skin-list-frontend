"use client";

import { useSyncExternalStore } from "react";

export function useIsHydrated() {
  return useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
}
