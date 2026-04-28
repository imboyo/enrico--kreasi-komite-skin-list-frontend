import { Button } from "@/components/atomic/atom/Button";
import {
  MenuDropdown,
  MenuDropdownItem,
} from "@/components/atomic/molecule/MenuDropdown";
import { Icon } from "@iconify/react";

export const RightSection = () => {
  return (
    <MenuDropdown
      trigger={
        <Button
          variant="ghost"
          size="md"
          iconOnly
          aria-label="Conversation options"
          className="rounded-full"
        >
          <Icon icon="material-symbols:more-vert" />
        </Button>
      }
    >
      <MenuDropdownItem
        destructive
        icon={<Icon icon="material-symbols:delete-outline" />}
      >
        Delete conversation
      </MenuDropdownItem>
    </MenuDropdown>
  );
};
