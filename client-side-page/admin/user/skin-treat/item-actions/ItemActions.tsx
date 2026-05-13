"use client";

import { Icon } from "@iconify/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import type { AdminUserSkinTreat } from "backend-service/admin/user/skin-treat";
import { deleteAdminUserSkinTreat } from "backend-service/admin/user/skin-treat";
import { Button } from "components/atomic/atom/Button";
import { ConfirmationDialog } from "components/atomic/molecule/ConfirmationDialog";
import {
  MenuDropdown,
  MenuDropdownItem,
  MenuDropdownSeparator,
} from "components/atomic/molecule/MenuDropdown";
import { useToast } from "components/provider/Toast";

import { ADMIN_USER_SKIN_TREAT_QUERY_KEY } from "../utils/adminUserSkinTreatCategory";
import { EditSkinTreatDialog } from "./edit-skin-treat-dialog/EditSkinTreatDialog";

interface ItemActionsProps {
  item: AdminUserSkinTreat;
}

export function ItemActions({ item }: Readonly<ItemActionsProps>) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteMutation = useMutation({
    mutationFn: () => deleteAdminUserSkinTreat(item.uuid),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ADMIN_USER_SKIN_TREAT_QUERY_KEY,
      });
      showToast("Data skin treat berhasil dihapus.", { variant: "success" });
      setIsDeleteDialogOpen(false);
    },
    onError: () => {
      showToast("Gagal menghapus data skin treat. Silakan coba lagi.", {
        variant: "error",
      });
    },
  });

  return (
    <div onClick={(event) => event.stopPropagation()}>
      {/* Section: Skin treat item actions menu */}
      <MenuDropdown
        align="start"
        side="bottom"
        trigger={
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            aria-label={`Buka aksi untuk ${item.name}`}
            className="rounded-full"
          >
            <Icon icon="material-symbols:more-vert" />
          </Button>
        }
      >
        <MenuDropdownItem
          icon={<Icon icon="material-symbols:edit-outline-rounded" />}
          onSelect={() => setIsEditDialogOpen(true)}
        >
          Ubah skin treat
        </MenuDropdownItem>

        <MenuDropdownSeparator />

        <MenuDropdownItem
          destructive
          icon={<Icon icon="material-symbols:delete-outline" />}
          onSelect={() => setIsDeleteDialogOpen(true)}
        >
          Hapus skin treat
        </MenuDropdownItem>
      </MenuDropdown>

      {/* Keep the dialog outside the dropdown content so menu close does not unmount it before first render. */}
      <EditSkinTreatDialog
        item={item}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />

      {/* Section: Delete skin treat confirmation dialog */}
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus skin treat"
        description={
          <span>
            Apakah Anda yakin ingin menghapus <strong>{item.name}</strong>?
            Tindakan ini akan menghapus data secara permanen dan tidak dapat
            dibatalkan.
          </span>
        }
        confirmLabel="Hapus"
        confirmVariant="destructive"
        isConfirming={deleteMutation.isPending}
        onConfirm={() => deleteMutation.mutate()}
      />
    </div>
  );
}
