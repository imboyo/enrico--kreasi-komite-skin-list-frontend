// Shared types for skin-treat endpoints

import type { SortDto, FilterDto, FilterItem, FilterOperator } from "../common-dto";
export type { SortDto, FilterDto, FilterItem, FilterOperator };

export type SkinTreatCategory =
  | "routine"
  | "make_up"
  | "barrier"
  | "colors"
  | "scars"
  | "contour"
  | "fats"
  | "hairs";

export type SkinTreat = {
  uuid: string;
  name: string;
  description: string | null;
  category: SkinTreatCategory;
  is_check: boolean;
  created_at: string;
  updated_at: string;
};

export type SkinTreatListMeta = {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
};

export type ListSkinTreatPayload = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: SortDto[];
  filter?: FilterDto;
};

export type ListSkinTreatResponse = {
  data: SkinTreat[];
  meta: SkinTreatListMeta;
};

export type CreateSkinTreatPayload = {
  name: string;
  description?: string | null;
  category: SkinTreatCategory;
};

export type CreateSkinTreatResponse = SkinTreat;

export type UpdateSkinTreatPayload = {
  name?: string;
  description?: string | null;
  category?: SkinTreatCategory;
  is_check?: boolean;
};

export type UpdateSkinTreatResponse = SkinTreat;

export type DeleteSkinTreatResponse = {
  success: boolean;
  uuid: string;
};
