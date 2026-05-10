"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";

import type { AdminAccount } from "backend-service/admin/account/admin";

import { Button } from "components/atomic/atom/Button";
import {
  MenuDropdown,
  MenuDropdownItem,
  MenuDropdownSeparator,
} from "components/atomic/molecule/MenuDropdown";

import { EditAdminDialog } from "client-side-page/admin/user/admin/item-list/item-card/item-actions/edit-admin/EditAdminDialog";

export function ItemActions({ admin }: { admin: AdminAccount }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  function handleAction(action: string) {
    // Placeholder for admin account action wiring.
    console.log(`Admin manager action: ${action}`, admin);
  }

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
          onSelect={() => handleAction("change_password")}
        >
          Ubah password
        </MenuDropdownItem>
        <MenuDropdownSeparator />
        <MenuDropdownItem
          destructive
          icon={<Icon icon="material-symbols:person-off-outline" />}
          onSelect={() => handleAction("deactivate")}
        >
          Nonaktifkan
        </MenuDropdownItem>
        <MenuDropdownItem
          destructive
          icon={<Icon icon="material-symbols:delete-outline" />}
          onSelect={() => handleAction("delete")}
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
    </div>
  );
}
