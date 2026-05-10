"use client";

import { Icon } from "@iconify/react";
import { useId, useState } from "react";

import { Button } from "components/atomic/atom/Button";
import Dialog, {
  DialogBody,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "components/atomic/molecule/Dialog";

import { AddAdminDialogFooter } from "client-side-page/admin/user/admin/item-list/admin-list-toolbar/add-admin-dialog/AddAdminDialogFooter";
import { AddAdminEmailField } from "client-side-page/admin/user/admin/item-list/admin-list-toolbar/add-admin-dialog/AddAdminEmailField";
import { AddAdminFullNameField } from "client-side-page/admin/user/admin/item-list/admin-list-toolbar/add-admin-dialog/AddAdminFullNameField";
import { AddAdminPasswordField } from "client-side-page/admin/user/admin/item-list/admin-list-toolbar/add-admin-dialog/AddAdminPasswordField";
import { AddAdminPhoneNumberField } from "client-side-page/admin/user/admin/item-list/admin-list-toolbar/add-admin-dialog/AddAdminPhoneNumberField";
import { AddAdminStatusField } from "client-side-page/admin/user/admin/item-list/admin-list-toolbar/add-admin-dialog/AddAdminStatusField";
import { useAddAdminForm } from "client-side-page/admin/user/admin/item-list/admin-list-toolbar/add-admin-dialog/useAddAdminForm";

type AddAdminDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddAdminDialog({ open, onOpenChange }: AddAdminDialogProps) {
  const formId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const { form, isPending, serverError, resetForm } = useAddAdminForm({
    onSuccess: () => {
      setShowPassword(false);
      resetForm();
      onOpenChange(false);
    },
  });

  function handleDialogOpenChange(nextOpen: boolean) {
    if (!nextOpen && !isPending) {
      setShowPassword(false);
      resetForm();
    }
    onOpenChange(nextOpen);
  }

  return (
    <Dialog
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
          <AddAdminFullNameField
            form={form}
            fieldId={`${formId}-full-name`}
            disabled={isPending}
          />
          <AddAdminEmailField
            form={form}
            fieldId={`${formId}-email`}
            disabled={isPending}
          />
          <AddAdminPhoneNumberField
            form={form}
            fieldId={`${formId}-phone-number`}
            disabled={isPending}
          />
          <AddAdminPasswordField
            form={form}
            inputId={`${formId}-password`}
            visible={showPassword}
            onToggle={() => setShowPassword((current) => !current)}
            disabled={isPending}
          />
          <AddAdminStatusField
            form={form}
            fieldId={`${formId}-status`}
            disabled={isPending}
          />

          {serverError ? (
            <p className="text-sm text-destructive">{serverError}</p>
          ) : null}
        </DialogBody>

        <AddAdminDialogFooter
          isPending={isPending}
          onCancel={() => handleDialogOpenChange(false)}
        />
      </form>
    </Dialog>
  );
}
