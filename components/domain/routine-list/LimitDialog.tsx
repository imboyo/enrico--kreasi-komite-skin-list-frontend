"use client";

import Link from "next/link";
import { Button } from "@/components/atomic/atom/Button";
import { APP_URL } from "@/constant";
import Dialog, {
  DialogBody,
  DialogClose,
} from "@/components/atomic/molecule/Dialog";
import { useRoutineCheckStore } from "@/client-side-page/home/routine-check-store";

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
      className="max-w-87.5"
    >
      <DialogBody className="flex flex-col items-center gap-5 py-8 text-center">
        {/* Premium badge */}
        <span className="rounded-full bg-primary/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
          Premium Access
        </span>

        {/* App name */}
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-3xl font-black tracking-tight text-dialog-foreground">
            SKIN LIST
          </span>
          <span className="text-xs text-dialog-muted">by Skin Committee</span>
        </div>

        {/* Description */}
        <p className="max-w-65 text-sm leading-relaxed text-dialog-muted">
          Join the skincare community. Access exclusive routines and
          personalized recommendations.
        </p>

        {/* Auth buttons */}
        <div className="flex w-full flex-col gap-2 pt-1">
          <DialogClose>
            <Link href={APP_URL.LOGIN} className="w-full">
              <Button fullWidth size="md" variant="primary">
                Login
              </Button>
            </Link>
          </DialogClose>

          <DialogClose>
            <Link href={APP_URL.REGISTER} className="w-full">
              <Button fullWidth size="md" variant="muted">
                Create Account
              </Button>
            </Link>
          </DialogClose>
        </div>

        {/* Guest shortcut */}
        <DialogClose>
          <button
            className="text-xs text-dialog-muted underline-offset-2 hover:underline"
            onClick={dismissLimitDialog}
          >
            Continue as Guest
          </button>
        </DialogClose>
      </DialogBody>
    </Dialog>
  );
}
