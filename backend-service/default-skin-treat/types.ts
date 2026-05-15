import type { FilterDto, FilterItem, FilterOperator, SortDto } from "../user/common-dto";

export type { FilterDto, FilterItem, FilterOperator, SortDto };

export type DefaultSkinTreatCategory =
  | "routine"
  | "make_up"
  | "barrier"
  | "colors"
  | "scars"
  | "contour"
  | "fats"
  | "hairs";

export type DefaultSkinTreatListField =
  | "uuid"
  | "name"
  | "description"
  | "category"
  | "created_at"
  | "updated_at";

export type DefaultSkinTreatSortDto<
  TField extends string = DefaultSkinTreatListField,
> = SortDto & {
  field: TField;
};

export type DefaultSkinTreatFilterItem<
  TField extends string = DefaultSkinTreatListField,
> = FilterItem & {
  field: TField;
  operator: FilterOperator;
};

export type DefaultSkinTreatFilterDto<
  TField extends string = DefaultSkinTreatListField,
> = {
  and?: DefaultSkinTreatFilterItem<TField>[];
  or?: DefaultSkinTreatFilterItem<TField>[];
};

export type DefaultSkinTreat = {
  uuid: string;
  name: string;
  description: string | null;
  category: DefaultSkinTreatCategory;
  created_at: string;
  updated_at: string;
};

export type DefaultSkinTreatListMeta = {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
};

export type ListDefaultSkinTreatPayload = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: DefaultSkinTreatSortDto[];
  filter?: DefaultSkinTreatFilterDto;
};

export type ListDefaultSkinTreatResponse = {
  data: DefaultSkinTreat[];
  meta: DefaultSkinTreatListMeta;
};
