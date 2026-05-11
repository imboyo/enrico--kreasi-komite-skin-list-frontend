export type LoginPayload = {
  email?: string;
  phone_number?: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
};

export type LoginChainPayload = {
  email?: string;
  phone_number?: string;
  password: string;
};

export type LoginChainResponse = {
  message: string;
};

export type LoginVerifyPayload = {
  email?: string;
  phone_number?: string;
  otp_code: string;
};

export type LoginVerifyResponse = {
  access_token: string;
  refresh_token: string;
};

export type RefreshTokenPayload = {
  refresh_token: string;
};

export type RefreshTokenResponse = {
  access_token: string;
  refresh_token: string;
};

export type ForgotPasswordChainPayload = {
  email?: string;
  phone_number?: string;
};

export type ForgotPasswordChainResponse = {
  message: string;
};

export type ForgotPasswordVerifyPayload = {
  email?: string;
  phone_number?: string;
  otp_code: string;
};

export type ForgotPasswordVerifyResponse = {
  reset_token: string;
};

export type ForgotPasswordResetPayload = {
  reset_token: string;
  new_password: string;
};

export type ForgotPasswordResetResponse = {
  success: boolean;
  uuid: string;
};

export type AddAdminAccountPayload = {
  super_admin_key: string;
  full_name: string;
  email?: string;
  phone_number: string;
  password: string;
};

export type AddAdminAccountResponse = {
  message: string;
};

export type RegisterPayload = {
  full_name: string;
  phone_number: string;
  password: string;
};

export type RegisterResponse = {
  message: string;
};

export type RegisterDirectPayload = {
  full_name: string;
  phone_number: string;
  password: string;
};

export type RegisterDirectResponse = {
  access_token: string;
  refresh_token: string;
};

export type RegisterVerifyPayload = {
  phone_number: string;
  otp_code: string;
};

export type RegisterVerifyResponse = {
  message: string;
};
