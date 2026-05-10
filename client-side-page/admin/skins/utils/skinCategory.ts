import { APP_URL } from "@/constant";
import type { SkinCareCardItem } from "@/components/atomic/organism/SkinCareAdminCard";
import { getColors } from "@/mock-backend/skin-care/get-colors";
import { getMakeUps } from "@/mock-backend/skin-care/get-make-ups";
import { getRoutines } from "@/mock-backend/skin-care/get-routines";
import { getScars } from "@/mock-backend/skin-care/get-scars";

export type AdminSkinCategoryId =
  | "routines"
  | "colors"
  | "scars"
  | "make-ups";

export type AdminSkinActionId = "edit" | "hide" | "delete";

export type AdminSkinCategoryAction = {
  id: AdminSkinActionId;
  label: string;
  icon: string;
  destructive?: boolean;
};

export type AdminSkinCategoryConfig = {
  id: AdminSkinCategoryId;
  label: string;
  singularLabel: string;
  icon: string;
  errorTitle: string;
  emptyTitle: string;
  emptyDescription: string;
  actions: AdminSkinCategoryAction[];
};

export type AdminSkinCategoryCollection = Record<
  AdminSkinCategoryId,
  SkinCareCardItem[]
>;

export const ADMIN_SKIN_CATEGORY_QUERY_KEY = ["admin-skin-categories"] as const;
export const ADMIN_SKIN_CATEGORY_PARAM_KEY = "category";
export const DEFAULT_ADMIN_SKIN_CATEGORY: AdminSkinCategoryId = "routines";

const ADMIN_SKIN_CATEGORY_CONFIG: Record<
  AdminSkinCategoryId,
  AdminSkinCategoryConfig
> = {
  routines: {
    id: "routines",
    label: "Routines",
    singularLabel: "routine",
    icon: "material-symbols:spa-outline-rounded",
    errorTitle: "Failed to load routines.",
    emptyTitle: "No routines found.",
    emptyDescription: "Refresh the mock data and try again.",
    actions: [
      {
        id: "edit",
        label: "Edit routine",
        icon: "material-symbols:edit-outline-rounded",
      },
      {
        id: "delete",
        label: "Delete routine",
        icon: "material-symbols:delete-outline",
        destructive: true,
      },
    ],
  },
  colors: {
    id: "colors",
    label: "Colors",
    singularLabel: "color",
    icon: "material-symbols:palette-outline-rounded",
    errorTitle: "Failed to load colors.",
    emptyTitle: "No colors found.",
    emptyDescription: "Refresh the mock data and try again.",
    actions: [
      {
        id: "edit",
        label: "Edit color",
        icon: "material-symbols:edit-outline-rounded",
      },
      {
        id: "hide",
        label: "Hide color",
        icon: "material-symbols:visibility-off-outline-rounded",
        destructive: true,
      },
      {
        id: "delete",
        label: "Delete color",
        icon: "material-symbols:delete-outline",
        destructive: true,
      },
    ],
  },
  scars: {
    id: "scars",
    label: "Scars",
    singularLabel: "scar",
    icon: "material-symbols:dermatology-outline-rounded",
    errorTitle: "Failed to load scars.",
    emptyTitle: "No scars found.",
    emptyDescription: "Refresh the mock data and try again.",
    actions: [
      {
        id: "edit",
        label: "Edit scar",
        icon: "material-symbols:edit-outline-rounded",
      },
      {
        id: "hide",
        label: "Hide scar",
        icon: "material-symbols:visibility-off-outline-rounded",
        destructive: true,
      },
      {
        id: "delete",
        label: "Delete scar",
        icon: "material-symbols:delete-outline",
        destructive: true,
      },
    ],
  },
  "make-ups": {
    id: "make-ups",
    label: "Make Ups",
    singularLabel: "make up",
    icon: "material-symbols:face-retouching-natural-outline-rounded",
    errorTitle: "Failed to load make ups.",
    emptyTitle: "No make ups found.",
    emptyDescription: "Refresh the mock data and try again.",
    actions: [
      {
        id: "edit",
        label: "Edit make up",
        icon: "material-symbols:edit-outline-rounded",
      },
      {
        id: "hide",
        label: "Hide make up",
        icon: "material-symbols:visibility-off-outline-rounded",
        destructive: true,
      },
      {
        id: "delete",
        label: "Delete make up",
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
  return value === "routines" ||
    value === "colors" ||
    value === "scars" ||
    value === "make-ups";
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

export async function getAdminSkinCategoryCollection(): Promise<AdminSkinCategoryCollection> {
  // Fetch every category once so tab switches only slice the already cached
  // payload instead of mounting a different route with a brand-new request.
  const [routinesResponse, colorsResponse, scarsResponse, makeUpsResponse] =
    await Promise.all([
      getRoutines(),
      getColors(),
      getScars(),
      getMakeUps(),
    ]);

  return {
    routines: routinesResponse.data,
    colors: colorsResponse.data,
    scars: scarsResponse.data,
    "make-ups": makeUpsResponse.data,
  };
}
