"use client";

import { Icon } from "@iconify/react";

import { Button } from "@/components/atomic/atom/Button";
import {
  MenuDropdown,
  MenuDropdownItem,
  MenuDropdownSeparator,
} from "@/components/atomic/molecule/MenuDropdown";
import { type AdminUser } from "@/mock-backend/admin/user/users";

export function ItemActions({ user }: { user: AdminUser }) {
  function handleAction(action: string) {
    // Placeholder for the next admin action wiring while keeping row clicks isolated.
    console.log(`Admin user action: ${action}`, user);
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
            aria-label={`Open actions for ${user.fullName}`}
            className="rounded-full"
          >
            <Icon icon="material-symbols:more-vert" />
          </Button>
        }
      >
        {/* Section: User row actions */}
        <MenuDropdownItem
          icon={<Icon icon="material-symbols:edit-outline-rounded" />}
          onSelect={() => handleAction("edit")}
        >
          Edit user
        </MenuDropdownItem>
        <MenuDropdownSeparator />
        <MenuDropdownItem
          destructive
          icon={<Icon icon="material-symbols:person-off-outline" />}
          onSelect={() => handleAction("suspend")}
        >
          Suspend user
        </MenuDropdownItem>
        <MenuDropdownItem
          destructive
          icon={<Icon icon="material-symbols:delete-outline" />}
          onSelect={() => handleAction("delete")}
        >
          Delete user
        </MenuDropdownItem>
      </MenuDropdown>
    </div>
  );
}
