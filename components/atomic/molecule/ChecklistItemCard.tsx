"use client";

import type { ChangeEventHandler, ReactNode } from "react";

import { Checkbox } from "@/components/atomic/atom/Checkbox";
import { cn } from "@/util/cn";

type ChecklistItemCardProps = {
  checked: boolean;
  label: ReactNode;
  onCheckedChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  labelClassName?: string;
  disabled?: boolean;
};

export function ChecklistItemCard({
  checked,
  label,
  onCheckedChange,
  className,
  labelClassName,
  disabled = false,
}: ChecklistItemCardProps) {
  return (
    <div className={cn("relative", className)}>
      <Checkbox
        checked={checked}
        label={label}
        disabled={disabled}
        onChange={onCheckedChange}
        wrapperProps={{
          className: cn(
            // Keep the row styling in one place so consumers can reuse the same
            // checklist card without duplicating the visual treatment. The card
            // now shares the shell background, so border + layered shadow carry
            // the separation instead of a contrasting fill color.
            "flex w-full items-center gap-3 rounded-[24px] border border-[#bcbcbc] bg-background px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_6px_14px_rgba(90,90,90,0.08)] transition-all hover:border-primary/40 hover:bg-primary/5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_10px_20px_rgba(90,90,90,0.12)]",
            checked && "border-primary/50 bg-primary/5",
          ),
        }}
        labelClassName={cn(
          "text-base font-medium text-foreground",
          labelClassName,
        )}
      />
    </div>
  );
}
