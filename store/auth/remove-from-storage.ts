import { isBrowser } from "libs/util/is-browser";

export function removeFromStorage(...keys: string[]): void {
  if (!isBrowser()) return;
  try {
    keys.forEach((key) => localStorage.removeItem(key));
  } catch {
    // Silently ignore
  }
}
