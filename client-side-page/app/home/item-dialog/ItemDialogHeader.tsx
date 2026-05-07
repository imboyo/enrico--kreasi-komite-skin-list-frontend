"use client";

import { Icon } from "@iconify/react";

import {
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/components/atomic/molecule/Dialog";

import type { ItemDialogHeaderProps } from "./types";

export function ItemDialogHeader({
  mode,
  itemLabel,
  isPending,
  isDeleting,
  onEnterEdit,
  onCancelEdit,
}: ItemDialogHeaderProps) {
  return (
    <>
      {/* Dialog header section */}
      <DialogHeader>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-dialog-current-muted">
            {isDeleting
              ? "Deleting Item"
              : mode === "edit"
                ? "Edit Item"
                : "Selected Item"}
          </p>
          <DialogTitle className="text-2xl font-semibold">
            {isDeleting
              ? `Deleting ${itemLabel}`
              : mode === "edit"
                ? "Edit Details"
                : itemLabel}
          </DialogTitle>
        </div>

        <div className="flex items-center gap-1">
          {/* Switch between view and edit mode */}
          {mode === "view" ? (
            <button
              type="button"
              aria-label="Edit item"
              onClick={onEnterEdit}
              disabled={isPending}
              className="flex h-8 w-8 items-center justify-center rounded-xl text-dialog-current-foreground/60 transition-colors hover:bg-primary/5 hover:text-dialog-current-foreground"
            >
              <Icon
                icon="material-symbols:edit-outline-rounded"
                width={18}
                height={18}
              />
            </button>
          ) : (
            <button
              type="button"
              aria-label="Cancel edit"
              onClick={onCancelEdit}
              disabled={isPending}
              className="flex h-8 w-8 items-center justify-center rounded-xl text-dialog-current-foreground/60 transition-colors hover:bg-primary/5 hover:text-dialog-current-foreground"
            >
              <Icon
                icon="material-symbols:arrow-back-rounded"
                width={18}
                height={18}
              />
            </button>
          )}

          {isPending ? (
            <span className="inline-flex h-8 w-8 items-center justify-center text-dialog-current-foreground/40">
              <Icon
                icon="material-symbols:close-rounded"
                width={20}
                height={20}
              />
            </span>
          ) : (
            <DialogClose>
              <Icon
                icon="material-symbols:close-rounded"
                width={20}
                height={20}
                className="text-dialog-current-foreground/60"
              />
            </DialogClose>
          )}
        </div>
      </DialogHeader>
    </>
  );
}
