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
  const userRole = useAuthStore((state) => state.userInfo?.role);
  const isHydrated = useIsHydrated();

  useEffect(() => {
    if (!isHydrated) return;

    // Treat either persisted token as an authenticated local session, then pick
    // the destination from the stored role and fall back to the user app route.
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
