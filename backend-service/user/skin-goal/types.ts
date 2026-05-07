// Shared types for skin-goal endpoints

import type { SortDto, FilterDto } from "../common-dto";
export type { SortDto, FilterDto };

export type SkinGoal = {
  uuid: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  user: {
    uuid: string;
  };
};

export type SkinGoalListMeta = {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
};

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
