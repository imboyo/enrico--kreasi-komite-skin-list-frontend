"use client";

import { Icon } from "@iconify/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { cleanAdminSkinChatThread } from "backend-service/admin/skin-chat";
import type { AdminSkinChatThread } from "backend-service/admin/skin-chat";
import { Button } from "components/atomic/atom/Button";
import { ConfirmationDialog } from "components/atomic/molecule/ConfirmationDialog";
import { MenuDropdown, MenuDropdownItem } from "components/atomic/molecule/MenuDropdown";
import { ChatBubble } from "components/atomic/molecule/chat/ChatBubble";
import { ChatInput } from "components/atomic/molecule/chat/ChatInput";
import { ChatTopbar } from "components/atomic/organism/topbar/ChatTopbar";
import { MessagesSkeleton } from "components/atomic/molecule/MessageSkeleton";
import { useToast } from "components/provider/Toast";
import { APP_URL } from "constant";

import { useAdminChatDetail } from "./useAdminChatDetail";

type AdminChatThreadProps = {
  thread: AdminSkinChatThread;
};

export function AdminChatThread({ thread }: AdminChatThreadProps) {
  const {
    errorMessage,
    handleSendText,
    hasMore,
    isInitialError,
    isInitialLoading,
    isLoadingOlder,
    isSendingText,
    loadOlderMessages,
    messages,
    scrollRef,
  } = useAdminChatDetail(thread.user.uuid);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteMutation = useMutation({
    mutationFn: () => cleanAdminSkinChatThread(thread.user.uuid),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["admin-skin-chat-threads"],
      });
      showToast("Percakapan berhasil dihapus.", { variant: "success" });
      router.push(APP_URL.ADMIN_CHATS);
    },
    onError: () => {
      showToast("Gagal menghapus percakapan. Silakan coba lagi.", {
        variant: "error",
      });
    },
  });

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border/70 bg-background">
      <ChatTopbar
        backHref={APP_URL.ADMIN_CHATS}
        title={thread.user.full_name}
        subtitle={thread.user.email}
        rightSection={
          <MenuDropdown
            align="end"
            side="bottom"
            trigger={
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                aria-label={`Buka aksi untuk percakapan ${thread.user.full_name}`}
                className="rounded-full"
              >
                <Icon icon="material-symbols:more-vert" />
              </Button>
            }
          >
            <MenuDropdownItem
              destructive
              icon={<Icon icon="material-symbols:delete-outline-rounded" />}
              onSelect={() => setIsDeleteDialogOpen(true)}
            >
              Hapus Percakapan
            </MenuDropdownItem>
          </MenuDropdown>
        }
      />

      {/* Section: Messages */}
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 pt-4">
        {/* Load more older messages button */}
        {!isInitialLoading && hasMore && (
          <div className="mb-3 flex justify-center">
            <button
              onClick={() => void loadOlderMessages()}
              disabled={isLoadingOlder}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground shadow-sm transition-colors hover:bg-muted disabled:opacity-50"
            >
              {isLoadingOlder ? "Memuat..." : "Muat pesan sebelumnya"}
            </button>
          </div>
        )}

        {/* Error message section */}
        {(errorMessage || isInitialError) && (
          <p className="pb-3 text-center text-xs text-destructive">
            {errorMessage ?? "Riwayat chat gagal dimuat."}
          </p>
        )}

        {/* Messages content section */}
        {isInitialLoading ? (
          <MessagesSkeleton />
        ) : (
          <div className="flex flex-col gap-3 pb-4">
            {messages.map((message) => (
              <ChatBubble
                key={message.uuid}
                message={message}
                selfRole="ADMIN"
              />
            ))}
          </div>
        )}
      </div>

      {/* Section: Fixed admin composer */}
      <div className="shrink-0">
        <ChatInput
          onSendText={handleSendText}
          disabled={isSendingText}
          placeholder={`Balas ke ${thread.user.full_name}`}
        />
      </div>

      {/* Section: Delete conversation confirmation dialog — kept outside the dropdown so menu close does not unmount it */}
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus Percakapan"
        description={
          <span>
            Apakah Anda yakin ingin menghapus percakapan dengan{" "}
            <strong>{thread.user.full_name}</strong>? Tindakan ini akan
            menghapus semua pesan secara permanen dan tidak dapat dibatalkan.
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
