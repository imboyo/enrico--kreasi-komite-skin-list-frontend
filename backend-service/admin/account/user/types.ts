import type {
  AccountListPayload,
  AccountListResponse,
  AccountPasswordPayload,
  AccountPasswordResponse,
  AccountRecord,
  AccountStatus,
  AdminAccountDeleteResponse,
  UserAccountListField,
} from "../types";

export type UserProfilePhoto = {
  uuid: string;
  original_name: string;
  filename: string;
  category: string;
  size: number;
  mime_type: string;
  path: string;
  created_at: string;
  updated_at: string;
};

export type UserAccount = AccountRecord<"USER"> & {
  profile_photo: UserProfilePhoto | null;
};

export type ListUserAccountPayload = AccountListPayload<UserAccountListField>;

export type ListUserAccountResponse = AccountListResponse<UserAccount>;

export type GetUserAccountResponse = UserAccount;

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
