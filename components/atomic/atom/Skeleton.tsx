import type { HTMLAttributes } from "react";

import { cn } from "@/util/cn";

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-2xl bg-muted/80",
        className,
      )}
      {...props}
    />
  );
}
