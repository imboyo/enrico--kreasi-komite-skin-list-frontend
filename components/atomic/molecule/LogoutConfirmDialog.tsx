"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/atomic/atom/Button";
import { ConfirmationDialog } from "@/components/atomic/molecule/ConfirmationDialog";

interface LogoutConfirmDialogProps {
  /** Called when the user confirms logout */
  onConfirm: () => void;
}

export function LogoutConfirmDialog({ onConfirm }: LogoutConfirmDialogProps) {
  const [open, setOpen] = useState(false);

  function handleConfirm() {
    setOpen(false);
    onConfirm();
  }

  return (
    <ConfirmationDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button
          variant="destructive"
          fullWidth
          leadingIcon={<Icon icon="material-symbols:logout-rounded" width={20} height={20} />}
        >
          Logout
        </Button>
      }
      title="Logout"
      description="Are you sure you want to logout? You will need to sign in again to access your account."
      confirmLabel="Logout"
      confirmVariant="destructive"
      onConfirm={handleConfirm}
    />
  );
}
