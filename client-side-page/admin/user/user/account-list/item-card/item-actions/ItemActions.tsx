"use client";

import { Icon } from "@iconify/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import {
  deleteUserAccount,
  updateUserAccount,
  type UserAccount,
} from "backend-service/admin/account/user";
import { Button } from "components/atomic/atom/Button";
import { ConfirmationDialog } from "components/atomic/molecule/ConfirmationDialog";
import {
  MenuDropdown,
  MenuDropdownItem,
  MenuDropdownLinkItem,
  MenuDropdownSeparator,
} from "components/atomic/molecule/MenuDropdown";
import { useToast } from "components/provider/Toast";
import { ChangeUserPasswordDialog } from "client-side-page/admin/user/user/account-list/item-card/item-actions/change-user-password/ChangeUserPasswordDialog";
import { EditUserDialog } from "client-side-page/admin/user/user/account-list/item-card/item-actions/edit-user/EditUserDialog";
import { USER_ACCOUNT_QUERY_KEY } from "client-side-page/admin/user/user/account-list/useUserAccountList";
import { APP_URL } from "constant";

export function ItemActions({ user }: { user: UserAccount }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
    useState(false);
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const isUserAlreadyInactive = user.status === "INACTIVE";

  const suspendMutation = useMutation({
    mutationFn: () => updateUserAccount(user.uuid, { status: "INACTIVE" }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: USER_ACCOUNT_QUERY_KEY,
      });
      showToast("Pelanggan berhasil dinonaktifkan.", { variant: "success" });
      setIsSuspendDialogOpen(false);
    },
    onError: () => {
      showToast("Gagal menonaktifkan pelanggan. Silakan coba lagi.", {
        variant: "error",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteUserAccount(user.uuid),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: USER_ACCOUNT_QUERY_KEY,
      });
      showToast("Pelanggan berhasil dihapus.", { variant: "success" });
      setIsDeleteDialogOpen(false);
    },
    onError: () => {
      showToast("Gagal menghapus pelanggan. Silakan coba lagi.", {
        variant: "error",
      });
    },
  });

  return (
    <div onClick={(event) => event.stopPropagation()}>
      {/* Section: User actions menu */}
      <MenuDropdown
        align="start"
        side="bottom"
        trigger={
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            aria-label={`Buka aksi untuk ${user.full_name}`}
            className="rounded-full"
          >
            <Icon icon="material-symbols:more-vert" />
          </Button>
        }
      >
        {/* Section: User row actions */}
        <MenuDropdownItem
          icon={<Icon icon="material-symbols:edit-outline-rounded" />}
          onSelect={() => setIsEditDialogOpen(true)}
        >
          Ubah pelanggan
        </MenuDropdownItem>
        <MenuDropdownItem
          icon={<Icon icon="material-symbols:lock-outline" />}
          onSelect={() => setIsChangePasswordDialogOpen(true)}
        >
          Ubah password
        </MenuDropdownItem>
        <MenuDropdownLinkItem
          href={`${APP_URL.ADMIN_CHATS}/${user.uuid}`}
          icon={<Icon icon="material-symbols:chat-outline-rounded" />}
        >
          Lihat chat
        </MenuDropdownLinkItem>
        <MenuDropdownLinkItem
          href={`${APP_URL.ADMIN_USER_SKIN_TREAT}/${user.uuid}`}
          icon={<Icon icon="material-symbols:spa-outline" />}
        >
          Lihat skin treat
        </MenuDropdownLinkItem>
        <MenuDropdownSeparator />
        <MenuDropdownItem
          destructive
          disabled={isUserAlreadyInactive}
          icon={<Icon icon="material-symbols:person-off-outline" />}
          onSelect={() => setIsSuspendDialogOpen(true)}
        >
          Nonaktifkan pelanggan
        </MenuDropdownItem>
        <MenuDropdownItem
          destructive
          icon={<Icon icon="material-symbols:delete-outline" />}
          onSelect={() => setIsDeleteDialogOpen(true)}
        >
          Hapus pelanggan
        </MenuDropdownItem>
      </MenuDropdown>

      {/* Keep the dialog outside the dropdown so closing the menu does not unmount it. */}
      <EditUserDialog
        user={user}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />

      {/* Section: Change user password dialog */}
      <ChangeUserPasswordDialog
        user={user}
        open={isChangePasswordDialogOpen}
        onOpenChange={setIsChangePasswordDialogOpen}
      />

      {/* Section: Suspend user confirmation dialog */}
      <ConfirmationDialog
        open={isSuspendDialogOpen}
        onOpenChange={setIsSuspendDialogOpen}
        title="Nonaktifkan pelanggan"
        description={
          <span>
            Apakah Anda yakin ingin menonaktifkan akun{" "}
            <strong>{user.full_name}</strong>? Pelanggan tidak akan bisa masuk
            hingga statusnya diubah kembali.
          </span>
        }
        confirmLabel="Nonaktifkan"
        confirmVariant="destructive"
        isConfirming={suspendMutation.isPending}
        onConfirm={async () => {
          await suspendMutation.mutateAsync();
        }}
      />

      {/* Section: Delete user confirmation dialog */}
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus pelanggan"
        description={
          <span>
            Apakah Anda yakin ingin menghapus akun{" "}
            <strong>{user.full_name}</strong>? Tindakan ini akan menghapus
            pelanggan secara permanen dan tidak dapat dibatalkan.
          </span>
        }
        confirmLabel="Hapus"
        confirmVariant="destructive"
        isConfirming={deleteMutation.isPending}
        onConfirm={async () => {
          await deleteMutation.mutateAsync();
        }}
      />
    </div>
  );
}
