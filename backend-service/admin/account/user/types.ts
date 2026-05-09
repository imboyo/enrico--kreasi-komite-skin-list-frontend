import type {
  AccountListPayload,
  AccountListResponse,
  AccountPasswordPayload,
  AccountPasswordResponse,
  AccountRecord,
  AccountStatus,
  AdminAccountDeleteResponse,
} from "../types";

export type UserAccount = AccountRecord<"USER">;

export type ListUserAccountPayload = AccountListPayload;

export type ListUserAccountResponse = AccountListResponse<UserAccount>;

export type UpdateUserAccountPayload = {
  full_name?: string;
  email?: string | null;
  phone_number?: string;
  status?: AccountStatus;
};

export type UpdateUserAccountResponse = UserAccount;

export type ChangeUserPasswordPayload = AccountPasswordPayload;

export type ChangeUserPasswordResponse = AccountPasswordResponse;

export type DeleteUserAccountResponse = AdminAccountDeleteResponse;
