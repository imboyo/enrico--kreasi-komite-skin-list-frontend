"use client";

import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useRef,
  useState,
} from "react";
import { Icon } from "@iconify/react";

import { Button } from "@/components/atomic/atom/Button";
import { cn } from "@/util/cn";

interface ChatInputProps {
  onSendText: (text: string) => void;
  onSendImage: (file: File) => void;
  onSendFile: (file: File) => void;
  disabled?: boolean;
  placeholder?: string;
}

// Composer for the chat page: text, image, and file uploads in one bar.
export function ChatInput({
  onSendText,
  onSendImage,
  onSendFile,
  disabled,
  placeholder = "Type a message…",
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const [isAttachMenuOpen, setIsAttachMenuOpen] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow the textarea up to a max height so long messages stay readable.
  function autoResize(element: HTMLTextAreaElement) {
    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, 140)}px`;
  }

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value);
    autoResize(event.target);
  }

  function submitText() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSendText(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitText();
  }

  // Enter to send, Shift+Enter for newline — the common chat UX expectation.
  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitText();
    }
  }

  function handleImagePick(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) onSendImage(file);
    event.target.value = "";
    setIsAttachMenuOpen(false);
  }

  function handleFilePick(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) onSendFile(file);
    event.target.value = "";
    setIsAttachMenuOpen(false);
  }

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <form
      onSubmit={handleSubmit}
      className="relative shrink-0 border-t border-border/70 bg-background px-3 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]"
    >
      {/* Attachment menu: shown above the attached button when toggled. */}
      {isAttachMenuOpen && (
        <div className="absolute bottom-full left-3 mb-2 flex flex-col gap-1 rounded-2xl border border-border bg-background p-1 shadow-[0_8px_24px_rgba(60,60,60,0.12)]">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-muted"
            onClick={() => imageInputRef.current?.click()}
          >
            <Icon icon="material-symbols:image-outline-rounded" className="size-5" />
            Image
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-muted"
            onClick={() => fileInputRef.current?.click()}
          >
            <Icon
              icon="material-symbols:attach-file-rounded"
              className="size-5"
            />
            File
          </button>
        </div>
      )}

      <div className="flex items-end gap-2">
        <Button
          type="button"
          variant="ghost"
          size="md"
          iconOnly
          aria-label="Add attachment"
          className={cn(
            "rounded-full",
            isAttachMenuOpen && "bg-muted",
          )}
          onClick={() => setIsAttachMenuOpen((prev) => !prev)}
          disabled={disabled}
        >
          <Icon icon="material-symbols:add-rounded" />
        </Button>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          disabled={disabled}
          className="min-h-10 max-h-35 flex-1 resize-none rounded-2xl border border-input bg-input-surface px-4 py-2.5 text-sm leading-snug outline-none focus:ring-2 focus:ring-ring"
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          iconOnly
          aria-label="Send message"
          className="rounded-full"
          disabled={!canSend}
        >
          <Icon icon="material-symbols:send-rounded" />
        </Button>
      </div>

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleImagePick}
      />
      <input
        ref={fileInputRef}
        type="file"
        hidden
        onChange={handleFilePick}
      />
    </form>
  );
}
