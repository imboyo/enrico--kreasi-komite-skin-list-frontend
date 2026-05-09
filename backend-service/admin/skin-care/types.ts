export type AdminSkinCareCategory =
  | "routine"
  | "make_up"
  | "barrier"
  | "colors"
  | "scars";

export type AdminSkinCareSortDirection = "ASC" | "DESC";

export type AdminSkinCareSortDto<TField extends string = string> = {
  field: TField;
  direction: AdminSkinCareSortDirection;
};

export type AdminSkinCareFilterOperator =
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

export type AdminSkinCareFilterItem<TField extends string = string> = {
  field: TField;
  operator: AdminSkinCareFilterOperator;
  value?: unknown;
};

export type AdminSkinCareFilterDto<TField extends string = string> = {
  and?: AdminSkinCareFilterItem<TField>[];
  or?: AdminSkinCareFilterItem<TField>[];
};

export type AdminSkinCareListField =
  | "uuid"
  | "name"
  | "description"
  | "category"
  | "created_at"
  | "updated_at";

export type AdminSkinCare = {
  uuid: string;
  name: string;
  description: string | null;
  category: AdminSkinCareCategory;
  created_at: string;
  updated_at: string;
};

export type ListAdminSkinCarePayload = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: AdminSkinCareSortDto<AdminSkinCareListField>[];
  filter?: AdminSkinCareFilterDto<AdminSkinCareListField>;
};

export type AdminSkinCareListMeta = {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
};

export type ListAdminSkinCareResponse = {
  data: AdminSkinCare[];
  meta: AdminSkinCareListMeta;
};

export type AddAdminSkinCarePayload = {
  name: string;
  description?: string | null;
  category: AdminSkinCareCategory;
};

export type AddAdminSkinCareResponse = AdminSkinCare;

export type EditAdminSkinCarePayload = {
  name?: string;
  description?: string | null;
};

export type EditAdminSkinCareResponse = AdminSkinCare;

export type DeleteAdminSkinCareResponse = {
  success: boolean;
  uuid: string;
};
