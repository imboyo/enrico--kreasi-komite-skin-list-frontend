"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { cn } from "libs/util/cn";

interface DermalMetric {
  label: string;
  percent: number;
}

export interface ProfileGlassCardProps {
  fullName: string;
  email: string;
  dermalMetrics: DermalMetric[];
  editProfileHref?: string;
  tone?: "default" | "hero";
  className?: string;
  style?: React.CSSProperties;
}

function ProgressBar({
  percent,
  tone = "default",
}: {
  percent: number;
  tone?: "default" | "hero";
}) {
  const isHeroTone = tone === "hero";

  return (
    <div className="flex items-center gap-2">
      {/* Track */}
      <div
        className={cn(
          "relative h-1.5 flex-1 overflow-hidden rounded-full",
          isHeroTone ? "bg-white/20" : "bg-foreground/20",
        )}
      >
        {/* Fill uses foreground color */}
        <div
          className={cn(
            "absolute left-0 top-0 h-full rounded-full transition-all duration-500",
            isHeroTone ? "bg-white" : "bg-foreground",
          )}
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
        />
      </div>
      <span
        className={cn(
          "w-9 text-right text-xs font-medium",
          isHeroTone ? "text-primary-foreground" : "text-foreground",
        )}
      >
        {percent}%
      </span>
    </div>
  );
}

export function ProfileGlassCard({
  fullName,
  email,
  dermalMetrics,
  editProfileHref = "/app/profile/info",
  tone = "default",
  className,
  style,
}: ProfileGlassCardProps) {
  const totalPercent =
    dermalMetrics.length > 0
      ? Math.round(
          dermalMetrics.reduce((sum, m) => sum + m.percent, 0) /
            dermalMetrics.length,
        )
      : 0;

  const isHeroTone = tone === "hero";

  return (
    <div
      className={cn(
        "relative rounded-3xl px-5 pb-5",
        // Use a brighter glass style when the card sits inside a primary hero banner.
        isHeroTone
          ? "border border-white/20 bg-white/12 text-primary-foreground"
          : "border border-white/10 bg-[#3B3B3B]/20 text-foreground",
        "backdrop-blur-md",
        className,
      )}
      style={style}
    >
      {/* Edit profile button — top-right corner */}
      <Link
        href={editProfileHref}
        className={cn(
          "absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95",
          isHeroTone
            ? "bg-white/12 text-primary-foreground"
            : "bg-foreground/15 text-foreground/90",
        )}
        aria-label="Ubah profil"
      >
        <Icon icon="mdi:pencil" width={16} height={16} />
      </Link>

      {/* Identity */}
      <div className="mb-4">
        <p className="truncate text-base font-semibold leading-tight">
          {fullName}
        </p>
        <p
          className={cn(
            "mt-0.5 truncate text-xs",
            isHeroTone ? "text-primary-foreground/75" : "text-foreground/60",
          )}
        >
          {email}
        </p>
      </div>

      {/* Dermal progress section — single total bar only */}
      <div className="flex flex-col gap-2">
        <span
          className={cn(
            "text-xs font-medium uppercase tracking-wide",
            isHeroTone ? "text-primary-foreground/70" : "text-foreground/50",
          )}
        >
          Progres Dermal
        </span>
        <ProgressBar percent={totalPercent} tone={tone} />
      </div>
    </div>
  );
}
