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
  /**
   * When true (default), the guard resolves the role from the impersonated
   * user if an impersonation is active. Set to false to always check the real
   * logged-in user's role — use this for sections like /admin where the guard
   * must remain tied to the actual account, not the impersonation target.
   */
  respectImpersonation?: boolean;
};

export default function GuardLogin({
  children,
  allowedRoles,
  respectImpersonation = true,
}: GuardLoginProps) {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const userInfo = useAuthStore((state) => state.userInfo);
  const impersonatingAs = useAuthStore((state) => state.impersonatingAs);
  const isHydrated = useIsHydrated();

  // When respectImpersonation is true, use the impersonated user's role if active
  const resolvedRole = (respectImpersonation ? (impersonatingAs ?? userInfo) : userInfo)?.role;
  const isAuthenticated = Boolean(accessToken || refreshToken);
  const isAllowed = resolvedRole !== undefined && allowedRoles.includes(resolvedRole);

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      router.replace(APP_URL.LOGIN);
      return;
    }

    if (!isAllowed) {
      // Redirect to the section that matches the real user's role
      const fallback = userInfo?.role === "ADMIN" ? APP_URL.ADMIN : APP_URL.APP;
      router.replace(fallback);
    }
  }, [isAuthenticated, isAllowed, isHydrated, router, userInfo?.role]);

  if (!isHydrated) return null;
  if (!isAuthenticated || !isAllowed) return null;

  return <>{children}</>;
}
