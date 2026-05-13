import type { FilterOperator } from "../../user/common-dto";

export type AccountRole = "ADMIN" | "USER";

export type AccountStatus =
  | "INITIALIZING"
  | "ACTIVE"
  | "INACTIVE"
  | "TO_DELETED";

export type VisibleAccountStatus = Extract<AccountStatus, "ACTIVE" | "INACTIVE">;

export type AdminAccountSortDirection = "ASC" | "DESC";

export type AdminAccountSortDto<TField extends string = string> = {
  field: TField;
  direction: AdminAccountSortDirection;
};

export type AdminAccountFilterOperator = FilterOperator;

export type AdminAccountFilterItem<TField extends string = string> = {
  field: TField;
  operator: AdminAccountFilterOperator;
  value?: unknown;
};

export type AdminAccountFilterDto<TField extends string = string> = {
  and?: AdminAccountFilterItem<TField>[];
  or?: AdminAccountFilterItem<TField>[];
};

export type BaseAccountListField =
  | "uuid"
  | "full_name"
  | "email"
  | "phone_number"
  | "role"
  | "status"
  | "auth_field_updated_at"
  | "created_at"
  | "updated_at";

export type AdminAccountListField =
  | BaseAccountListField
  | "profile_photo.original_name";

export type UserAccountListField = BaseAccountListField;

export type AccountListMeta = {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
};

export type AccountListPayload<TField extends string = BaseAccountListField> = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: AdminAccountSortDto<TField>[];
  filter?: AdminAccountFilterDto<TField>;
};

export type AccountRecord<TRole extends AccountRole = AccountRole> = {
  uuid: string;
  full_name: string;
  email: string | null;
  phone_number: string;
  role: TRole;
  status: AccountStatus;
  auth_field_updated_at: string;
  created_at: string;
  updated_at: string;
};

export type VisibleAccountRecord<
  TRole extends AccountRole = AccountRole,
> = Omit<AccountRecord<TRole>, "status"> & {
  status: VisibleAccountStatus;
};

export type AccountListResponse<TAccount extends AccountRecord = AccountRecord> = {
  data: TAccount[];
  meta: AccountListMeta;
};

export type AccountPasswordPayload = {
  password: string;
};

export type AccountPasswordResponse = {
  success: boolean;
  uuid: string;
  auth_field_updated_at: string;
};

export type AdminAccountDeleteResponse = {
  success: boolean;
  uuid: string;
};
