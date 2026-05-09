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
// How many px of the avatar bottom half overlaps the card
const AVATAR_OVERLAP = AVATAR_SIZE / 2 + 8;

export function ProfileHeroSection() {
  const { userInfo } = useAuthStore();

  return (
    <>
      <HeroSection
        eyebrow="Profil"
        title="Jaga info akun dan progres skin kamu tetap terbaru."
        description="Perbarui avatar, cek info akun, dan pastikan perjalanan skincare kamu tetap selaras di satu tempat."
      >
        {/* Profile summary card */}
        <div className="relative flex flex-col items-center pt-2">
          {/* Avatar sits above the card, centred horizontally, z-indexed on top */}
          <div className="relative z-10" style={{ marginBottom: -AVATAR_OVERLAP }}>
            <EditableAvatar enableProfilePhotoUpload size={AVATAR_SIZE} />
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
