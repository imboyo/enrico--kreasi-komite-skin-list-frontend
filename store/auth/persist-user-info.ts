import { LOCAL_STORAGE_KEY } from "constant";
import { isBrowser } from "libs/util/is-browser";
import type { UserInfo } from "./auth.types";

export function persistUserInfo(userInfo: UserInfo): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY.USER_INFO, JSON.stringify(userInfo));
  } catch {
    // Silently ignore — store state is still updated
    console.error("Failed to persist user info");
  }
}
