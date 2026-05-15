import type { ListAdminDefaultSkinTreatPayload } from "backend-service/admin/default-skin-care";
import type { ListToolbarOption } from "components/atomic/molecule/ListToolbar";

export type AdminDefaultSkinTreatSortValue =
  | "updated-at-desc"
  | "updated-at-asc"
  | "name-asc"
  | "name-desc";

export const DEFAULT_ADMIN_DEFAULT_SKIN_TREAT_SORT_VALUE: AdminDefaultSkinTreatSortValue =
  "updated-at-desc";

export const ADMIN_DEFAULT_SKIN_TREAT_SORT_OPTIONS: ListToolbarOption<AdminDefaultSkinTreatSortValue>[] =
  [
    { value: "updated-at-desc", label: "Terbaru diperbarui" },
    { value: "updated-at-asc", label: "Terlama diperbarui" },
    { value: "name-asc", label: "Nama A-Z" },
    { value: "name-desc", label: "Nama Z-A" },
  ];

const ADMIN_DEFAULT_SKIN_TREAT_SORT_REQUEST_MAP: Record<
  AdminDefaultSkinTreatSortValue,
  NonNullable<ListAdminDefaultSkinTreatPayload["sort"]>[number]
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

export function getAdminDefaultSkinTreatSortRequest(
  sortValue: AdminDefaultSkinTreatSortValue,
) {
  return ADMIN_DEFAULT_SKIN_TREAT_SORT_REQUEST_MAP[sortValue];
}
