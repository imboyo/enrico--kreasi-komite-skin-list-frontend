"use client";

import { Button } from "components/atomic/atom/Button";
import { DialogFooter } from "components/atomic/molecule/Dialog";

type EditAdminDialogFooterProps = {
  isPending: boolean;
  onCancel: () => void;
};

export function EditAdminDialogFooter({
  isPending,
  onCancel,
}: EditAdminDialogFooterProps) {
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
        Simpan admin
      </Button>
    </DialogFooter>
  );
}
