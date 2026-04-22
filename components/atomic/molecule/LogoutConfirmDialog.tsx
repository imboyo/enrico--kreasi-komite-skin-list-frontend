"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import Dialog, {
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/atomic/molecule/Dialog";
import { Button } from "@/components/atomic/atom/Button";

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
    <Dialog
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
    >
      <DialogHeader>
        <DialogTitle>Logout</DialogTitle>
        <DialogClose>
          <Icon icon="material-symbols:close-rounded" width={20} height={20} className="text-dialog-foreground/60" />
        </DialogClose>
      </DialogHeader>

      <DialogBody>
        <DialogDescription>
          Are you sure you want to logout? You will need to sign in again to access your account.
        </DialogDescription>
      </DialogBody>

      <DialogFooter>
        <DialogClose>
          <Button variant="outline" size="sm">Cancel</Button>
        </DialogClose>
        <Button variant="destructive" size="sm" onClick={handleConfirm}>
          Logout
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
