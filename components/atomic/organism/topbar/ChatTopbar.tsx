"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { ReactNode } from "react";

interface ChatTopbarProps {
  backHref: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  rightSection?: ReactNode;
}

// Chat-specific topbar: back on the left, optional action on the right, brand/title centered.
export function ChatTopbar({
  backHref,
  title,
  subtitle,
  rightSection,
}: ChatTopbarProps) {
  return (
    <header className="relative flex shrink-0 items-center justify-between gap-3 border-b border-[#b8b8b8] bg-background px-4 py-3">
      <Link
        href={backHref}
        aria-label="Kembali"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-foreground hover:bg-muted"
      >
        <Icon icon="material-symbols:arrow-back-rounded" className="size-5" />
      </Link>

      {/* Center: title/subtitle block */}
      <div className="pointer-events-none absolute left-1/2 flex -translate-x-1/2 flex-col items-center text-center">
        {title ? (
          <span className="text-sm font-semibold leading-tight">{title}</span>
        ) : null}
        {subtitle ? (
          <span className="text-[11px] leading-tight text-muted-foreground">
            {subtitle}
          </span>
        ) : null}
      </div>

      <div className="flex w-10 shrink-0 items-center justify-end">
        {rightSection}
      </div>
    </header>
  );
}
