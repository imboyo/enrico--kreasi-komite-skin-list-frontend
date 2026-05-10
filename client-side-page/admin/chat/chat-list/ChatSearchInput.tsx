"use client";

import { Icon } from "@iconify/react";

import { TextInput } from "components/atomic/atom/TextInput";

type ChatSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ChatSearchInput({ value, onChange }: ChatSearchInputProps) {
  return (
    <TextInput
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search email or full name"
      aria-label="Search chats by email or full name"
      startItem={<Icon icon="lucide:search" />}
      endItem={
        value ? (
          <button
            type="button"
            aria-label="Clear chat search"
            onClick={() => onChange("")}
            className="flex size-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Icon icon="lucide:x" className="size-4" />
          </button>
        ) : null
      }
    />
  );
}

