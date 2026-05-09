"use client";

import { EditableAvatar } from "components/atomic/molecule/editable-avatar/EditableAvatar";
import { HeroSection } from "@/components/atomic/molecule/HeroSection";
import { ProfileGlassCard } from "@/components/atomic/molecule/ProfileGlassCard";
import { useAuthStore } from "@/store/auth/auth.store";

const MOCK_DERMAL_METRICS = [
  { label: "Hidrasi", percent: 72 },
  { label: "Elastisitas", percent: 58 },
  { label: "Kekuatan Barrier", percent: 65 },
  { label: "Kecerahan", percent: 80 },
];

const AVATAR_SIZE = 120;

export function ProfileHeroSection() {
  const { userInfo } = useAuthStore();

  return (
    <HeroSection
      eyebrow="Profil"
      title="Jaga info akun dan progres skin kamu tetap terbaru."
      description="Perbarui avatar, cek info akun, dan pastikan perjalanan skincare kamu tetap selaras di satu tempat."
      className="px-5 py-6 md:px-8 lg:px-10"
    >
      {/* Hero body */}
      <div className="mx-auto flex max-w-96 flex-col items-center gap-4">
        <EditableAvatar enableProfilePhotoUpload size={AVATAR_SIZE} />

        <ProfileGlassCard
          fullName={userInfo?.fullName ?? ""}
          email={userInfo?.email ?? ""}
          dermalMetrics={MOCK_DERMAL_METRICS}
          editProfileHref="/app/profile/info"
          tone="hero"
          className="w-full"
        />
      </div>
    </HeroSection>
  );
}
