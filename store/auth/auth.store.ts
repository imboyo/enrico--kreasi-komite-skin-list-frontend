"use client";

import { create } from "zustand";
import { APP_URL, LOCAL_STORAGE_KEY } from "constant";
import { isBrowser } from "libs/util/is-browser";
import type { AuthStore } from "./auth.types";
import { readStoredUserInfo } from "@/store/auth/read-stored-user-info";
import { persistUserInfo } from "@/store/auth/persist-user-info";
import { removeFromStorage } from "@/store/auth/remove-from-storage";

export const useAuthStore = create<AuthStore>((set, get) => ({
  // Hydrate initial state from localStorage on first load
  accessToken: isBrowser()
    ? localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
    : null,
  refreshToken: isBrowser()
    ? localStorage.getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN)
    : null,
  userInfo: readStoredUserInfo(),
  // Impersonation is session-only because the active userInfo comes from the current session.
  isImpersonating: false,
  // Admin's stashed tokens while impersonating — session-only
  adminAccessToken: null,
  adminRefreshToken: null,

  setAuth: (accessToken, refreshToken, userInfo) => {
    if (isBrowser()) {
      localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
      localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
    }
    persistUserInfo(userInfo);
    set({ accessToken, refreshToken, userInfo });
  },

  setTokens: (accessToken, refreshToken) => {
    // During impersonation, refresh updates the active (user) tokens in localStorage
    if (isBrowser()) {
      localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
      localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
    }
    set({ accessToken, refreshToken });
  },

  setUserInfo: (userInfo) => {
    persistUserInfo(userInfo);
    set({ userInfo });
  },

  clearAuth: () => {
    removeFromStorage(
      LOCAL_STORAGE_KEY.ACCESS_TOKEN,
      LOCAL_STORAGE_KEY.REFRESH_TOKEN,
      LOCAL_STORAGE_KEY.USER_INFO,
    );
    set({
      accessToken: null,
      refreshToken: null,
      userInfo: null,
      isImpersonating: false,
      adminAccessToken: null,
      adminRefreshToken: null,
    });

    // Redirect to the beta login-direct page after logout
    if (isBrowser()) {
      window.location.href = APP_URL.LOGIN_DIRECT;
    }
  },

  startImpersonation: (userAccessToken, userRefreshToken) => {
    const { accessToken, refreshToken } = get();
    // Stash admin's current tokens in memory, then swap main tokens to the user's
    if (isBrowser()) {
      localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, userAccessToken);
      localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, userRefreshToken);
    }
    set({
      isImpersonating: true,
      adminAccessToken: accessToken,
      adminRefreshToken: refreshToken,
      accessToken: userAccessToken,
      refreshToken: userRefreshToken,
    });
  },

  stopImpersonation: () => {
    const { adminAccessToken, adminRefreshToken } = get();
    // Restore admin's original tokens and clear impersonation state
    if (isBrowser()) {
      if (adminAccessToken)
        localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, adminAccessToken);
      if (adminRefreshToken)
        localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, adminRefreshToken);
    }
    set({
      isImpersonating: false,
      adminAccessToken: null,
      adminRefreshToken: null,
      accessToken: adminAccessToken,
      refreshToken: adminRefreshToken,
    });
  },
}));
