"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { cn } from "@/util/cn";

interface DermalMetric {
  label: string;
  percent: number;
}

export interface ProfileGlassCardProps {
  fullName: string;
  email: string;
  dermalMetrics: DermalMetric[];
  editProfileHref?: string;
  className?: string;
  style?: React.CSSProperties;
}

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="flex items-center gap-2">
      {/* Track */}
      <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/20">
        {/* Fill uses foreground color */}
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-foreground transition-all duration-500"
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
        />
      </div>
      <span className="w-9 text-right text-xs font-medium text-foreground">
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

  return (
    <div
      className={cn(
        "relative rounded-3xl px-5 pb-5",
        // Glass effect: #3B3B3B at 20% opacity with backdrop blur
        "bg-[#3B3B3B]/20 backdrop-blur-md",
        "border border-white/10",
        className,
      )}
      style={style}
    >
      {/* Edit profile button — top-right corner */}
      <Link
        href={editProfileHref}
        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-foreground/15 text-foreground/90 transition-transform hover:scale-105 active:scale-95"
        aria-label="Edit profile"
      >
        <Icon icon="mdi:pencil" width={16} height={16} />
      </Link>

      {/* Identity */}
      <div className="mb-4">
        <p className="truncate text-base font-semibold text-foreground leading-tight">
          {fullName}
        </p>
        <p className="truncate text-xs text-foreground/60 mt-0.5">{email}</p>
      </div>

      {/* Dermal progress section — single total bar only */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-foreground/50">
          Dermal Progress
        </span>
        <ProgressBar percent={totalPercent} />
      </div>
    </div>
  );
}
