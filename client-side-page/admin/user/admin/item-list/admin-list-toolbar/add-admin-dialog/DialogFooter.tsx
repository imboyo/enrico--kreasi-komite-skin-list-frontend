"use client";

import { Button } from "components/atomic/atom/Button";
import { DialogFooter } from "components/atomic/molecule/Dialog";

type FooterProps = {
  isPending: boolean;
  onCancel: () => void;
};

export function DialogFooter({
  isPending,
  onCancel,
}: FooterProps) {
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
        Tambah admin
      </Button>
    </DialogFooter>
  );
}
