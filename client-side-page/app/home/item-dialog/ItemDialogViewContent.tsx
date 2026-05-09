"use client";

import { Icon } from "@iconify/react";
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
  const itemDescription = item.description?.trim();

  return (
    <>
      {/* Description section */}
      <div className="flex flex-col gap-2 rounded-2xl bg-primary/5 px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-dialog-current-muted">
          Deskripsi
        </p>
        {/* Show a readable fallback so empty descriptions do not collapse the dialog content. */}
        <p className="text-sm leading-relaxed text-dialog-current-foreground/80">
          {itemDescription || "Belum ada deskripsi untuk item ini."}
        </p>
      </div>

      {/* Action buttons section */}
      <div className="flex flex-col gap-2.5">
        {/* Keep the two navigation actions balanced and less dominant inside the dialog. */}
        <div className="grid grid-cols-2 gap-2">
          <DialogClose>
            <Link href={APP_URL.APP_CHAT} className="block w-full">
              <Button
                fullWidth
                size="md"
                variant="secondary"
                leadingIcon={
                  <Icon icon="material-symbols:chat-outline-rounded" />
                }
              >
                Konsultasi
              </Button>
            </Link>
          </DialogClose>

          <DialogClose>
            <Link href={APP_URL.APP_ASK_AI} className="block w-full">
              <Button
                fullWidth
                size="md"
                variant="accent2"
                leadingIcon={
                  <Icon icon="material-symbols:auto-awesome-outline-rounded" />
                }
              >
                Tanya AI
              </Button>
            </Link>
          </DialogClose>
        </div>

        {/* Destructive delete action */}
        <Button
          fullWidth
          size="md"
          variant="ghost"
          className="border border-destructive/15 text-destructive hover:bg-destructive/5"
          onClick={onDelete}
          disabled={isDeleting}
          isLoading={isDeleting}
          leadingIcon={<Icon icon="material-symbols:delete-outline-rounded" />}
        >
          {isDeleting ? "Menghapus..." : "Hapus item"}
        </Button>
      </div>
    </>
  );
}
