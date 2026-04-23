"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/util/cn";

const badgeVariants = cva(
  "inline-flex max-w-full items-center border border-primary/30 bg-primary/10 transition-colors duration-150",
  {
    variants: {
      size: {
        sm: "rounded-lg",
        md: "rounded-xl",
        lg: "rounded-2xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const badgeLabelVariants = cva("min-w-0 text-left font-medium text-primary", {
  variants: {
    size: {
      sm: "px-2.5 py-2 text-[11px]",
      md: "px-3 py-3 text-xs",
      lg: "px-4 py-3.5 text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const badgeActionVariants = cva(
  "shrink-0 items-center justify-center text-muted-foreground transition-colors duration-150 hover:bg-destructive/10 hover:text-destructive",
  {
    variants: {
      size: {
        sm: "mr-0.5 flex size-7 rounded-md",
        md: "mr-1 flex size-8 rounded-lg",
        lg: "mr-1.5 flex size-9 rounded-xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type BadgeProps = {
  label: ReactNode;
  className?: string;
  labelClassName?: string;
  hideAction?: boolean;
  actionLabel?: string;
  actionIcon?: ReactNode;
  actionButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
} & VariantProps<typeof badgeVariants>;

export function Badge({
  label,
  size,
  className,
  labelClassName,
  hideAction = true,
  actionLabel,
  actionIcon,
  actionButtonProps,
}: BadgeProps) {
  const { className: actionButtonClassName, ...restActionButtonProps } =
    actionButtonProps ?? {};

  return (
    <div
      className={cn(badgeVariants({ size }), className)}
    >
      <div className={cn(badgeLabelVariants({ size }), labelClassName)}>
        {/* Keep the label in a dedicated shrinking slot so long text truncates
        without pushing the optional action button off-screen. */}
        <span className="block truncate">{label}</span>
      </div>

      {!hideAction ? (
        <button
          type="button"
          aria-label={actionLabel}
          className={cn(badgeActionVariants({ size }), actionButtonClassName)}
          {...restActionButtonProps}
        >
          {actionIcon}
        </button>
      ) : null}
    </div>
  );
}
