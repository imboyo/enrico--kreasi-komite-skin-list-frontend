"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useIsHydrated } from "@/hooks/useIsHydrated";
import { useAuthStore } from "@/store/auth/auth.store";
import { getAuthenticatedRedirect } from "@/guard/util/get-authenticated-redirect";
import { useToast } from "@/components/provider/Toast";

type GuardNotLoginProps = {
  children: React.ReactNode;
};

export default function GuardNotLogin({ children }: GuardNotLoginProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const userRole = useAuthStore((state) => state.userInfo?.role);
  const isHydrated = useIsHydrated();

  useEffect(() => {
    if (!isHydrated) return;

    // The guard only needs the role attached to the active session userInfo.
    if (accessToken || refreshToken) {
      showToast("Anda sudah login", { variant: "secondary" });
      router.replace(getAuthenticatedRedirect(userRole));
    }
  }, [accessToken, isHydrated, refreshToken, router, showToast, userRole]);

  if (!isHydrated) {
    return null;
  }

  if (accessToken || refreshToken) {
    return null;
  }

  return <>{children}</>;
}
