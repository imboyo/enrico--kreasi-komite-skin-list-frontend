import type { ListAdminDefaultSkinCarePayload } from "backend-service/admin/default-skin-care";
import type { ListToolbarOption } from "components/atomic/molecule/ListToolbar";

export type AdminSkinSortValue =
  | "updated-at-desc"
  | "updated-at-asc"
  | "name-asc"
  | "name-desc";

export const DEFAULT_ADMIN_SKIN_SORT_VALUE: AdminSkinSortValue =
  "updated-at-desc";

export const ADMIN_SKIN_SORT_OPTIONS: ListToolbarOption<AdminSkinSortValue>[] =
  [
    { value: "updated-at-desc", label: "Terbaru diperbarui" },
    { value: "updated-at-asc", label: "Terlama diperbarui" },
    { value: "name-asc", label: "Nama A-Z" },
    { value: "name-desc", label: "Nama Z-A" },
  ];

const ADMIN_SKIN_SORT_REQUEST_MAP: Record<
  AdminSkinSortValue,
  NonNullable<ListAdminDefaultSkinCarePayload["sort"]>[number]
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

export function getAdminSkinSortRequest(sortValue: AdminSkinSortValue) {
  return ADMIN_SKIN_SORT_REQUEST_MAP[sortValue];
}
