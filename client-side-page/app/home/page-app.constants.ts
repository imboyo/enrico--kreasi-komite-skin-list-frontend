import type { SkinTreatCategory } from "@/backend-service/user/skin-treat";

export type TabId =
  | "routines"
  | "colors"
  | "make-ups"
  | "barriers"
  | "scars"
  | "contours"
  | "fats"
  | "hairs";

export const TABS = [
  { id: "routines", label: "Routines" },
  { id: "colors", label: "Colors" },
  { id: "make-ups", label: "Make Up" },
  { id: "barriers", label: "Barriers" },
  { id: "scars", label: "Scars" },
  { id: "contours", label: "Contour" },
  { id: "fats", label: "Fats" },
  { id: "hairs", label: "Hairs" },
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
  contours: "contour",
  fats: "fats",
  hairs: "hairs",
};

export const SKIN_TREAT_CATEGORY_OPTIONS = TABS.map((tab) => ({
  label: tab.label,
  value: SKIN_TREAT_CATEGORY_BY_TAB[tab.id],
}));

export const TAB_CONTENT_COPY: Record<
  TabId,
  {
    errorTitle: string;
    emptyTitle: string;
    emptyDescription: string;
  }
> = {
  routines: {
    errorTitle: "Daftar rutinitas tidak tersedia.",
    emptyTitle: "Belum ada Routine",
    emptyDescription:
      "Tambahkan data rutinitasmu atau coba muat ulang permintaan ini untuk menampilkan checklist lagi.",
  },
  colors: {
    errorTitle: "Daftar warna tidak tersedia.",
    emptyTitle: "Belum ada Color",
    emptyDescription:
      "Tambahkan data warnamu untuk menampilkan checklist ini lagi.",
  },
  "make-ups": {
    errorTitle: "Daftar make up tidak tersedia.",
    emptyTitle: "Belum ada make up",
    emptyDescription:
      "Tambahkan data make up-mu untuk menampilkan checklist ini lagi.",
  },
  barriers: {
    errorTitle: "Daftar skin barrier tidak tersedia.",
    emptyTitle: "Belum ada data skin barrier",
    emptyDescription:
      "Tambahkan data skin barrier-mu untuk menampilkan checklist ini lagi.",
  },
  scars: {
    errorTitle: "Daftar bekas luka tidak tersedia.",
    emptyTitle: "Belum ada data scars",
    emptyDescription:
      "Tambahkan data bekas luka-mu untuk menampilkan checklist ini lagi.",
  },
  contours: {
    errorTitle: "Daftar contour tidak tersedia.",
    emptyTitle: "Belum ada data contour",
    emptyDescription:
      "Tambahkan data contour-mu untuk menampilkan checklist ini lagi.",
  },
  fats: {
    errorTitle: "Daftar fats tidak tersedia.",
    emptyTitle: "Belum ada data fats",
    emptyDescription:
      "Tambahkan data fats-mu untuk menampilkan checklist ini lagi.",
  },
  hairs: {
    errorTitle: "Daftar hairs tidak tersedia.",
    emptyTitle: "Belum ada data hairs",
    emptyDescription:
      "Tambahkan data hairs-mu untuk menampilkan checklist ini lagi.",
  },
};
