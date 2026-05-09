"use client";

import Image from "next/image";
import Link from "next/link";

import { useFilePreview } from "@/hooks/useFilePreview";

type ProfileAvatarLinkProps = {
  href: string;
  ariaLabel: string;
  photoUuid: string | null;
  fullName?: string | null;
};

export function ProfileAvatarLink({
  href,
  ariaLabel,
  photoUuid,
  fullName,
}: ProfileAvatarLinkProps) {
  // Resolve the stored file UUID into a local blob URL so the avatar can be
  // rendered consistently anywhere this atom is reused.
  const { url: avatarUrl } = useFilePreview(photoUuid);

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
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
        // Show a stable initial while the avatar is loading or when no profile
        // photo has been uploaded yet.
        <span className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
          {fullName?.charAt(0)?.toUpperCase() ?? "?"}
        </span>
      )}
    </Link>
  );
}
