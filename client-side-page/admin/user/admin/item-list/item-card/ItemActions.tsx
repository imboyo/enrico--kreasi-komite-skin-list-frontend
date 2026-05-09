"use client";

import { Icon } from "@iconify/react";

import type { AdminAccount } from "backend-service/admin/account/admin";

import { Button } from "components/atomic/atom/Button";
import {
  MenuDropdown,
  MenuDropdownItem,
  MenuDropdownSeparator,
} from "components/atomic/molecule/MenuDropdown";

export function ItemActions({ admin }: { admin: AdminAccount }) {
  function handleAction(action: string) {
    // Placeholder for admin account action wiring.
    console.log(`Admin manager action: ${action}`, admin);
  }

  return (
    <div onClick={(event) => event.stopPropagation()}>
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
        {/* Section: Admin row actions */}
        <MenuDropdownItem
          icon={<Icon icon="material-symbols:edit-outline-rounded" />}
          onSelect={() => handleAction("edit")}
        >
          Ubah admin
        </MenuDropdownItem>
        <MenuDropdownItem
          icon={<Icon icon="material-symbols:shield-outline" />}
          onSelect={() => handleAction("change-role")}
        >
          Ubah role
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
    </div>
  );
}
