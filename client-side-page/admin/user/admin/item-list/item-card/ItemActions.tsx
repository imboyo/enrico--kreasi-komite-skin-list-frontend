"use client";

import { Icon } from "@iconify/react";

import { Button } from "components/atomic/atom/Button";
import {
  MenuDropdown,
  MenuDropdownItem,
  MenuDropdownSeparator,
} from "components/atomic/molecule/MenuDropdown";
import type { AdminManager } from "mock-backend/admin/user/admins";

export function ItemActions({ admin }: { admin: AdminManager }) {
  function handleAction(action: string) {
    // Placeholder for admin manager action wiring.
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
            aria-label={`Open actions for ${admin.fullName}`}
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
          Edit admin
        </MenuDropdownItem>
        <MenuDropdownItem
          icon={<Icon icon="material-symbols:shield-outline" />}
          onSelect={() => handleAction("change-role")}
        >
          Change role
        </MenuDropdownItem>
        <MenuDropdownSeparator />
        <MenuDropdownItem
          destructive
          icon={<Icon icon="material-symbols:person-off-outline" />}
          onSelect={() => handleAction("deactivate")}
        >
          Deactivate
        </MenuDropdownItem>
        <MenuDropdownItem
          destructive
          icon={<Icon icon="material-symbols:delete-outline" />}
          onSelect={() => handleAction("delete")}
        >
          Delete admin
        </MenuDropdownItem>
      </MenuDropdown>
    </div>
  );
}
