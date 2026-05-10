"use client";

import { Icon } from "@iconify/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment, useState } from "react";

import type { AdminDefaultSkinCare } from "backend-service/admin/default-skin-care";
import { deleteDefaultSkinCare } from "backend-service/admin/default-skin-care";
import { Button } from "components/atomic/atom/Button";
import { ConfirmationDialog } from "components/atomic/molecule/ConfirmationDialog";
import {
  MenuDropdown,
  MenuDropdownItem,
  MenuDropdownSeparator,
} from "components/atomic/molecule/MenuDropdown";
import { useToast } from "components/provider/Toast";

import {
  ADMIN_DEFAULT_SKIN_CARE_QUERY_KEY,
  type AdminSkinActionId,
  type AdminSkinCategoryAction,
} from "../utils/skinCategory";

interface ItemActionsProps {
  item: AdminDefaultSkinCare;
  actions: AdminSkinCategoryAction[];
}

function getFirstDestructiveActionIndex(
  actions: AdminSkinCategoryAction[],
): number {
  return actions.findIndex((action) => action.destructive);
}

export function ItemActions({ item, actions }: Readonly<ItemActionsProps>) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const firstDestructiveActionIndex = getFirstDestructiveActionIndex(actions);

  const deleteMutation = useMutation({
    mutationFn: () => deleteDefaultSkinCare(item.uuid),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ADMIN_DEFAULT_SKIN_CARE_QUERY_KEY,
      });
      showToast("Data skin care berhasil dihapus.", { variant: "success" });
      setIsDeleteDialogOpen(false);
    },
    onError: () => {
      showToast("Gagal menghapus data skin care. Silakan coba lagi.", {
        variant: "error",
      });
    },
  });

  function handleActionSelect(actionId: AdminSkinActionId) {
    if (actionId === "delete") {
      setIsDeleteDialogOpen(true);
      return;
    }

    // Keep the edit action visible because the backend supports it, but make
    // the current UI limitation explicit instead of silently doing nothing.
    showToast("Fitur ubah skin care belum tersedia di halaman ini.", {
      variant: "normal",
    });
  }

  return (
    <div onClick={(event) => event.stopPropagation()}>
      {/* Section: Skin care item actions menu */}
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
        {actions.map((action, index) => (
          <Fragment key={action.id}>
            {/* Separate destructive actions so delete remains visually distinct. */}
            {index === firstDestructiveActionIndex &&
            firstDestructiveActionIndex > 0 ? (
              <MenuDropdownSeparator />
            ) : null}
            <MenuDropdownItem
              destructive={action.destructive}
              icon={<Icon icon={action.icon} />}
              onSelect={() => handleActionSelect(action.id)}
            >
              {action.label}
            </MenuDropdownItem>
          </Fragment>
        ))}
      </MenuDropdown>

      {/* Section: Delete skin care confirmation dialog */}
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus skin care"
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
