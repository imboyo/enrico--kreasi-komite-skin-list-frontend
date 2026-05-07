// Shared types for skin-treat endpoints

export type SkinTreatCategory = "routine" | "make_up" | "barrier" | "colors" | "scars";

export type SkinTreat = {
  uuid: string;
  name: string;
  description: string | null;
  category: SkinTreatCategory;
  created_at: string;
  updated_at: string;
};

export type SkinTreatListMeta = {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
};

export type SortDto = {
  field: string;
  direction: "ASC" | "DESC";
};

export type FilterDto = Record<string, unknown>;

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
};

export type UpdateSkinTreatResponse = SkinTreat;

export type DeleteSkinTreatResponse = {
  success: boolean;
  uuid: string;
};
