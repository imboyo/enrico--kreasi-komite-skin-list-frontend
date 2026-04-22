// Shared Zustand store for routine checkbox toggle count — shared across components
import { create } from "zustand";

export const CHECK_LIMIT = 5;

interface RoutineCheckStore {
  /** Total number of check/uncheck interactions across all routines */
  checkCount: number;
  /** True when checkCount hits a multiple of CHECK_LIMIT — drives the limit dialog */
  showLimitDialog: boolean;
  /** Increments the counter; sets showLimitDialog when hitting a multiple of CHECK_LIMIT */
  increment: () => void;
  dismissLimitDialog: () => void;
  reset: () => void;
}

export const useRoutineCheckStore = create<RoutineCheckStore>((set) => ({
  checkCount: 0,
  showLimitDialog: false,
  increment: () =>
    set((state) => {
      const next = state.checkCount + 1;
      return {
        checkCount: next,
        showLimitDialog: next % CHECK_LIMIT === 0,
      };
    }),
  // Step back one so the next increment lands exactly on the next multiple,
  // meaning the dialog re-appears on the very next checkbox interaction.
  dismissLimitDialog: () =>
    set((state) => ({
      showLimitDialog: false,
      checkCount: state.checkCount - 1,
    })),
  reset: () => set({ checkCount: 0, showLimitDialog: false }),
}));
