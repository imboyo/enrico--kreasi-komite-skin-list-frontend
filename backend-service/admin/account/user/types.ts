import type {
  AccountListPayload,
  AccountListResponse,
  AccountPasswordPayload,
  AccountPasswordResponse,
  AdminAccountDeleteResponse,
  UserAccountListField,
  VisibleAccountRecord,
  VisibleAccountStatus,
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

export type UserAccount = VisibleAccountRecord<"USER"> & {
  profile_photo: UserProfilePhoto | null;
};

export type ListUserAccountPayload = AccountListPayload<UserAccountListField>;

export type ListUserAccountResponse = AccountListResponse<UserAccount>;

export type GetUserAccountResponse = UserAccount;

export type CreateUserAccountPayload = {
  full_name: string;
  email?: string | null;
  phone_number: string;
  password: string;
  status?: VisibleAccountStatus;
};

export type CreateUserAccountResponse = UserAccount;

export type UpdateUserAccountPayload = {
  full_name?: string;
  email?: string | null;
  phone_number?: string;
  status?: VisibleAccountStatus;
};

export type UpdateUserAccountResponse = UserAccount;

export type ChangeUserPasswordPayload = AccountPasswordPayload;

export type ChangeUserPasswordResponse = AccountPasswordResponse;

export type DeleteUserAccountResponse = AdminAccountDeleteResponse;
