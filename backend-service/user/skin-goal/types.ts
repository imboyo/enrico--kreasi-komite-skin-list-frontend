// Shared types for skin-goal endpoints

export type SkinGoal = {
  uuid: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type SkinGoalListMeta = {
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

export type ListSkinGoalPayload = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: SortDto[];
  filter?: FilterDto;
};

export type ListSkinGoalResponse = {
  data: SkinGoal[];
  meta: SkinGoalListMeta;
};

export type AddSkinGoalPayload = {
  name: string;
  description?: string | null;
};

export type AddSkinGoalResponse = SkinGoal;

export type UpdateSkinGoalPayload = {
  name?: string;
  description?: string | null;
};

export type UpdateSkinGoalResponse = SkinGoal;

export type DeleteSkinGoalResponse = {
  success: boolean;
  uuid: string;
};
