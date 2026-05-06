import type { AccountRole } from "@/store/auth/auth.types";
import { APP_URL } from "@/constant";

export function getAuthenticatedRedirect(role: AccountRole | undefined): string {
  return role === "ADMIN" ? APP_URL.ADMIN : APP_URL.APP;
}