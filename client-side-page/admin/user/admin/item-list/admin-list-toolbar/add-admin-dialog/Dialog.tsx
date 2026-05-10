"use client";

import { Icon } from "@iconify/react";
import { useId, useState } from "react";

import { Button } from "components/atomic/atom/Button";
import BaseDialog, {
  DialogBody,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "components/atomic/molecule/Dialog";

import { DialogFooter } from "client-side-page/admin/user/admin/item-list/admin-list-toolbar/add-admin-dialog/DialogFooter";
import { EmailField } from "client-side-page/admin/user/admin/item-list/admin-list-toolbar/add-admin-dialog/EmailField";
import { FullNameField } from "client-side-page/admin/user/admin/item-list/admin-list-toolbar/add-admin-dialog/FullNameField";
import { PasswordField } from "client-side-page/admin/user/admin/item-list/admin-list-toolbar/add-admin-dialog/PasswordField";
import { PhoneNumberField } from "client-side-page/admin/user/admin/item-list/admin-list-toolbar/add-admin-dialog/PhoneNumberField";
import { StatusField } from "client-side-page/admin/user/admin/item-list/admin-list-toolbar/add-admin-dialog/StatusField";
import { useDialogForm } from "client-side-page/admin/user/admin/item-list/admin-list-toolbar/add-admin-dialog/useDialogForm";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function Dialog({ open, onOpenChange }: DialogProps) {
  const formId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const { form, isPending, serverError, resetForm } = useDialogForm({
    onSuccess: () => {
      setShowPassword(false);
      resetForm();
      onOpenChange(false);
    },
  });

  function handleDialogOpenChange(nextOpen: boolean) {
    // Reset transient form state only after the dialog is actually closing.
    if (!nextOpen && !isPending) {
      setShowPassword(false);
      resetForm();
    }
    onOpenChange(nextOpen);
  }

  return (
    <BaseDialog
      open={open}
      onOpenChange={handleDialogOpenChange}
      surface="dialog-2"
    >
      {/* Section: Add admin dialog header */}
      <DialogHeader className="items-start">
        <div className="flex flex-col gap-1">
          <DialogTitle>Tambah admin baru</DialogTitle>
          <DialogDescription>
            Buat akun admin baru dan simpan langsung ke sistem.
          </DialogDescription>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          iconOnly
          aria-label="Tutup formulir tambah admin"
          onClick={() => handleDialogOpenChange(false)}
          disabled={isPending}
        >
          <Icon icon="material-symbols:close-rounded" />
        </Button>
      </DialogHeader>

      {/* Section: Add admin form */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void form.handleSubmit();
        }}
      >
        <DialogBody className="flex flex-col gap-4">
          {/* Section: Add admin fields */}
          <FullNameField
            form={form}
            fieldId={`${formId}-full-name`}
            disabled={isPending}
          />
          <EmailField
            form={form}
            fieldId={`${formId}-email`}
            disabled={isPending}
          />
          <PhoneNumberField
            form={form}
            fieldId={`${formId}-phone-number`}
            disabled={isPending}
          />
          <PasswordField
            form={form}
            inputId={`${formId}-password`}
            visible={showPassword}
            onToggle={() => setShowPassword((current) => !current)}
            disabled={isPending}
          />
          <StatusField
            form={form}
            fieldId={`${formId}-status`}
            disabled={isPending}
          />

          {serverError ? (
            <p className="text-sm text-destructive">{serverError}</p>
          ) : null}
        </DialogBody>

        <DialogFooter
          isPending={isPending}
          onCancel={() => handleDialogOpenChange(false)}
        />
      </form>
    </BaseDialog>
  );
}
