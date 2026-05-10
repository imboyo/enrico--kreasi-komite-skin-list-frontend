"use client";

import { Icon } from "@iconify/react";
import { useId, useState } from "react";

import type { AdminAccount } from "backend-service/admin/account/admin";
import { Button } from "components/atomic/atom/Button";
import Dialog, {
  DialogBody,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "components/atomic/molecule/Dialog";

import { DialogFooter } from "client-side-page/admin/user/admin/item-list/item-card/item-actions/change-admin-password/DialogFooter";
import { PasswordField } from "client-side-page/admin/user/admin/item-list/item-card/item-actions/change-admin-password/PasswordField";
import { useForm } from "client-side-page/admin/user/admin/item-list/item-card/item-actions/change-admin-password/useForm";

type DialogProps = {
  admin: AdminAccount;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function Dialog({
  admin,
  open,
  onOpenChange,
}: DialogProps) {
  const formId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const { form, isPending, serverError, resetForm } =
    useForm({
      admin,
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
      {/* Section: Change admin password dialog header */}
      <DialogHeader className="items-start">
        <div className="flex flex-col gap-1">
          <DialogTitle>Ubah password admin</DialogTitle>
          <DialogDescription>
            Atur password baru untuk {admin.full_name}.
          </DialogDescription>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          iconOnly
          aria-label="Tutup formulir ubah password admin"
          onClick={() => handleDialogOpenChange(false)}
          disabled={isPending}
        >
          <Icon icon="material-symbols:close-rounded" />
        </Button>
      </DialogHeader>

      {/* Section: Change admin password form */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void form.handleSubmit();
        }}
      >
        <DialogBody className="flex flex-col gap-4">
          {/* Section: Change admin password fields */}
          <PasswordField
            form={form}
            inputId={`${formId}-password`}
            visible={showPassword}
            onToggle={() => setShowPassword((current) => !current)}
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
    </Dialog>
  );
}
