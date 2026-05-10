"use client";

import { Icon } from "@iconify/react";
import { useId, useState } from "react";

import type { UserAccount } from "backend-service/admin/account/user";
import { Button } from "components/atomic/atom/Button";
import Dialog, {
  DialogBody,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "components/atomic/molecule/Dialog";
import { ChangeUserPasswordDialogFooter } from "client-side-page/admin/user/user/account-list/item-card/item-actions/change-user-password/ChangeUserPasswordDialogFooter";
import { ChangeUserPasswordField } from "client-side-page/admin/user/user/account-list/item-card/item-actions/change-user-password/PasswordField";
import { useForm } from "client-side-page/admin/user/user/account-list/item-card/item-actions/change-user-password/useForm";

type DialogProps = {
  user: UserAccount;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ChangeUserPasswordDialog({
  user,
  open,
  onOpenChange,
}: DialogProps) {
  const formId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const { form, isPending, serverError, resetForm } = useForm({
    user,
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
      {/* Section: Change user password dialog header */}
      <DialogHeader className="items-start">
        <div className="flex flex-col gap-1">
          <DialogTitle>Ubah password pelanggan</DialogTitle>
          <DialogDescription>
            Atur password baru untuk {user.full_name}.
          </DialogDescription>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          iconOnly
          aria-label="Tutup formulir ubah password pelanggan"
          onClick={() => handleDialogOpenChange(false)}
          disabled={isPending}
        >
          <Icon icon="material-symbols:close-rounded" />
        </Button>
      </DialogHeader>

      {/* Section: Change user password form */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void form.handleSubmit();
        }}
      >
        <DialogBody className="flex flex-col gap-4">
          {/* Section: Change user password fields */}
          <ChangeUserPasswordField
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

        <ChangeUserPasswordDialogFooter
          isPending={isPending}
          onCancel={() => handleDialogOpenChange(false)}
        />
      </form>
    </Dialog>
  );
}
