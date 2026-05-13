import type { AdminUserSkinTreatCategory } from "backend-service/admin/user/skin-treat/types";

export type AdminUserSkinTreatCategoryId = AdminUserSkinTreatCategory;

export type AdminUserSkinTreatCategoryConfig = {
  id: AdminUserSkinTreatCategoryId;
  label: string;
  icon: string;
  errorTitle: string;
  emptyTitle: string;
  emptyDescription: string;
};

export const ADMIN_USER_SKIN_TREAT_QUERY_KEY = ["admin-user-skin-treat"] as const;
export const ADMIN_USER_SKIN_TREAT_CATEGORY_PARAM_KEY = "category";
export const DEFAULT_ADMIN_USER_SKIN_TREAT_CATEGORY: AdminUserSkinTreatCategoryId =
  "routine";

const ADMIN_USER_SKIN_TREAT_CATEGORY_CONFIG: Record<
  AdminUserSkinTreatCategoryId,
  AdminUserSkinTreatCategoryConfig
> = {
  routine: {
    id: "routine",
    label: "Routine",
    icon: "material-symbols:spa-outline-rounded",
    errorTitle: "Gagal memuat routine.",
    emptyTitle: "Belum ada routine.",
    emptyDescription: "Pengguna ini belum menambahkan data routine.",
  },
  make_up: {
    id: "make_up",
    label: "Make Up",
    icon: "material-symbols:face-retouching-natural-outline-rounded",
    errorTitle: "Gagal memuat make up.",
    emptyTitle: "Belum ada make up.",
    emptyDescription: "Pengguna ini belum menambahkan data make up.",
  },
  barrier: {
    id: "barrier",
    label: "Barrier",
    icon: "material-symbols:shield-outline-rounded",
    errorTitle: "Gagal memuat barrier.",
    emptyTitle: "Belum ada barrier.",
    emptyDescription: "Pengguna ini belum menambahkan data barrier.",
  },
  colors: {
    id: "colors",
    label: "Colors",
    icon: "material-symbols:water-drop-outline",
    errorTitle: "Gagal memuat colors.",
    emptyTitle: "Belum ada colors.",
    emptyDescription: "Pengguna ini belum menambahkan data colors.",
  },
  scars: {
    id: "scars",
    label: "Scars",
    icon: "material-symbols:dermatology-outline-rounded",
    errorTitle: "Gagal memuat scars.",
    emptyTitle: "Belum ada scars.",
    emptyDescription: "Pengguna ini belum menambahkan data scars.",
  },
  contour: {
    id: "contour",
    label: "Contour",
    icon: "material-symbols:face-4-outline-rounded",
    errorTitle: "Gagal memuat contour.",
    emptyTitle: "Belum ada contour.",
    emptyDescription: "Pengguna ini belum menambahkan data contour.",
  },
  fats: {
    id: "fats",
    label: "Fats",
    icon: "material-symbols:water-full-outline-rounded",
    errorTitle: "Gagal memuat fats.",
    emptyTitle: "Belum ada fats.",
    emptyDescription: "Pengguna ini belum menambahkan data fats.",
  },
  hairs: {
    id: "hairs",
    label: "Hairs",
    icon: "material-symbols:airwave-rounded",
    errorTitle: "Gagal memuat hairs.",
    emptyTitle: "Belum ada hairs.",
    emptyDescription: "Pengguna ini belum menambahkan data hairs.",
  },
};

export const ADMIN_USER_SKIN_TREAT_CATEGORY_IDS = Object.keys(
  ADMIN_USER_SKIN_TREAT_CATEGORY_CONFIG,
) as AdminUserSkinTreatCategoryId[];

export const ADMIN_USER_SKIN_TREAT_TAB_OPTIONS = (
  Object.values(
    ADMIN_USER_SKIN_TREAT_CATEGORY_CONFIG,
  ) as AdminUserSkinTreatCategoryConfig[]
).map(({ id, label }) => ({
  id,
  label,
}));

export function isAdminUserSkinTreatCategoryId(
  value: string | null | undefined,
): value is AdminUserSkinTreatCategoryId {
  return (
    value != null &&
    ADMIN_USER_SKIN_TREAT_CATEGORY_IDS.includes(value as AdminUserSkinTreatCategoryId)
  );
}

export function getAdminUserSkinTreatCategoryConfig(
  category: AdminUserSkinTreatCategoryId,
): AdminUserSkinTreatCategoryConfig {
  return ADMIN_USER_SKIN_TREAT_CATEGORY_CONFIG[category];
}

export function getAdminUserSkinTreatCategoryHref(
  userUuid: string,
  category: AdminUserSkinTreatCategoryId,
): string {
  return `/admin/user/skin-treat/${userUuid}?${ADMIN_USER_SKIN_TREAT_CATEGORY_PARAM_KEY}=${category}`;
}
