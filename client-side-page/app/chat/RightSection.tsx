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
            aria-label="Opsi percakapan"
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
          Hapus percakapan
        </MenuDropdownItem>
      </MenuDropdown>

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus percakapan"
        description="Semua pesan dalam percakapan ini akan dihapus secara permanen."
        confirmLabel="Hapus"
        confirmVariant="destructive"
        isConfirming={isDeletingConversation}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};
