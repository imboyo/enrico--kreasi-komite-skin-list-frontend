// Topbar variant for app pages.
// Keep this wrapper thin so shared behavior stays in BaseTopbar while app-specific actions can be added later.
"use client";

import { usePathname } from "next/navigation";

import { ProfileAvatarLink } from "@/components/atomic/atom/ProfileAvatarLink";
import { BaseTopbar } from "@/components/atomic/organism/topbar/BaseTopbar";
import { APP_URL } from "@/constant";
import { useAuthStore } from "@/store/auth/auth.store";

// Routes that render their own topbar — suppress the shared AppTopbar here so
// we don't stack two headers on top of each other.
const SUPPRESSED_ROUTES = new Set<string>([APP_URL.APP_CHAT]);

export function AppTopbar() {
  const pathname = usePathname();
  const { userInfo } = useAuthStore();

  if (pathname && SUPPRESSED_ROUTES.has(pathname)) return null;

  return (
    <BaseTopbar
      rightSection={
        <ProfileAvatarLink
          href={APP_URL.APP_PROFILE}
          ariaLabel="Open profile"
          photoUuid={userInfo?.photoProfile ?? null}
          fullName={userInfo?.fullName}
        />
      }
    />
  );
}
