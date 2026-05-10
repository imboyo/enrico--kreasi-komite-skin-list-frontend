"use client";

import { Icon } from "@iconify/react";

import type { AdminAccount } from "@/backend-service/index";
import { Button } from "components/atomic/atom/Button";
import Dialog, {
  DialogBody,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "components/atomic/molecule/Dialog";

import { EditAdminDialogFooter } from "client-side-page/admin/user/admin/item-list/item-card/item-actions/edit-admin/EditAdminDialogFooter";
import { EditAdminEmailField } from "client-side-page/admin/user/admin/item-list/item-card/item-actions/edit-admin/EditAdminEmailField";
import { EditAdminFullNameField } from "client-side-page/admin/user/admin/item-list/item-card/item-actions/edit-admin/EditAdminFullNameField";
import { EditAdminPhoneNumberField } from "client-side-page/admin/user/admin/item-list/item-card/item-actions/edit-admin/EditAdminPhoneNumberField";
import { EditAdminStatusField } from "client-side-page/admin/user/admin/item-list/item-card/item-actions/edit-admin/EditAdminStatusField";
import { useEditAdminForm } from "client-side-page/admin/user/admin/item-list/item-card/item-actions/edit-admin/useEditAdminForm";
import type { SyntheticEvent } from "react";

type EditAdminDialogProps = {
  admin: AdminAccount;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditAdminDialog({
  admin,
  open,
  onOpenChange,
}: EditAdminDialogProps) {
  const {
    values,
    errors,
    mutation,
    serverError,
    handleTextChange,
    handleStatusChange,
    handleSubmit,
    resetForm,
  } = useEditAdminForm({
    admin,
    onSuccess: () => onOpenChange(false),
  });

  function handleDialogOpenChange(nextOpen: boolean) {
    if (!nextOpen && !mutation.isPending) {
      resetForm();
    }
    onOpenChange(nextOpen);
  }

  async function handleFormSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await handleSubmit();
    } catch {
      // The mutation stores and renders the backend error state below the form.
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleDialogOpenChange}
      surface="dialog-2"
    >
      {/* Section: Edit admin dialog header */}
      <DialogHeader className="items-start">
        <div className="flex flex-col gap-1">
          <DialogTitle>Ubah admin</DialogTitle>
          <DialogDescription>
            Perbarui data admin tanpa verifikasi tambahan.
          </DialogDescription>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          iconOnly
          aria-label="Tutup formulir ubah admin"
          onClick={() => handleDialogOpenChange(false)}
          disabled={mutation.isPending}
        >
          <Icon icon="material-symbols:close-rounded" />
        </Button>
      </DialogHeader>

      {/* Section: Edit admin form */}
      <form onSubmit={handleFormSubmit}>
        <DialogBody className="flex flex-col gap-4">
          {/* Section: Edit admin fields */}
          <EditAdminFullNameField
            adminUuid={admin.uuid}
            value={values.fullName}
            error={errors.fullName}
            onChange={handleTextChange("fullName")}
            disabled={mutation.isPending}
          />
          <EditAdminEmailField
            adminUuid={admin.uuid}
            value={values.email}
            error={errors.email}
            onChange={handleTextChange("email")}
            disabled={mutation.isPending}
          />
          <EditAdminPhoneNumberField
            adminUuid={admin.uuid}
            value={values.phoneNumber}
            error={errors.phoneNumber}
            onChange={handleTextChange("phoneNumber")}
            disabled={mutation.isPending}
          />
          <EditAdminStatusField
            adminUuid={admin.uuid}
            value={values.status}
            error={errors.status}
            onChange={handleStatusChange}
            disabled={mutation.isPending}
          />

          {serverError ? (
            <p className="text-sm text-destructive">{serverError}</p>
          ) : null}
        </DialogBody>

        <EditAdminDialogFooter
          isPending={mutation.isPending}
          onCancel={() => handleDialogOpenChange(false)}
        />
      </form>
    </Dialog>
  );
}
