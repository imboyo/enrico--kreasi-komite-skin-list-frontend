"use client";

import { Icon } from "@iconify/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import type { AdminAccount } from "backend-service/admin/account/admin";
import {
  deleteAdminAccount,
  updateAdminAccount,
} from "backend-service/admin/account/admin";
import { Button } from "components/atomic/atom/Button";
import { ConfirmationDialog } from "components/atomic/molecule/ConfirmationDialog";
import {
  MenuDropdown,
  MenuDropdownItem,
  MenuDropdownSeparator,
} from "components/atomic/molecule/MenuDropdown";
import { useToast } from "components/provider/Toast";
import { ADMIN_ACCOUNT_QUERY_KEY } from "client-side-page/admin/user/admin/item-list/useAdminAccountList";

import { Dialog as ChangePasswordDialog } from "client-side-page/admin/user/admin/item-list/item-card/item-actions/change-admin-password/Dialog";
import { Dialog as EditAdminDialog } from "client-side-page/admin/user/admin/item-list/item-card/item-actions/edit-admin/Dialog";

export function ItemActions({ admin }: { admin: AdminAccount }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deactivateMutation = useMutation({
    mutationFn: () => updateAdminAccount(admin.uuid, { status: "INACTIVE" }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ADMIN_ACCOUNT_QUERY_KEY,
      });
      showToast("Admin berhasil dinonaktifkan.", { variant: "success" });
      setIsDeactivateDialogOpen(false);
    },
    onError: () => {
      showToast("Gagal menonaktifkan admin. Silakan coba lagi.", {
        variant: "error",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteAdminAccount(admin.uuid),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ADMIN_ACCOUNT_QUERY_KEY,
      });
      showToast("Admin berhasil dihapus.", { variant: "success" });
      setIsDeleteDialogOpen(false);
    },
    onError: () => {
      showToast("Gagal menghapus admin. Silakan coba lagi.", {
        variant: "error",
      });
    },
  });

  return (
    <div onClick={(event) => event.stopPropagation()}>
      {/* Section: Admin actions menu */}
      <MenuDropdown
        align="start"
        side="bottom"
        trigger={
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            aria-label={`Buka aksi untuk ${admin.full_name}`}
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
          Ubah admin
        </MenuDropdownItem>

        <MenuDropdownItem
          icon={<Icon icon="material-symbols:lock-outline" />}
          onSelect={() => setIsChangePasswordDialogOpen(true)}
        >
          Ubah password
        </MenuDropdownItem>
        <MenuDropdownSeparator />
        <MenuDropdownItem
          destructive
          icon={<Icon icon="material-symbols:person-off-outline" />}
          onSelect={() => setIsDeactivateDialogOpen(true)}
        >
          Nonaktifkan
        </MenuDropdownItem>
        <MenuDropdownItem
          destructive
          icon={<Icon icon="material-symbols:delete-outline" />}
          onSelect={() => setIsDeleteDialogOpen(true)}
        >
          Hapus admin
        </MenuDropdownItem>
      </MenuDropdown>

      {/* Keep the dialog outside the dropdown content so menu close does not unmount it before first render. */}
      <EditAdminDialog
        admin={admin}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />

      {/* Section: Change admin password dialog */}
      <ChangePasswordDialog
        admin={admin}
        open={isChangePasswordDialogOpen}
        onOpenChange={setIsChangePasswordDialogOpen}
      />

      {/* Section: Deactivate admin confirmation dialog */}
      <ConfirmationDialog
        open={isDeactivateDialogOpen}
        onOpenChange={setIsDeactivateDialogOpen}
        title="Nonaktifkan admin"
        description={
          <span>
            Apakah Anda yakin ingin menonaktifkan akun{" "}
            <strong>{admin.full_name}</strong>? Admin tidak akan bisa masuk
            hingga statusnya diubah kembali.
          </span>
        }
        confirmLabel="Nonaktifkan"
        confirmVariant="destructive"
        isConfirming={deactivateMutation.isPending}
        onConfirm={() => deactivateMutation.mutate()}
      />

      {/* Section: Delete admin confirmation dialog */}
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus admin"
        description={
          <span>
            Apakah Anda yakin ingin menghapus akun{" "}
            <strong>{admin.full_name}</strong>? Tindakan ini akan
            menghapus admin secara permanen dan tidak dapat dibatalkan.
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
