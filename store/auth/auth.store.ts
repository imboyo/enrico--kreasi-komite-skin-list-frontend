"use client";

import { create } from "zustand";
import { LOCAL_STORAGE_KEY } from "constant";
import { isBrowser } from "libs/util/is-browser";
import type { AuthStore } from "./auth.types";
import { readStoredUserInfo } from "@/store/auth/read-stored-user-info";
import { persistUserInfo } from "@/store/auth/persist-user-info";
import { removeFromStorage } from "@/store/auth/remove-from-storage";

export const useAuthStore = create<AuthStore>((set) => ({
  // Hydrate initial state from localStorage on first load
  accessToken: isBrowser()
    ? localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)
    : null,
  refreshToken: isBrowser()
    ? localStorage.getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN)
    : null,
  userInfo: readStoredUserInfo(),

  setAuth: (accessToken, refreshToken, userInfo) => {
    if (isBrowser()) {
      localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
      localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
    }
    persistUserInfo(userInfo);
    set({ accessToken, refreshToken, userInfo });
  },

  setTokens: (accessToken, refreshToken) => {
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
    set({ accessToken: null, refreshToken: null, userInfo: null });
  },
}));
