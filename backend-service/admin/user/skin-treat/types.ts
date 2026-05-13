import type { FilterOperator } from "@/backend-service/index";
import type { VisibleAccountStatus } from "../../account/types";

export type AdminUserSkinTreatCategory =
  | "routine"
  | "make_up"
  | "barrier"
  | "colors"
  | "scars"
  | "contour"
  | "fats"
  | "hairs";

export type AdminUserSkinTreatSortDirection = "ASC" | "DESC";

export type AdminUserSkinTreatSortDto<TField extends string = string> = {
  field: TField;
  direction: AdminUserSkinTreatSortDirection;
};

export type AdminUserSkinTreatFilterOperator = FilterOperator;

export type AdminUserSkinTreatFilterItem<TField extends string = string> = {
  field: TField;
  operator: AdminUserSkinTreatFilterOperator;
  value?: unknown;
};

export type AdminUserSkinTreatFilterDto<TField extends string = string> = {
  and?: AdminUserSkinTreatFilterItem<TField>[];
  or?: AdminUserSkinTreatFilterItem<TField>[];
};

export type AdminUserSkinTreatListField =
  | "uuid"
  | "name"
  | "description"
  | "category"
  | "is_check"
  | "created_at"
  | "updated_at"
  | "user_account.full_name"
  | "user_account.created_at";

export type AdminUserSkinTreatFilterField =
  | "uuid"
  | "name"
  | "description"
  | "category"
  | "is_check"
  | "created_at"
  | "updated_at"
  | "user_account.uuid"
  | "user_account.full_name"
  | "user_account.email"
  | "user_account.phone_number"
  | "user_account.status";

export type AdminUserSkinTreatAccount = {
  uuid: string;
  full_name: string;
  email: string | null;
  phone_number: string;
  status: VisibleAccountStatus;
};

export type AdminUserSkinTreatOwner = {
  uuid: string;
  account: AdminUserSkinTreatAccount;
};

export type AdminUserSkinTreat = {
  uuid: string;
  name: string;
  description: string | null;
  category: AdminUserSkinTreatCategory;
  is_check: boolean;
  created_at: string;
  updated_at: string;
  user: AdminUserSkinTreatOwner;
};

export type AdminUserSkinTreatListMeta = {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
};

export type ListAdminUserSkinTreatPayload = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: AdminUserSkinTreatSortDto<AdminUserSkinTreatListField>[];
  filter?: AdminUserSkinTreatFilterDto<AdminUserSkinTreatFilterField>;
  populate?: string[];
};

export type ListAdminUserSkinTreatResponse = {
  data: AdminUserSkinTreat[];
  meta: AdminUserSkinTreatListMeta;
};

export type GetAdminUserSkinTreatResponse = AdminUserSkinTreat;

export type UpdateAdminUserSkinTreatPayload = {
  name?: string;
  description?: string | null;
  category?: AdminUserSkinTreatCategory;
  is_check?: boolean;
};

export type UpdateAdminUserSkinTreatResponse = AdminUserSkinTreat;

export type DeleteAdminUserSkinTreatResponse = {
  success: boolean;
  uuid: string;
};
