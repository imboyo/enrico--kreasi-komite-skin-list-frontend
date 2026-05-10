export type AdminDefaultSkinCareCategory =
  | "routine"
  | "make_up"
  | "barrier"
  | "colors"
  | "scars";

export type AdminDefaultSkinCareSortDirection = "ASC" | "DESC";

export type AdminDefaultSkinCareSortDto<TField extends string = string> = {
  field: TField;
  direction: AdminDefaultSkinCareSortDirection;
};

export type AdminDefaultSkinCareFilterOperator =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "like"
  | "ilike"
  | "in"
  | "notIn"
  | "isNull"
  | "isNotNull"
  | "between"
  | "notBetween";

export type AdminDefaultSkinCareFilterItem<TField extends string = string> = {
  field: TField;
  operator: AdminDefaultSkinCareFilterOperator;
  value?: unknown;
};

export type AdminDefaultSkinCareFilterDto<TField extends string = string> = {
  and?: AdminDefaultSkinCareFilterItem<TField>[];
  or?: AdminDefaultSkinCareFilterItem<TField>[];
};

export type AdminDefaultSkinCareListField =
  | "uuid"
  | "name"
  | "description"
  | "category"
  | "created_at"
  | "updated_at";

export type AdminDefaultSkinCare = {
  uuid: string;
  name: string;
  description: string | null;
  category: AdminDefaultSkinCareCategory;
  created_at: string;
  updated_at: string;
};

export type ListAdminDefaultSkinCarePayload = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: AdminDefaultSkinCareSortDto<AdminDefaultSkinCareListField>[];
  filter?: AdminDefaultSkinCareFilterDto<AdminDefaultSkinCareListField>;
};

export type AdminDefaultSkinCareListMeta = {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
};

export type ListAdminDefaultSkinCareResponse = {
  data: AdminDefaultSkinCare[];
  meta: AdminDefaultSkinCareListMeta;
};

export type AddAdminDefaultSkinCarePayload = {
  name: string;
  description?: string | null;
  category: AdminDefaultSkinCareCategory;
};

export type AddAdminDefaultSkinCareResponse = AdminDefaultSkinCare;

export type EditAdminDefaultSkinCarePayload = {
  name?: string;
  description?: string | null;
};

export type EditAdminDefaultSkinCareResponse = AdminDefaultSkinCare;

export type DeleteAdminDefaultSkinCareResponse = {
  success: boolean;
  uuid: string;
};
