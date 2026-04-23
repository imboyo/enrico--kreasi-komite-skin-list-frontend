"use client";

import { useState } from "react";
import { EditableAvatar } from "@/components/atomic/molecule/EditableAvatar";
import { HeroSection } from "@/components/atomic/molecule/HeroSection";
import { ProfileGlassCard } from "@/components/atomic/molecule/ProfileGlassCard";

const MOCK_DERMAL_METRICS = [
  { label: "Hydration", percent: 72 },
  { label: "Elasticity", percent: 58 },
  { label: "Barrier Strength", percent: 65 },
  { label: "Radiance", percent: 80 },
];

const AVATAR_SIZE = 120;
// How many px of the avatar bottom half overlaps the card
const AVATAR_OVERLAP = AVATAR_SIZE / 2 + 8;

export function ProfileHeroSection() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageChange = (file: File) => {
    // In a real app, upload the file to a server. For now, preview locally.
    const url = URL.createObjectURL(file);
    setProfileImage(url);
  };

  return (
    <HeroSection
      eyebrow="Profile"
      title="Keep your details and skin progress up to date."
      description="Update your avatar, review your account info, and keep your skincare journey aligned in one place."
    >
      {/* Profile summary card */}
      <div className="relative flex flex-col items-center pt-2">
        {/* Avatar sits above the card, centred horizontally, z-indexed on top */}
        <div className="relative z-10" style={{ marginBottom: -AVATAR_OVERLAP }}>
          <EditableAvatar
            imageUrl={profileImage}
            onImageChange={handleImageChange}
            size={AVATAR_SIZE}
          />
        </div>

        {/* Glass card starts behind/below the avatar bottom half */}
        <ProfileGlassCard
          fullName="Enrico Kreasi"
          email="imbomabrur0906@gmail.com"
          dermalMetrics={MOCK_DERMAL_METRICS}
          editProfileHref="/app/profile/info"
          tone="hero"
          className="w-full"
          style={{ paddingTop: AVATAR_OVERLAP + 12 }}
        />
      </div>
    </HeroSection>
  );
}
