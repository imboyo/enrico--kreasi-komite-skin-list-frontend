"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useIsHydrated } from "@/hooks/useIsHydrated";
import { useAuthStore } from "@/store/auth/auth.store";
import { APP_URL } from "@/constant";
import type { AccountRole } from "@/store/auth/auth.types";

type GuardLoginProps = {
  children: React.ReactNode;
  /**
   * Roles that are permitted to view this section.
   * When a new role is added to AccountRole, just include it here as needed.
   */
  allowedRoles: AccountRole[];
};

export default function GuardLogin({ children, allowedRoles }: GuardLoginProps) {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const userInfo = useAuthStore((state) => state.userInfo);
  const impersonatingAs = useAuthStore((state) => state.impersonatingAs);
  const isHydrated = useIsHydrated();

  // The active route guard must follow the current session identity.
  // During impersonation, tokens belong to the impersonated user, so the
  // allowed role should come from that session before falling back to the
  // original signed-in account.
  const activeUser = impersonatingAs ?? userInfo;
  const resolvedRole = activeUser?.role;
  const isAuthenticated = Boolean(accessToken || refreshToken);
  const isAllowed = resolvedRole !== undefined && allowedRoles.includes(resolvedRole);

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      router.replace(APP_URL.LOGIN);
      return;
    }

    if (!isAllowed) {
      // Keep each section exclusive by bouncing to the active session's home.
      const fallback = resolvedRole === "ADMIN" ? APP_URL.ADMIN : APP_URL.APP;
      router.replace(fallback);
    }
  }, [isAuthenticated, isAllowed, isHydrated, resolvedRole, router]);

  if (!isHydrated) return null;
  if (!isAuthenticated || !isAllowed) return null;

  return <>{children}</>;
}
