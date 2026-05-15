import { APP_URL } from "@/constant";
import type { DefaultSkinTreatCategory } from "backend-service/default-skin-treat";

export type AdminDefaultSkinTreatCategoryId = DefaultSkinTreatCategory;

export type AdminDefaultSkinTreatCategoryConfig = {
  id: AdminDefaultSkinTreatCategoryId;
  label: string;
  icon: string;
  errorTitle: string;
  emptyTitle: string;
  emptyDescription: string;
};

export const ADMIN_DEFAULT_SKIN_TREAT_QUERY_KEY = [
  "admin-default-skin-treat",
] as const;
export const ADMIN_DEFAULT_SKIN_TREAT_CATEGORY_PARAM_KEY = "category";
export const DEFAULT_ADMIN_DEFAULT_SKIN_TREAT_CATEGORY: AdminDefaultSkinTreatCategoryId =
  "routine";

const ADMIN_DEFAULT_SKIN_TREAT_CATEGORY_CONFIG: Record<
  AdminDefaultSkinTreatCategoryId,
  AdminDefaultSkinTreatCategoryConfig
> = {
  routine: {
    id: "routine",
    label: "Routine",
    icon: "material-symbols:spa-outline-rounded",
    errorTitle: "Gagal memuat routine.",
    emptyTitle: "Belum ada routine.",
    emptyDescription:
      "Belum ada data routine default untuk kategori ini.",
  },
  make_up: {
    id: "make_up",
    label: "Make Up",
    icon: "material-symbols:face-retouching-natural-outline-rounded",
    errorTitle: "Gagal memuat make up.",
    emptyTitle: "Belum ada make up.",
    emptyDescription:
      "Belum ada data make up default untuk kategori ini.",
  },
  barrier: {
    id: "barrier",
    label: "Barrier",
    icon: "material-symbols:shield-outline-rounded",
    errorTitle: "Gagal memuat barrier.",
    emptyTitle: "Belum ada barrier.",
    emptyDescription:
      "Belum ada data barrier default untuk kategori ini.",
  },
  colors: {
    id: "colors",
    label: "Colors",
    icon: "material-symbols:water-drop-outline",
    errorTitle: "Gagal memuat colors.",
    emptyTitle: "Belum ada colors.",
    emptyDescription:
      "Belum ada data colors default untuk kategori ini.",
  },
  scars: {
    id: "scars",
    label: "Scars",
    icon: "material-symbols:dermatology-outline-rounded",
    errorTitle: "Gagal memuat scars.",
    emptyTitle: "Belum ada scars.",
    emptyDescription:
      "Belum ada data scars default untuk kategori ini.",
  },
  contour: {
    id: "contour",
    label: "Contour",
    icon: "material-symbols:face-4-outline-rounded",
    errorTitle: "Gagal memuat contour.",
    emptyTitle: "Belum ada contour.",
    emptyDescription:
      "Belum ada data contour default untuk kategori ini.",
  },
  fats: {
    id: "fats",
    label: "Fats",
    icon: "material-symbols:water-full-outline-rounded",
    errorTitle: "Gagal memuat fats.",
    emptyTitle: "Belum ada fats.",
    emptyDescription:
      "Belum ada data fats default untuk kategori ini.",
  },
  hairs: {
    id: "hairs",
    label: "Hairs",
    icon: "material-symbols:airwave-rounded",
    errorTitle: "Gagal memuat hairs.",
    emptyTitle: "Belum ada hairs.",
    emptyDescription:
      "Belum ada data hairs default untuk kategori ini.",
  },
};

export const ADMIN_DEFAULT_SKIN_TREAT_CATEGORY_IDS = Object.keys(
  ADMIN_DEFAULT_SKIN_TREAT_CATEGORY_CONFIG,
) as AdminDefaultSkinTreatCategoryId[];

export const ADMIN_DEFAULT_SKIN_TREAT_TAB_OPTIONS = (
  Object.values(
    ADMIN_DEFAULT_SKIN_TREAT_CATEGORY_CONFIG,
  ) as AdminDefaultSkinTreatCategoryConfig[]
).map(({ id, label }) => ({
  id,
  label,
}));

export function isAdminDefaultSkinTreatCategoryId(
  value: string | null | undefined,
): value is AdminDefaultSkinTreatCategoryId {
  return value != null && ADMIN_DEFAULT_SKIN_TREAT_CATEGORY_IDS.includes(value as AdminDefaultSkinTreatCategoryId);
}

export function getAdminDefaultSkinTreatCategoryConfig(
  category: AdminDefaultSkinTreatCategoryId,
): AdminDefaultSkinTreatCategoryConfig {
  return ADMIN_DEFAULT_SKIN_TREAT_CATEGORY_CONFIG[category];
}

export function getAdminDefaultSkinTreatCategoryHref(
  category: AdminDefaultSkinTreatCategoryId,
): string {
  return `${APP_URL.ADMIN_DEFAULT_SKIN_TREAT}?${ADMIN_DEFAULT_SKIN_TREAT_CATEGORY_PARAM_KEY}=${category}`;
}

export function getAdminDefaultSkinTreatCategoryQueryKey(
  category: AdminDefaultSkinTreatCategoryId,
) {
  return [...ADMIN_DEFAULT_SKIN_TREAT_QUERY_KEY, category] as const;
}
