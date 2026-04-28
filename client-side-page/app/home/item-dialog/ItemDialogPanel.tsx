"use client";

import { useState } from "react";

import { DialogBody } from "@/components/atomic/molecule/Dialog";
import { ConfirmationDialog } from "@/components/atomic/molecule/ConfirmationDialog";
import { useToast } from "@/components/provider/Toast";
import { useDashboardItemEditForm } from "@/hooks/useDashboardItemEditForm";

import { ItemDialogEditForm } from "./ItemDialogEditForm";
import { ItemDialogHeader } from "./ItemDialogHeader";
import { ItemDialogViewContent } from "./ItemDialogViewContent";
import type { DialogMode, ItemDialogPanelProps } from "./types";

export function ItemDialogPanel({
  item,
  category,
  onClose,
  onSave,
  onDelete,
}: ItemDialogPanelProps) {
  const { showToast } = useToast();
  const [mode, setMode] = useState<DialogMode>("view");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const { form, mutation, serverError, syncFormValues } =
    useDashboardItemEditForm({
      category,
      item,
      onSuccess: (updatedItem) => {
        syncFormValues({
          label: updatedItem.label,
          description: updatedItem.description,
        });
        onSave?.(updatedItem);
        setMode("view");
        showToast("Item updated successfully.", { variant: "success" });
      },
    });

  function syncFormWithItem() {
    // Keep form values aligned with the latest item payload before toggling modes.
    syncFormValues({
      label: item.label,
      description: item.description,
    });
  }

  function handleEnterEdit() {
    syncFormWithItem();
    setMode("edit");
  }

  async function handleSave() {
    if (mode !== "edit") return;

    try {
      await form.handleSubmit();
    } catch {
      showToast("Failed to update item. Please try again.", {
        variant: "error",
      });
    }
  }

  function handleCancelEdit() {
    syncFormWithItem();
    setMode("view");
  }

  function handleRequestDelete() {
    setDeleteConfirmOpen(true);
  }

  function handleConfirmDelete() {
    onDelete?.(item);
    setDeleteConfirmOpen(false);
    onClose();
  }

  return (
    <>
      <ItemDialogHeader
        mode={mode}
        itemLabel={item.label}
        isPending={mutation.isPending}
        onEnterEdit={handleEnterEdit}
        onCancelEdit={handleCancelEdit}
      />

      <DialogBody className="flex flex-col gap-5 pb-5 pt-0">
        {/* View mode section */}
        {mode === "view" ? (
          <ItemDialogViewContent item={item} onDelete={handleRequestDelete} />
        ) : (
          <ItemDialogEditForm
            form={form}
            isPending={mutation.isPending}
            serverError={serverError}
            onSave={handleSave}
            onCancel={handleCancelEdit}
            onDelete={handleRequestDelete}
          />
        )}
      </DialogBody>

      <ConfirmationDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Delete Item"
        description={`Delete "${item.label}" from this list?`}
        confirmLabel="Delete"
        confirmVariant="destructive"
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
