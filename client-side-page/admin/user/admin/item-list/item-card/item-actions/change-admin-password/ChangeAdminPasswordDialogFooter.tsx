"use client";

import { Button } from "components/atomic/atom/Button";
import { DialogFooter } from "components/atomic/molecule/Dialog";

type DialogFooterProps = {
  isPending: boolean;
  onCancel: () => void;
};

export function ChangeAdminPasswordDialogFooter({
  isPending,
  onCancel,
}: DialogFooterProps) {
  return (
    <DialogFooter>
      <Button
        type="button"
        variant="ghost"
        onClick={onCancel}
        disabled={isPending}
      >
        Batal
      </Button>
      <Button type="submit" isLoading={isPending}>
        Simpan password
      </Button>
    </DialogFooter>
  );
}
