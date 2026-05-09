"use client";

import { ProfileAvatarLink } from "@/components/atomic/atom/ProfileAvatarLink";
import { BaseTopbar } from "@/components/atomic/organism/topbar/BaseTopbar";
import { APP_URL } from "@/constant";
import { useAuthStore } from "@/store/auth/auth.store";

export function AdminTopbar() {
  const { userInfo } = useAuthStore();

  return (
    <BaseTopbar
      rightSection={
        <ProfileAvatarLink
          href={APP_URL.ADMIN_PROFILE}
          ariaLabel="Edit profil admin"
          photoUuid={userInfo?.photoProfile ?? null}
          fullName={userInfo?.fullName}
        />
      }
    />
  );
}
