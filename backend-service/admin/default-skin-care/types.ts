import type {
  DefaultSkinTreat,
  DefaultSkinTreatCategory,
  DefaultSkinTreatFilterDto,
  DefaultSkinTreatFilterItem,
  DefaultSkinTreatListField,
  DefaultSkinTreatListMeta,
  DefaultSkinTreatSortDto,
  ListDefaultSkinTreatPayload,
  ListDefaultSkinTreatResponse,
} from "backend-service/default-skin-treat";

export type AdminDefaultSkinTreatCategory = DefaultSkinTreatCategory;
export type AdminDefaultSkinTreatListField = DefaultSkinTreatListField;
export type AdminDefaultSkinTreatSortDto = DefaultSkinTreatSortDto;
export type AdminDefaultSkinTreatFilterItem = DefaultSkinTreatFilterItem;
export type AdminDefaultSkinTreatFilterDto = DefaultSkinTreatFilterDto;
export type AdminDefaultSkinTreat = DefaultSkinTreat;
export type AdminDefaultSkinTreatListMeta = DefaultSkinTreatListMeta;
export type ListAdminDefaultSkinTreatPayload = ListDefaultSkinTreatPayload;
export type ListAdminDefaultSkinTreatResponse = ListDefaultSkinTreatResponse;
export type AddAdminDefaultSkinTreatPayload = {
  name: string;
  description?: string | null;
  category: AdminDefaultSkinTreatCategory;
};
export type AddAdminDefaultSkinTreatResponse = AdminDefaultSkinTreat;
export type EditAdminDefaultSkinTreatPayload = {
  name?: string;
  description?: string | null;
};
export type EditAdminDefaultSkinTreatResponse = AdminDefaultSkinTreat;
export type DeleteAdminDefaultSkinTreatResponse = {
  success: boolean;
  uuid: string;
};
