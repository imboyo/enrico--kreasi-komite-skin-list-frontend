import type {
  AccountListPayload,
  AccountListResponse,
  AccountPasswordPayload,
  AccountPasswordResponse,
  AccountRecord,
  AccountStatus,
  AdminAccountDeleteResponse,
  AdminAccountListField,
} from "../types";

export type AdminProfilePhoto = {
  uuid: string;
  original_name: string;
  category: string;
  mime_type: string;
  size: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

export type AdminAccount = AccountRecord<"ADMIN"> & {
  profile_photo: AdminProfilePhoto | null;
};

export type ListAdminAccountPayload = AccountListPayload<AdminAccountListField>;

export type ListAdminAccountResponse = AccountListResponse<AdminAccount>;

export type GetAdminAccountResponse = AdminAccount;

export type CreateAdminAccountPayload = {
  full_name: string;
  email?: string | null;
  phone_number: string;
  password: string;
  status?: AccountStatus;
};

export type CreateAdminAccountResponse = AdminAccount;

export type UpdateAdminAccountPayload = {
  full_name?: string;
  email?: string | null;
  phone_number?: string;
  status?: AccountStatus;
};

export type UpdateAdminAccountResponse = AdminAccount;

export type ChangeAdminPasswordPayload = AccountPasswordPayload;

export type ChangeAdminPasswordResponse = AccountPasswordResponse;

export type DeleteAdminAccountResponse = AdminAccountDeleteResponse;
