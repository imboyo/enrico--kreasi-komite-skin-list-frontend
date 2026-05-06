"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useIsHydrated } from "@/hooks/useIsHydrated";
import { useAuthStore } from "@/store/auth/auth.store";
import { getAuthenticatedRedirect } from "@/guard/util/get-authenticated-redirect";

type GuardNotLoginProps = {
  children: React.ReactNode;
};

export default function GuardNotLogin({ children }: GuardNotLoginProps) {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const userRole = useAuthStore(
    (state) => state.impersonatingAs?.role ?? state.userInfo?.role,
  );
  const isHydrated = useIsHydrated();

  useEffect(() => {
    if (!isHydrated) return;

    // Login should also respect the active session role so impersonated admins
    // do not bounce back into the admin area while using a user session.
    if (accessToken || refreshToken) {
      router.replace(getAuthenticatedRedirect(userRole));
    }
  }, [accessToken, isHydrated, refreshToken, router, userRole]);

  if (!isHydrated) {
    return null;
  }

  if (accessToken || refreshToken) {
    return null;
  }

  return <>{children}</>;
}
