"use client";

import Link from "next/link";

import { Button } from "@/components/atomic/atom/Button";
import { DialogClose } from "@/components/atomic/molecule/Dialog";
import { APP_URL } from "@/constant";

import type { ItemDialogViewContentProps } from "./types";

export function ItemDialogViewContent({
  item,
  isDeleting,
  onDelete,
}: ItemDialogViewContentProps) {
  return (
    <>
      {/* Description copy section */}
      <p className="text-sm leading-relaxed text-dialog-current-muted">
        {item.description}
      </p>

      {/* Action buttons section */}
      <div className="flex flex-col gap-2">
        <DialogClose>
          <Link href={APP_URL.APP_CHAT} className="w-full">
            <Button fullWidth size="lg" variant="secondary">
              Consultation
            </Button>
          </Link>
        </DialogClose>

        <DialogClose>
          <Link href={APP_URL.APP_ASK_AI} className="w-full">
            <Button fullWidth size="lg">
              Ask With AI
            </Button>
          </Link>
        </DialogClose>

        {/* Destructive delete action */}
        <Button
          fullWidth
          size="lg"
          variant="ghost"
          className="text-destructive hover:bg-destructive/5"
          onClick={onDelete}
          disabled={isDeleting}
          isLoading={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </>
  );
}
