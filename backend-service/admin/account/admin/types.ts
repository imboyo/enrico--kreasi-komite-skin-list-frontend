import type {
  AccountListPayload,
  AccountListResponse,
  AccountPasswordPayload,
  AccountPasswordResponse,
  AccountRecord,
  AccountStatus,
  AdminAccountDeleteResponse,
} from "../types";

export type AdminAccount = AccountRecord<"ADMIN">;

export type ListAdminAccountPayload = AccountListPayload;

export type ListAdminAccountResponse = AccountListResponse<AdminAccount>;

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
