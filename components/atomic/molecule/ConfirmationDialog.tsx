"use client";

import { Icon } from "@iconify/react";
import type { ReactNode } from "react";

import { Button, type ButtonProps } from "@/components/atomic/atom/Button";
import Dialog, {
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/atomic/molecule/Dialog";

interface ConfirmationDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  title: string;
  description: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  confirmVariant?: ButtonProps["variant"];
  isConfirming?: boolean;
  onConfirm: () => void | Promise<void>;
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  confirmVariant = "primary",
  isConfirming = false,
  onConfirm,
}: ConfirmationDialogProps) {
  async function handleConfirm() {
    // Keep the dialog open while async work is pending so loading state remains visible.
    await onConfirm();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} trigger={trigger}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogClose>
          <Icon
            icon="material-symbols:close-rounded"
            width={20}
            height={20}
            className="text-dialog-current-foreground/60"
          />
        </DialogClose>
      </DialogHeader>

      <DialogBody>
        <DialogDescription>{description}</DialogDescription>
      </DialogBody>

      <DialogFooter>
        <DialogClose>
          <Button variant="outline" size="sm" disabled={isConfirming}>
            {cancelLabel}
          </Button>
        </DialogClose>
        <Button
          variant={confirmVariant}
          size="sm"
          isLoading={isConfirming}
          onClick={() => void handleConfirm()}
        >
          {confirmLabel}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
