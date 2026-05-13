import { APP_URL } from "@/constant";
import type { AdminDefaultSkinCareCategory } from "backend-service/admin/default-skin-care";

export type AdminDefaultSkinTreatCategoryId = AdminDefaultSkinCareCategory;

export type AdminDefaultSkinTreatActionId = "edit" | "delete";

export type AdminDefaultSkinTreatCategoryAction = {
  id: AdminDefaultSkinTreatActionId;
  label: string;
  icon: string;
  destructive?: boolean;
};

export type AdminDefaultSkinTreatCategoryConfig = {
  id: AdminDefaultSkinTreatCategoryId;
  label: string;
  icon: string;
  errorTitle: string;
  emptyTitle: string;
  emptyDescription: string;
  actions: AdminDefaultSkinTreatCategoryAction[];
};

export const ADMIN_DEFAULT_SKIN_CARE_QUERY_KEY = [
  "admin-default-skin-care",
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
      "Tambahkan data routine untuk mulai mengelola daftar skin care default.",
    actions: [
      {
        id: "edit",
        label: "Ubah routine",
        icon: "material-symbols:edit-outline-rounded",
      },
      {
        id: "delete",
        label: "Hapus routine",
        icon: "material-symbols:delete-outline",
        destructive: true,
      },
    ],
  },
  make_up: {
    id: "make_up",
    label: "Make Up",
    icon: "material-symbols:face-retouching-natural-outline-rounded",
    errorTitle: "Gagal memuat make up.",
    emptyTitle: "Belum ada make up.",
    emptyDescription:
      "Tambahkan data make up untuk mulai mengelola daftar skin care default.",
    actions: [
      {
        id: "edit",
        label: "Ubah make up",
        icon: "material-symbols:edit-outline-rounded",
      },
      {
        id: "delete",
        label: "Hapus make up",
        icon: "material-symbols:delete-outline",
        destructive: true,
      },
    ],
  },
  barrier: {
    id: "barrier",
    label: "Barrier",
    icon: "material-symbols:shield-outline-rounded",
    errorTitle: "Gagal memuat barrier.",
    emptyTitle: "Belum ada barrier.",
    emptyDescription:
      "Tambahkan data barrier untuk mulai mengelola daftar skin care default.",
    actions: [
      {
        id: "edit",
        label: "Ubah barrier",
        icon: "material-symbols:edit-outline-rounded",
      },
      {
        id: "delete",
        label: "Hapus barrier",
        icon: "material-symbols:delete-outline",
        destructive: true,
      },
    ],
  },
  colors: {
    id: "colors",
    label: "Colors",
    icon: "material-symbols:water-drop-outline",
    errorTitle: "Gagal memuat colors.",
    emptyTitle: "Belum ada colors.",
    emptyDescription:
      "Tambahkan data colors untuk mulai mengelola daftar skin care default.",
    actions: [
      {
        id: "edit",
        label: "Ubah colors",
        icon: "material-symbols:edit-outline-rounded",
      },
      {
        id: "delete",
        label: "Hapus colors",
        icon: "material-symbols:delete-outline",
        destructive: true,
      },
    ],
  },
  scars: {
    id: "scars",
    label: "Scars",
    icon: "material-symbols:dermatology-outline-rounded",
    errorTitle: "Gagal memuat scars.",
    emptyTitle: "Belum ada scars.",
    emptyDescription:
      "Tambahkan data scars untuk mulai mengelola daftar skin care default.",
    actions: [
      {
        id: "edit",
        label: "Ubah scars",
        icon: "material-symbols:edit-outline-rounded",
      },
      {
        id: "delete",
        label: "Hapus scars",
        icon: "material-symbols:delete-outline",
        destructive: true,
      },
    ],
  },
  contour: {
    id: "contour",
    label: "Contour",
    icon: "material-symbols:face-4-outline-rounded",
    errorTitle: "Gagal memuat contour.",
    emptyTitle: "Belum ada contour.",
    emptyDescription:
      "Tambahkan data contour untuk mulai mengelola daftar skin care default.",
    actions: [
      {
        id: "edit",
        label: "Ubah contour",
        icon: "material-symbols:edit-outline-rounded",
      },
      {
        id: "delete",
        label: "Hapus contour",
        icon: "material-symbols:delete-outline",
        destructive: true,
      },
    ],
  },
  fats: {
    id: "fats",
    label: "Fats",
    icon: "material-symbols:water-full-outline-rounded",
    errorTitle: "Gagal memuat fats.",
    emptyTitle: "Belum ada fats.",
    emptyDescription:
      "Tambahkan data fats untuk mulai mengelola daftar skin care default.",
    actions: [
      {
        id: "edit",
        label: "Ubah fats",
        icon: "material-symbols:edit-outline-rounded",
      },
      {
        id: "delete",
        label: "Hapus fats",
        icon: "material-symbols:delete-outline",
        destructive: true,
      },
    ],
  },
  hairs: {
    id: "hairs",
    label: "Hairs",
    icon: "material-symbols:airwave-rounded",
    errorTitle: "Gagal memuat hairs.",
    emptyTitle: "Belum ada hairs.",
    emptyDescription:
      "Tambahkan data hairs untuk mulai mengelola daftar skin care default.",
    actions: [
      {
        id: "edit",
        label: "Ubah hairs",
        icon: "material-symbols:edit-outline-rounded",
      },
      {
        id: "delete",
        label: "Hapus hairs",
        icon: "material-symbols:delete-outline",
        destructive: true,
      },
    ],
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
  return [...ADMIN_DEFAULT_SKIN_CARE_QUERY_KEY, category] as const;
}
