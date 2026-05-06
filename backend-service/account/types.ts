// Shared types reused across multiple account service files

export type ProfilePhoto = {
  uuid: string;
  original_name: string;
  filename: string;
  category: string;
  mime_type: string;
  size: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

export type AccountProfile = {
  uuid: string;
  full_name: string;
  email: string;
  phone_number: string;
  role: string;
  status: string;
  profile_photo: ProfilePhoto | null;
  auth_field_updated_at: string;
  created_at: string;
  updated_at: string;
};

export type AccountSuccessResponse = {
  success: boolean;
  uuid: string;
};

export type AccountMessageResponse = {
  message: string;
};

export type GetProfileResponse = AccountProfile;

export type UpdateAccountInfoPayload = {
  full_name?: string;
};

export type UpdateAccountInfoResponse = AccountProfile;

export type UploadPhotoProfilePayload = File;

export type UploadPhotoProfileResponse = {
  uuid: string;
  filename: string;
};

export type ChangePasswordPayload = {
  old_password: string;
  new_password: string;
};

export type ChangePasswordResponse = AccountSuccessResponse;

export type InitiateEmailChangePayload = {
  new_email: string;
};

export type InitiateEmailChangeResponse = AccountMessageResponse;

export type VerifyEmailChangePayload = {
  new_email: string;
  otp_code: string;
};

export type VerifyEmailChangeResponse = AccountSuccessResponse;

export type InitiatePhoneNumberChangePayload = {
  new_phone_number: string;
};

export type InitiatePhoneNumberChangeResponse = AccountMessageResponse;

export type VerifyPhoneNumberChangePayload = {
  new_phone_number: string;
  otp_code: string;
};

export type VerifyPhoneNumberChangeResponse = AccountSuccessResponse;

export type DeleteAccountResponse = AccountSuccessResponse;
