"use client";

import { HeroSection } from "@/components/atomic/molecule/HeroSection";

const CATEGORY_LABELS = ["Routine", "Tone", "Make Up", "Concerns"];

export const HeroCard = () => {
  return (
    <HeroSection
      eyebrow="Your skin at a glance"
      title={
        <>
          Stay consistent,
          <br />
          glow naturally.
        </>
      }
      description="Track your daily routine, find the right tones, organize your make up, and monitor skin concerns — all in one place."
    >
      {/* Category pills */}
      <div className="flex flex-wrap gap-2 md:gap-3">
        {CATEGORY_LABELS.map((label) => (
          <span
            key={label}
            className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium backdrop-blur-sm md:px-5 md:py-2 md:text-sm"
          >
            {label}
          </span>
        ))}
      </div>
    </HeroSection>
  );
};
