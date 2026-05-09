"use client";

import { Icon } from "@iconify/react";

import { cn } from "libs/util/cn";

export type SkinTotalCardData = {
  key: string;
  label: string;
  icon: string;
  accentClassName: string;
  total: number;
};

type SkinTotalCardProps = {
  card: SkinTotalCardData;
  isLoading?: boolean;
};

export function SkinTotalCard({ card, isLoading = false }: SkinTotalCardProps) {
  const totalLabel = isLoading ? "..." : card.total.toString();

  return (
    <article className="flex min-h-35 flex-col justify-between rounded-2xl border border-border/70 bg-card/90 px-4 py-4 text-foreground shadow-[0_10px_30px_rgba(60,60,60,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
            card.accentClassName,
          )}
        >
          <Icon icon={card.icon} width={20} height={20} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-3xl font-semibold leading-none">{totalLabel}</p>
        <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
      </div>
    </article>
  );
}
