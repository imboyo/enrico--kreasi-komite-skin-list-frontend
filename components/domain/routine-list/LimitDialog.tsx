"use client";

import { Button } from "@/components/atomic/atom/Button";
import Dialog, {
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/atomic/molecule/Dialog";
import { CHECK_LIMIT, useRoutineCheckStore } from "@/store/routine-check-store";

/** Automatically opens when the check count hits a multiple of CHECK_LIMIT */
export function LimitDialog() {
  const showLimitDialog = useRoutineCheckStore((s) => s.showLimitDialog);
  const dismissLimitDialog = useRoutineCheckStore((s) => s.dismissLimitDialog);

  return (
    <Dialog
      open={showLimitDialog}
      onOpenChange={(open) => {
        if (!open) dismissLimitDialog();
      }}
    >
      <DialogHeader>
        <DialogTitle>You&apos;re on a roll!</DialogTitle>
        <DialogClose>
          <span className="text-dialog-muted text-lg leading-none">✕</span>
        </DialogClose>
      </DialogHeader>

      <DialogBody className="flex flex-col gap-4">
        <DialogDescription>
          You&apos;ve toggled your routines ${CHECK_LIMIT} times. Stay
          consistent — small daily habits lead to big results over time.
        </DialogDescription>
      </DialogBody>

      <DialogFooter>
        <DialogClose>
          <Button size="sm">
            Got it
          </Button>
        </DialogClose>
      </DialogFooter>
    </Dialog>
  );
}
