import { LOCAL_STORAGE_KEY } from "constant";
import { isBrowser } from "libs/util/is-browser";
import type { UserInfo } from "./auth.types";

export function readStoredUserInfo(): UserInfo | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY.USER_INFO);
    return raw ? (JSON.parse(raw) as UserInfo) : null;
  } catch {
    return null;
  }
}
