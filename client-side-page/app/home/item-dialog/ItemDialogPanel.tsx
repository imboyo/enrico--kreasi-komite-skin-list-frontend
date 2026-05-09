"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { deleteSkinTreat } from "@/backend-service/user/skin-treat";
import { DialogBody } from "@/components/atomic/molecule/Dialog";
import { useToast } from "@/components/provider/Toast";
import { useDashboardItemEditForm } from "@/hooks/useDashboardItemEditForm";

import { ItemDialogEditForm } from "./ItemDialogEditForm";
import { ItemDialogHeader } from "./ItemDialogHeader";
import { ItemDialogViewContent } from "./ItemDialogViewContent";
import type { DialogMode, ItemDialogPanelProps } from "./types";

export function ItemDialogPanel({
  item,
  isDeleting = false,
  onClose,
  onSave,
  onDeleteStart,
  onDelete,
  onDeleteError,
}: ItemDialogPanelProps) {
  const { showToast } = useToast();
  const [mode, setMode] = useState<DialogMode>("view");

  const { form, mutation, serverError, syncFormValues } =
    useDashboardItemEditForm({
      item,
      onSuccess: (updatedItem) => {
        syncFormValues({
          label: updatedItem.label,
          description: updatedItem.description,
        });
        onSave?.(updatedItem);
        setMode("view");
        showToast("Item berhasil diperbarui.", { variant: "success" });
      },
    });

  const deleteMutation = useMutation({
    mutationFn: () => deleteSkinTreat(item.id),
    onSuccess: () => {
      onDelete?.(item);
      onClose();
      showToast("Item berhasil dihapus.", { variant: "success" });
    },
  });

  const isPending = mutation.isPending || deleteMutation.isPending || isDeleting;

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
      showToast("Gagal memperbarui item. Silakan coba lagi.", {
        variant: "error",
      });
    }
  }

  function handleCancelEdit() {
    syncFormWithItem();
    setMode("view");
  }

  async function handleDelete() {
    if (isPending) {
      return;
    }

    try {
      onDeleteStart?.(item);
      // Delete immediately from the item dialog without showing a confirmation modal.
      await deleteMutation.mutateAsync();
    } catch {
      onDeleteError?.(item);
      showToast("Gagal menghapus item. Silakan coba lagi.", {
        variant: "error",
      });
    }
  }

  return (
    <>
      <ItemDialogHeader
        mode={mode}
        itemLabel={item.label}
        isPending={isPending}
        isDeleting={deleteMutation.isPending || isDeleting}
        onEnterEdit={handleEnterEdit}
        onCancelEdit={handleCancelEdit}
      />

      <DialogBody className="flex flex-col gap-5 pb-5 pt-0">
        {/* View mode section */}
        {mode === "view" ? (
          <ItemDialogViewContent
            item={item}
            isDeleting={deleteMutation.isPending || isDeleting}
            onDelete={handleDelete}
          />
        ) : (
          <ItemDialogEditForm
            form={form}
            isPending={isPending}
            isDeleting={deleteMutation.isPending || isDeleting}
            serverError={serverError}
            onSave={handleSave}
            onCancel={handleCancelEdit}
            onDelete={handleDelete}
          />
        )}
      </DialogBody>
    </>
  );
}
