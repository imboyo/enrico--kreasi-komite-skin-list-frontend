"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { cn } from "@/util/cn";

interface DashboardLinkCardProps {
  label: string;
  title?: string;
  description?: string;
  href: string;
  className?: string;
}

export function DashboardLinkCard({
  label,
  title,
  description,
  href,
  className,
}: DashboardLinkCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col justify-between rounded-3xl p-5",
        "bg-[#3B3B3B]/20 backdrop-blur-md border border-white/10",
        "transition-transform active:scale-95 hover:scale-[1.01]",
        className,
      )}
    >
      {/* Top row: label chip + arrow icon */}
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-foreground/10 px-3 py-1 text-xs font-medium text-foreground/80">
          {label}
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/10 text-foreground/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <Icon icon="mdi:arrow-top-right" width={16} height={16} />
        </div>
      </div>

      {/* Bottom: title + description */}
      <div className="mt-4">
        {title && (
          <p className="text-lg font-semibold leading-tight text-foreground">
            {title}
          </p>
        )}
        {description && (
          <p className={cn("text-xs text-foreground/60", title && "mt-1")}>
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
