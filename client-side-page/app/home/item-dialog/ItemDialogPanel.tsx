"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { DialogBody } from "@/components/atomic/molecule/Dialog";
import { useToast } from "@/components/provider/Toast";
import { useDashboardItemEditForm } from "@/hooks/useDashboardItemEditForm";
import {
  deleteDashboardItem,
  DashboardItemNotFoundError,
} from "@/mock-backend/user/dashboard/delete-item";
import { MockServerDownError } from "@/mock-backend/utils/mock-control";

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

  const deleteMutation = useMutation({
    mutationFn: () =>
      deleteDashboardItem(
        {
          category,
          itemId: item.id,
        },
        { delayMs: 800 },
      ),
    onSuccess: ({ item: deletedItem }) => {
      onDelete?.(deletedItem);
      onClose();
      showToast("Item deleted successfully.", { variant: "success" });
    },
  });

  const isPending = mutation.isPending || deleteMutation.isPending;

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

  async function handleDelete() {
    if (isPending) {
      return;
    }

    try {
      // Delete immediately from the item dialog without showing a confirmation modal.
      await deleteMutation.mutateAsync();
    } catch (error) {
      if (error instanceof DashboardItemNotFoundError) {
        showToast(error.message, { variant: "error" });
        onClose();
        return;
      }

      if (error instanceof MockServerDownError) {
        showToast("Server is unavailable. Please try again.", {
          variant: "error",
        });
        return;
      }

      showToast("Failed to delete item. Please try again.", {
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
        onEnterEdit={handleEnterEdit}
        onCancelEdit={handleCancelEdit}
      />

      <DialogBody className="flex flex-col gap-5 pb-5 pt-0">
        {/* View mode section */}
        {mode === "view" ? (
          <ItemDialogViewContent item={item} onDelete={handleDelete} />
        ) : (
          <ItemDialogEditForm
            form={form}
            isPending={isPending}
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
