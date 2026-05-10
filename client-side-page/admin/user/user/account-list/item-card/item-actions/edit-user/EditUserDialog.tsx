"use client";

import { Icon } from "@iconify/react";
import type { SyntheticEvent } from "react";

import type { UserAccount } from "backend-service/admin/account/user";
import { Button } from "components/atomic/atom/Button";
import Dialog, {
  DialogBody,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "components/atomic/molecule/Dialog";
import { EditUserDialogFooter } from "client-side-page/admin/user/user/account-list/item-card/item-actions/edit-user/EditUserDialogFooter";
import { EmailField } from "client-side-page/admin/user/user/account-list/item-card/item-actions/edit-user/EmailField";
import { FullNameField } from "client-side-page/admin/user/user/account-list/item-card/item-actions/edit-user/FullNameField";
import { PhoneNumberField } from "client-side-page/admin/user/user/account-list/item-card/item-actions/edit-user/PhoneNumberField";
import { StatusField } from "client-side-page/admin/user/user/account-list/item-card/item-actions/edit-user/StatusField";
import { useForm } from "client-side-page/admin/user/user/account-list/item-card/item-actions/edit-user/useForm";

type DialogProps = {
  user: UserAccount;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditUserDialog({ user, open, onOpenChange }: DialogProps) {
  const {
    values,
    errors,
    mutation,
    serverError,
    handleTextChange,
    handleStatusChange,
    handleSubmit,
    resetForm,
  } = useForm({
    user,
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
      // The mutation keeps the backend failure in state so the dialog can render it.
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleDialogOpenChange}
      surface="dialog-2"
    >
      {/* Section: Edit user dialog header */}
      <DialogHeader className="items-start">
        <div className="flex flex-col gap-1">
          <DialogTitle>Ubah pelanggan</DialogTitle>
          <DialogDescription>
            Perbarui data pelanggan tanpa verifikasi tambahan.
          </DialogDescription>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          iconOnly
          aria-label="Tutup formulir ubah pelanggan"
          onClick={() => handleDialogOpenChange(false)}
          disabled={mutation.isPending}
        >
          <Icon icon="material-symbols:close-rounded" />
        </Button>
      </DialogHeader>

      {/* Section: Edit user form */}
      <form onSubmit={handleFormSubmit}>
        <DialogBody className="flex flex-col gap-4">
          {/* Section: Edit user fields */}
          <FullNameField
            userUuid={user.uuid}
            value={values.fullName}
            error={errors.fullName}
            onChange={handleTextChange("fullName")}
            disabled={mutation.isPending}
          />
          <EmailField
            userUuid={user.uuid}
            value={values.email}
            error={errors.email}
            onChange={handleTextChange("email")}
            disabled={mutation.isPending}
          />
          <PhoneNumberField
            userUuid={user.uuid}
            value={values.phoneNumber}
            error={errors.phoneNumber}
            onChange={handleTextChange("phoneNumber")}
            disabled={mutation.isPending}
          />
          <StatusField
            userUuid={user.uuid}
            value={values.status}
            error={errors.status}
            onChange={handleStatusChange}
            disabled={mutation.isPending}
          />

          {serverError ? (
            <p className="text-sm text-destructive">{serverError}</p>
          ) : null}
        </DialogBody>

        <EditUserDialogFooter
          isPending={mutation.isPending}
          onCancel={() => handleDialogOpenChange(false)}
        />
      </form>
    </Dialog>
  );
}
