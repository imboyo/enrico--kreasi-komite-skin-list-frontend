"use client";

import Dialog from "@/components/atomic/molecule/Dialog";

import { ItemDialogPanel } from "./ItemDialogPanel";
import type { ItemDialogProps } from "./types";

export function ItemDialog({
  item,
  category,
  isDeleting = false,
  onClose,
  onSave,
  onDeleteStart,
  onDelete,
  onDeleteError,
}: ItemDialogProps) {
  return (
    <Dialog
      open={item !== null}
      onOpenChange={(open) => {
        // Keep the dialog open while delete is in flight so the pending state
        // stays visible and the user cannot reopen the same item mid-request.
        if (!open && !isDeleting) onClose();
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
          isDeleting={isDeleting}
          onClose={onClose}
          onSave={onSave}
          onDeleteStart={onDeleteStart}
          onDelete={onDelete}
          onDeleteError={onDeleteError}
        />
      ) : null}
    </Dialog>
  );
}
