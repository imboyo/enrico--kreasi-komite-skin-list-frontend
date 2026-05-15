export type AdminDefaultSkinCareCategory =
  | "routine"
  | "make_up"
  | "barrier"
  | "colors"
  | "scars"
  | "contour"
  | "fats"
  | "hairs";

export type AdminDefaultSkinCare = {
  uuid: string;
  name: string;
  description: string | null;
  category: AdminDefaultSkinCareCategory;
  created_at: string;
  updated_at: string;
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
