import type { ListAdminUserSkinTreatPayload } from "backend-service/admin/user/skin-treat/types";
import type { ListToolbarOption } from "components/atomic/molecule/ListToolbar";

export type AdminUserSkinTreatSortValue =
  | "updated-at-desc"
  | "updated-at-asc"
  | "name-asc"
  | "name-desc";

export const DEFAULT_ADMIN_USER_SKIN_TREAT_SORT_VALUE: AdminUserSkinTreatSortValue =
  "updated-at-desc";

export const ADMIN_USER_SKIN_TREAT_SORT_OPTIONS: ListToolbarOption<AdminUserSkinTreatSortValue>[] =
  [
    { value: "updated-at-desc", label: "Terbaru diperbarui" },
    { value: "updated-at-asc", label: "Terlama diperbarui" },
    { value: "name-asc", label: "Nama A-Z" },
    { value: "name-desc", label: "Nama Z-A" },
  ];

const ADMIN_USER_SKIN_TREAT_SORT_REQUEST_MAP: Record<
  AdminUserSkinTreatSortValue,
  NonNullable<ListAdminUserSkinTreatPayload["sort"]>[number]
> = {
  "updated-at-desc": {
    field: "updated_at",
    direction: "DESC",
  },
  "updated-at-asc": {
    field: "updated_at",
    direction: "ASC",
  },
  "name-asc": {
    field: "name",
    direction: "ASC",
  },
  "name-desc": {
    field: "name",
    direction: "DESC",
  },
};

export function getAdminUserSkinTreatSortRequest(
  sortValue: AdminUserSkinTreatSortValue,
) {
  return ADMIN_USER_SKIN_TREAT_SORT_REQUEST_MAP[sortValue];
}
