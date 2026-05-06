"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getProfile } from "@/backend-service";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import { HttpError } from "libs/error/http-error";
import { useAuthStore } from "@/store/auth/auth.store";
import { APP_URL } from "@/constant";
import type { AccountRole } from "@/store/auth/auth.types";
import { useToast } from "@/components/provider/Toast";

type GuardLoginProps = {
  children: React.ReactNode;
  /**
   * Roles that are permitted to view this section.
   * When a new role is added to AccountRole, just include it here as needed.
   */
  allowedRoles: AccountRole[];
};

export default function GuardLogin({
  children,
  allowedRoles,
}: GuardLoginProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const isImpersonating = useAuthStore((state) => state.isImpersonating);
  const userInfo = useAuthStore((state) => state.userInfo);
  const setUserInfo = useAuthStore((state) => state.setUserInfo);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const isHydrated = useIsHydrated();
  const localRole = userInfo?.role;
  const sessionKey = `${accessToken ?? ""}:${refreshToken ?? ""}`;
  const [verifiedSession, setVerifiedSession] = useState<{
    role: AccountRole;
    sessionKey: string;
  } | null>(null);

  const isAuthenticated = Boolean(accessToken || refreshToken);
  const isSessionVerified = verifiedSession?.sessionKey === sessionKey;
  const isAllowed =
    verifiedSession !== null && allowedRoles.includes(verifiedSession.role);

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      showToast("Silakan login terlebih dahulu", { variant: "error" });
      router.replace(APP_URL.LOGIN);
      return;
    }

    let isCancelled = false;

    const verifySession = async () => {
      try {
        // The backend profile endpoint is the source of truth for whether the
        // current tokens still belong to an active, allowed account.
        const profile = await getProfile();
        if (isCancelled) return;

        const backendRole: AccountRole =
          profile.role === "ADMIN" ? "ADMIN" : "USER";

        // Keep the store aligned with the active tokens so impersonation can
        // rely on the current backend profile instead of a duplicated local one.
        setUserInfo({
          uuid: profile.uuid,
          fullName: profile.full_name,
          photoProfile: profile.profile_photo?.uuid ?? null,
          role: backendRole,
          email: profile.email,
        });
        setVerifiedSession({ role: backendRole, sessionKey });

        if (!allowedRoles.includes(backendRole)) {
          // Keep each section exclusive by bouncing to the verified session's home.
          const fallback =
            backendRole === "ADMIN" ? APP_URL.ADMIN : APP_URL.APP;
          showToast("Anda tidak memiliki akses ke halaman ini", { variant: "error" });
          router.replace(fallback);
        }
      } catch (error) {
        if (isCancelled) return;

        if (error instanceof HttpError && [401, 403].includes(error.status)) {
          clearAuth();
          showToast("Sesi Anda telah berakhir, silakan login kembali", { variant: "error" });
          router.replace(APP_URL.LOGIN);
          return;
        }

        // If the backend is temporarily unavailable, keep the local role so an
        // otherwise valid session does not get stranded on a blank screen.
        if (!isImpersonating && localRole) {
          setVerifiedSession({ role: localRole, sessionKey });
          if (!allowedRoles.includes(localRole)) {
            const fallback =
              localRole === "ADMIN" ? APP_URL.ADMIN : APP_URL.APP;
            showToast("Anda tidak memiliki akses ke halaman ini", { variant: "error" });
            router.replace(fallback);
          }
        }
      }
    };

    void verifySession();

    return () => {
      isCancelled = true;
    };
  }, [
    allowedRoles,
    clearAuth,
    isAuthenticated,
    isHydrated,
    isImpersonating,
    localRole,
    router,
    sessionKey,
    setUserInfo,
  ]);

  if (!isHydrated) return null;
  if (!isAuthenticated || !isSessionVerified || !isAllowed) return null;

  return <>{children}</>;
}
