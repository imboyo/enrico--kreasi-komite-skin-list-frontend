import { APP_URL } from "@/constant";
import type { AdminDefaultSkinCareCategory } from "backend-service/admin/default-skin-care";

export type AdminSkinCategoryId = AdminDefaultSkinCareCategory;

export type AdminSkinActionId = "edit" | "delete";

export type AdminSkinCategoryAction = {
  id: AdminSkinActionId;
  label: string;
  icon: string;
  destructive?: boolean;
};

export type AdminSkinCategoryConfig = {
  id: AdminSkinCategoryId;
  label: string;
  icon: string;
  errorTitle: string;
  emptyTitle: string;
  emptyDescription: string;
  actions: AdminSkinCategoryAction[];
};

export const ADMIN_DEFAULT_SKIN_CARE_QUERY_KEY = [
  "admin-default-skin-care",
] as const;
export const ADMIN_SKIN_CATEGORY_PARAM_KEY = "category";
export const DEFAULT_ADMIN_SKIN_CATEGORY: AdminSkinCategoryId = "routine";

const ADMIN_SKIN_CATEGORY_CONFIG: Record<
  AdminSkinCategoryId,
  AdminSkinCategoryConfig
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
};

export const ADMIN_SKIN_TAB_OPTIONS = (
  Object.values(ADMIN_SKIN_CATEGORY_CONFIG) as AdminSkinCategoryConfig[]
).map(({ id, label }) => ({
  id,
  label,
}));

export function isAdminSkinCategoryId(
  value: string | null | undefined,
): value is AdminSkinCategoryId {
  return value === "routine" ||
    value === "barrier" ||
    value === "colors" ||
    value === "scars" ||
    value === "make_up";
}

export function getAdminSkinCategoryConfig(
  category: AdminSkinCategoryId,
): AdminSkinCategoryConfig {
  return ADMIN_SKIN_CATEGORY_CONFIG[category];
}

export function getAdminSkinCategoryHref(
  category: AdminSkinCategoryId,
): string {
  return `${APP_URL.ADMIN_CARE_SKIN_MANAGEMENT}?${ADMIN_SKIN_CATEGORY_PARAM_KEY}=${category}`;
}

export function getAdminSkinCategoryQueryKey(category: AdminSkinCategoryId) {
  return [...ADMIN_DEFAULT_SKIN_CARE_QUERY_KEY, category] as const;
}
