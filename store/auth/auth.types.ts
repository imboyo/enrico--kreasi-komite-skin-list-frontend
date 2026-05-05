export type AccountRole = "USER" | "ADMIN";

export type UserInfo = {
  uuid: string;
  fullName: string;
  photoProfile: string | null;
  role: AccountRole;
  email: string;
};

export type AuthStore = {
  accessToken: string | null;
  refreshToken: string | null;
  userInfo: UserInfo | null;
  // Set all auth state at once (e.g. after login)
  setAuth: (
    accessToken: string,
    refreshToken: string,
    userInfo: UserInfo,
  ) => void;
  // Update only tokens (e.g. after silent refresh)
  setTokens: (accessToken: string, refreshToken: string) => void;
  // Update only user info (e.g. after profile edit)
  setUserInfo: (userInfo: UserInfo) => void;
  // Clear everything on logout
  clearAuth: () => void;
};
