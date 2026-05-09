"use client";

import React, { useRef } from "react";
import { FullScreenLoading } from "components/atomic/molecule/FullScreenLoading";
import { cn } from "libs/util/cn";
import { useAvatarUpload } from "./useAvatarUpload";
import { useAvatarImageState } from "./useAvatarImageState";
import { AvatarMedia } from "./AvatarMedia";
import { AvatarEditTrigger } from "./AvatarEditTrigger";

export interface EditableAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl?: string | null;
  isImageLoading?: boolean;
  onImageChange?: (file: File) => void;
  enableProfilePhotoUpload?: boolean;
  size?: number;
}

export function EditableAvatar({
  imageUrl,
  isImageLoading = false,
  onImageChange,
  enableProfilePhotoUpload = false,
  size = 120,
  className,
  ...props
}: EditableAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { preview, isPreviewLoading, isPending, upload } =
    useAvatarUpload(enableProfilePhotoUpload);

  // Pick the active image source and loading state based on operating mode
  const resolvedImageUrl = enableProfilePhotoUpload ? preview : (imageUrl ?? null);
  const resolvedIsLoading = enableProfilePhotoUpload ? isPreviewLoading : isImageLoading;

  const { shouldShowImage, shouldShowLoading, onImageSettled } = useAvatarImageState(
    resolvedImageUrl,
    resolvedIsLoading,
  );

  const canEditAvatar = Boolean(onImageChange) || enableProfilePhotoUpload;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (enableProfilePhotoUpload) {
      upload(file);
      return;
    }
    onImageChange?.(file);
  }

  return (
    <>
      {/* Full-screen spinner while the upload request is in flight */}
      <FullScreenLoading
        visible={enableProfilePhotoUpload && isPending}
        message="Mengunggah foto profil..."
      />

      {/* Avatar container */}
      <div
        className={cn("relative inline-block", className)}
        style={{ width: size, height: size }}
        {...props}
      >
        <AvatarMedia
          size={size}
          imageUrl={resolvedImageUrl}
          shouldShowImage={shouldShowImage}
          shouldShowLoading={shouldShowLoading}
          onImageSettled={onImageSettled}
        />

        {/* Edit button — only rendered when editing is allowed */}
        {canEditAvatar && (
          <AvatarEditTrigger
            fileInputRef={fileInputRef}
            onChange={handleFileChange}
            onClick={() => fileInputRef.current?.click()}
          />
        )}
      </div>
    </>
  );
}
