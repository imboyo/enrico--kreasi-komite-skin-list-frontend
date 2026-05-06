// Topbar variant for app pages.
// Keep this wrapper thin so shared behavior stays in BaseTopbar while app-specific actions can be added later.
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { BaseTopbar } from "@/components/atomic/organism/topbar/BaseTopbar";
import { APP_URL } from "@/constant";
import { useAuthStore } from "@/store/auth/auth.store";
import { useFilePreview } from "@/hooks/useFilePreview";

// Routes that render their own topbar — suppress the shared AppTopbar here so
// we don't stack two headers on top of each other.
const SUPPRESSED_ROUTES = new Set<string>([APP_URL.APP_CHAT]);

export function AppTopbar() {
  const pathname = usePathname();
  const { userInfo } = useAuthStore();

  // Resolve the stored photo UUID to an authenticated blob URL (same pattern as ProfileHeroSection)
  const { url: avatarUrl } = useFilePreview(userInfo?.photoProfile ?? null);

  if (pathname && SUPPRESSED_ROUTES.has(pathname)) return null;

  return (
    <BaseTopbar
      rightSection={
        <Link
          href="/app/profile"
          aria-label="Open profile"
          className="block h-10 w-10 overflow-hidden rounded-full border border-border bg-muted"
        >
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="Profile photo"
              width={40}
              height={40}
              loading="eager"
              className="h-full w-full object-cover"
            />
          ) : (
            // Fallback placeholder shown while the blob URL is loading or when no photo is set
            <span className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
              {userInfo?.fullName?.charAt(0)?.toUpperCase() ?? "?"}
            </span>
          )}
        </Link>
      }
    />
  );
}
