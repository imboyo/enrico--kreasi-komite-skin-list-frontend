import { useState } from "react";

import { Button } from "@/components/atomic/atom/Button";
import { ConfirmationDialog } from "@/components/atomic/molecule/ConfirmationDialog";
import {
  MenuDropdown,
  MenuDropdownItem,
} from "@/components/atomic/molecule/MenuDropdown";
import { Icon } from "@iconify/react";

interface RightSectionProps {
  isDeletingConversation: boolean;
  onDeleteConversation: () => Promise<boolean>;
}

export const RightSection = ({
  isDeletingConversation,
  onDeleteConversation,
}: RightSectionProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  async function handleConfirmDelete() {
    const isDeleted = await onDeleteConversation();

    if (isDeleted) {
      setIsDeleteDialogOpen(false);
    }
  }

  return (
    <>
      <MenuDropdown
        trigger={
          <Button
            variant="ghost"
            size="md"
            iconOnly
            aria-label="Conversation options"
            disabled={isDeletingConversation}
            className="rounded-full"
          >
            <Icon icon="material-symbols:more-vert" />
          </Button>
        }
      >
        <MenuDropdownItem
          destructive
          disabled={isDeletingConversation}
          icon={<Icon icon="material-symbols:delete-outline" />}
          // Preventing the menu's default selection close keeps the follow-up
          // dialog handoff predictable on mobile browsers.
          onSelect={(event) => {
            event.preventDefault();
            setIsDeleteDialogOpen(true);
          }}
        >
          Delete conversation
        </MenuDropdownItem>
      </MenuDropdown>

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete conversation"
        description="This will permanently remove all messages in this conversation."
        confirmLabel="Delete"
        confirmVariant="destructive"
        isConfirming={isDeletingConversation}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};
