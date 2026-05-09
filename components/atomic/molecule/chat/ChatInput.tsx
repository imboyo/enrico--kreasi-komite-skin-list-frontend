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

interface ChatInputProps {
  onSendText: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

// Composer for the chat page: text only until attachment uploads are supported.
export function ChatInput({
  onSendText,
  disabled,
  placeholder = "Ketik pesan…",
}: ChatInputProps) {
  const [value, setValue] = useState("");
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

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <form
      onSubmit={handleSubmit}
      className="relative shrink-0 border-t border-border/70 bg-background px-3 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]"
    >
      <div className="flex items-end gap-2">
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
          aria-label="Kirim pesan"
          className="rounded-full"
          disabled={!canSend}
        >
          <Icon icon="material-symbols:send-rounded" />
        </Button>
      </div>
    </form>
  );
}
