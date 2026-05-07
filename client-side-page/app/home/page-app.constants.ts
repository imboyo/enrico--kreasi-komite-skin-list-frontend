import type { SkinTreatCategory } from "@/backend-service/user/skin-treat";

export type TabId = "routines" | "colors" | "make-ups" | "barriers" | "scars";

export const TABS = [
  { id: "routines", label: "Routines" },
  { id: "colors", label: "Colors" },
  { id: "make-ups", label: "Make Up" },
  { id: "barriers", label: "Barriers" },
  { id: "scars", label: "Scars" },
] as const;

export const SKIN_TREAT_QUERY_KEY = ["user-skin-treats"] as const;
export const SKIN_TREAT_CACHE_MS = 5 * 60 * 1000;
export const UI_PAGE_SIZE = 10;

export const SKIN_TREAT_CATEGORY_BY_TAB: Record<TabId, SkinTreatCategory> = {
  routines: "routine",
  colors: "colors",
  "make-ups": "make_up",
  barriers: "barrier",
  scars: "scars",
};

export const TAB_CONTENT_COPY: Record<
  TabId,
  {
    errorTitle: string;
    emptyTitle: string;
    emptyDescription: string;
  }
> = {
  routines: {
    errorTitle: "Routine list is unavailable.",
    emptyTitle: "No routines available yet.",
    emptyDescription:
      "Add your routine data or retry the request to load this checklist again.",
  },
  colors: {
    errorTitle: "Color list is unavailable.",
    emptyTitle: "No colors available yet.",
    emptyDescription: "Add your color data to load this checklist again.",
  },
  "make-ups": {
    errorTitle: "Make up list is unavailable.",
    emptyTitle: "No make ups available yet.",
    emptyDescription: "Add your make up data to load this checklist again.",
  },
  barriers: {
    errorTitle: "Barrier list is unavailable.",
    emptyTitle: "No barriers available yet.",
    emptyDescription: "Add your barrier data to load this checklist again.",
  },
  scars: {
    errorTitle: "Scar list is unavailable.",
    emptyTitle: "No scars available yet.",
    emptyDescription: "Add your scar data to load this checklist again.",
  },
};
