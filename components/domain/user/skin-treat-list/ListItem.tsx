"use client";

import { Icon } from "@iconify/react";

import { Checkbox } from "@/components/atomic/atom/Checkbox";
import { cn } from "libs/util/cn";

type Props = {
  id: string;
  label: string;
  isChecked: boolean;
  isSyncing: boolean;
  isDeleting: boolean;
  checkboxId: string;
  onCheck: (checked: boolean) => void;
  onDetailOpen: () => void;
};

export function ListItem({
  label,
  isChecked,
  isSyncing,
  isDeleting,
  checkboxId,
  onCheck,
  onDetailOpen,
}: Props) {
  const isLocked = isSyncing || isDeleting;

  return (
    <div
      aria-busy={isLocked}
      className={cn(
        "rounded-3xl border border-[#bcbcbc] bg-background shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_6px_14px_rgba(90,90,90,0.08)] transition-all",
        // Checked state: ring + subtle secondary background
        isChecked &&
          "border-secondary/30 bg-secondary/5 ring-1 ring-secondary/20",
        isSyncing && "ring-1 ring-primary/20",
        isDeleting && "border-destructive/30 bg-destructive/5 opacity-70",
      )}
    >
      <div className="flex items-center gap-2.5 px-3.5 py-3">
        {/* Checkbox + label wrapped together for a11y */}
        <label
          htmlFor={checkboxId}
          className={cn(
            "flex flex-1 items-center gap-2.5",
            isLocked ? "cursor-not-allowed opacity-70" : "cursor-pointer",
          )}
        >
          <Checkbox
            id={checkboxId}
            checked={isChecked}
            disabled={isLocked}
            aria-label={`Mark ${label} as completed`}
            aria-busy={isLocked}
            className="self-center"
            onChange={(event) => onCheck(event.currentTarget.checked)}
          />

          <span className="flex-1 text-sm font-medium text-foreground">
            {label}
          </span>
        </label>

        {/* Sync state section */}
        {isDeleting ? (
          <span className="text-xs font-medium text-destructive">
            Deleting...
          </span>
        ) : isSyncing ? (
          <span
            aria-label="Saving checklist item"
            className="size-1.5 shrink-0 rounded-full bg-primary/70"
          />
        ) : null}

        {/* Detail button — isolated so it never toggles the checkbox */}
        <button
          type="button"
          aria-label={`Open ${label} details`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-background/80 text-muted-foreground transition-[background-color,transform] hover:bg-primary/5"
          onClick={onDetailOpen}
          disabled={isDeleting}
        >
          <Icon
            icon="mdi:chevron-right"
            width={16}
            height={16}
            className="shrink-0 transition-transform"
          />
        </button>
      </div>
    </div>
  );
}
