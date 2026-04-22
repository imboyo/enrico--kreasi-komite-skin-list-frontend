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
    >
      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORY_LABELS.map((label) => (
          <span
            key={label}
            className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm"
          >
            {label}
          </span>
        ))}
      </div>
    </HeroSection>
  );
};
