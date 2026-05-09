"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/atomic/atom/Button";
import { ConfirmationDialog } from "@/components/atomic/molecule/ConfirmationDialog";

interface LogoutConfirmDialogProps {
  /** Called when the user confirms logout */
  onConfirm: () => void | Promise<void>;
  isConfirming?: boolean;
  keepOpenOnConfirm?: boolean;
}

export function LogoutConfirmDialog({
  onConfirm,
  isConfirming = false,
  keepOpenOnConfirm = false,
}: LogoutConfirmDialogProps) {
  const [open, setOpen] = useState(false);

  async function handleConfirm() {
    await onConfirm();

    if (!keepOpenOnConfirm) {
      setOpen(false);
    }
  }

  return (
    <ConfirmationDialog
      open={open}
      onOpenChange={setOpen}
      isConfirming={isConfirming}
      trigger={
        <Button
          variant="destructive"
          fullWidth
          disabled={isConfirming}
          leadingIcon={<Icon icon="material-symbols:logout-rounded" width={20} height={20} />}
        >
          Keluar
        </Button>
      }
      title="Keluar"
      description="Apakah Anda yakin ingin keluar? Anda perlu masuk lagi untuk mengakses akun Anda."
      confirmLabel="Keluar"
      confirmVariant="destructive"
      onConfirm={handleConfirm}
    />
  );
}
