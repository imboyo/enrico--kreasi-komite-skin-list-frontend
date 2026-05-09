"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useToast } from "components/provider/Toast";
import { useAuthStore } from "store/auth/auth.store";
import { uploadPhotoProfile } from "@/backend-service/index";
import { useFilePreview } from "hooks/useFilePreview";

// Manages the optimistic-preview + server-upload flow for the profile photo.
// Pass enabled=false to skip the file fetch entirely (avoids unnecessary requests).
export function useAvatarUpload(enabled: boolean) {
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const { userInfo, setUserInfo } = useAuthStore();
  const { showToast } = useToast();

  const { url: fetchedPreview, isLoading: isFetchedPreviewLoading } = useFilePreview(
    enabled ? (userInfo?.photoProfile ?? null) : null,
  );

  // Revoke the blob URL when it changes or the component unmounts
  useEffect(() => {
    if (!localPreview) return;
    return () => URL.revokeObjectURL(localPreview);
  }, [localPreview]);

  const mutation = useMutation({
    mutationFn: (file: File) => uploadPhotoProfile(file),
    onSuccess: (data) => {
      setLocalPreview(null);
      // Patch only the photo UUID so useFilePreview re-fetches from the server
      if (userInfo) {
        setUserInfo({ ...userInfo, photoProfile: data.uuid });
      }
      showToast("Foto profil berhasil diperbarui.", { variant: "success" });
    },
    onError: () => {
      // Drop the optimistic blob so the last good server photo shows again
      setLocalPreview(null);
      showToast("Gagal mengunggah foto. Silakan coba lagi.", { variant: "error" });
    },
  });

  function upload(file: File) {
    setLocalPreview(URL.createObjectURL(file));
    mutation.mutate(file);
  }

  return {
    // localPreview takes priority; falls back to the server-fetched blob
    preview: localPreview ?? fetchedPreview,
    isPreviewLoading: !localPreview && isFetchedPreviewLoading,
    isPending: mutation.isPending,
    upload,
  };
}
