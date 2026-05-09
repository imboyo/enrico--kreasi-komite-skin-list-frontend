"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { EditableAvatar } from "@/components/atomic/molecule/EditableAvatar";
import { HeroSection } from "@/components/atomic/molecule/HeroSection";
import { ProfileGlassCard } from "@/components/atomic/molecule/ProfileGlassCard";
import { FullScreenLoading } from "@/components/atomic/molecule/FullScreenLoading";
import { useToast } from "@/components/provider/Toast";
import { useAuthStore } from "@/store/auth/auth.store";
import { uploadPhotoProfile } from "backend-service/account";
import { useFilePreview } from "@/hooks/useFilePreview";

const MOCK_DERMAL_METRICS = [
  { label: "Hidrasi", percent: 72 },
  { label: "Elastisitas", percent: 58 },
  { label: "Kekuatan Barrier", percent: 65 },
  { label: "Kecerahan", percent: 80 },
];

const AVATAR_SIZE = 120;
// How many px of the avatar bottom half overlaps the card
const AVATAR_OVERLAP = AVATAR_SIZE / 2 + 8;

export function ProfileHeroSection() {
  const { userInfo, setUserInfo } = useAuthStore();
  const { showToast } = useToast();

  // UUID of the stored profile photo — drives the authenticated file fetch
  const [photoUuid, setPhotoUuid] = useState<string | null>(
    userInfo?.photoProfile ?? null,
  );

  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const { url: fetchedPreview } = useFilePreview(photoUuid);
  const displayUrl = localPreview ?? fetchedPreview;

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadPhotoProfile(file),
    onSuccess: (data) => {
      // Switch to the permanent file UUID so useFilePreview re-fetches from the server
      setPhotoUuid(data.uuid);
      setLocalPreview(null);

      // Patch only the photo UUID in the auth store so other user info stays intact
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

  const handleImageChange = (file: File) => {
    // Show a local blob preview immediately while the upload is in flight
    setLocalPreview(URL.createObjectURL(file));
    uploadMutation.mutate(file);
  };

  return (
    <>
      {/* Full-screen loading blocks all interaction during upload */}
      <FullScreenLoading
        visible={uploadMutation.isPending}
        message="Mengunggah foto profil..."
      />

      <HeroSection
        eyebrow="Profil"
        title="Jaga info akun dan progres skin kamu tetap terbaru."
        description="Perbarui avatar, cek info akun, dan pastikan perjalanan skincare kamu tetap selaras di satu tempat."
      >
        {/* Profile summary card */}
        <div className="relative flex flex-col items-center pt-2">
          {/* Avatar sits above the card, centred horizontally, z-indexed on top */}
          <div className="relative z-10" style={{ marginBottom: -AVATAR_OVERLAP }}>
            <EditableAvatar
              imageUrl={displayUrl}
              onImageChange={handleImageChange}
              size={AVATAR_SIZE}
            />
          </div>

          {/* Glass card starts behind/below the avatar bottom half */}
          <ProfileGlassCard
            fullName={userInfo?.fullName ?? ""}
            email={userInfo?.email ?? ""}
            dermalMetrics={MOCK_DERMAL_METRICS}
            editProfileHref="/app/profile/info"
            tone="hero"
            className="w-full"
            style={{ paddingTop: AVATAR_OVERLAP + 12 }}
          />
        </div>
      </HeroSection>
    </>
  );
}
