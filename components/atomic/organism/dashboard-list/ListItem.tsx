"use client";

import { Icon } from "@iconify/react";

import { Checkbox } from "@/components/atomic/atom/Checkbox";
import { cn } from "@/util/cn";

type Props = {
  id: string;
  label: string;
  isChecked: boolean;
  checkboxId: string;
  onCheck: (checked: boolean) => void;
  onDetailOpen: () => void;
};

export function ListItem({
  label,
  isChecked,
  checkboxId,
  onCheck,
  onDetailOpen,
}: Props) {
  return (
    <div
      className={cn(
        "rounded-[24px] border border-[#bcbcbc] bg-background shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_6px_14px_rgba(90,90,90,0.08)] transition-all",
        // Checked state: ring + subtle secondary background
        isChecked &&
          "border-secondary/30 bg-secondary/5 ring-1 ring-secondary/20",
      )}
    >
      <div className="flex items-center gap-3 px-4 py-4">
        {/* Checkbox + label wrapped together for a11y */}
        <label
          htmlFor={checkboxId}
          className="flex flex-1 cursor-pointer items-center gap-3"
        >
          <Checkbox
            id={checkboxId}
            checked={isChecked}
            aria-label={`Mark ${label} as completed`}
            className="self-center"
            onChange={(event) => onCheck(event.currentTarget.checked)}
          />

          <span className="flex-1 text-base font-medium text-foreground">
            {label}
          </span>
        </label>

        {/* Detail button — isolated so it never toggles the checkbox */}
        <button
          type="button"
          aria-label={`Open ${label} details`}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-background/80 text-muted-foreground transition-[background-color,transform] hover:bg-primary/5"
          onClick={onDetailOpen}
        >
          <Icon
            icon="mdi:chevron-right"
            width={20}
            height={20}
            className="shrink-0 transition-transform"
          />
        </button>
      </div>
    </div>
  );
}
