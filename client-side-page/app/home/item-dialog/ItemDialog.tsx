"use client";

import Dialog from "@/components/atomic/molecule/Dialog";

import { ItemDialogPanel } from "./ItemDialogPanel";
import type { ItemDialogProps } from "./types";

export function ItemDialog({
  item,
  category,
  onClose,
  onSave,
  onDelete,
}: ItemDialogProps) {
  return (
    <Dialog
      open={item !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      surface="dialog-2"
      className="max-w-112"
    >
      {item && category ? (
        <ItemDialogPanel
          // Use the stable item id so mode and form state reset when a new item is selected.
          key={item.id}
          item={item}
          category={category}
          onClose={onClose}
          onSave={onSave}
          onDelete={onDelete}
        />
      ) : null}
    </Dialog>
  );
}
