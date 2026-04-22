"use client";

import { TextInput } from "@/components/atomic/atom/TextInput";
import { Icon } from "@iconify/react";

const DEMO_ROWS = [
  {
    label: "Basic",
    placeholder: "Type your skin concern",
  },
  {
    label: "With start item",
    placeholder: "Search ingredients",
    startItem: <Icon icon="material-symbols:search-rounded" />,
  },
  {
    label: "With start and end items",
    placeholder: "Send your question",
    startItem: <Icon icon="material-symbols:mail-outline-rounded" />,
    endItem: (
      <button
        type="button"
        className="rounded-full bg-[#3b3b3b] px-3 py-1 text-xs font-medium text-white"
      >
        Send
      </button>
    ),
  },
] as const;

export function PageTextInput() {
  return (
    <main className="flex min-h-screen flex-col gap-6 px-4 py-4">
      <section className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Input Demo
        </p>
        <h1 className="text-[32px] font-medium leading-tight text-foreground">
          Flexible text input with JSX start and end items.
        </h1>
        <p className="text-sm leading-6 text-muted-foreground">
          The shared atom forwards native input props and uses the exact
          background and placeholder colors you requested.
        </p>
      </section>

      <section className="flex flex-col gap-4 rounded-[28px] bg-card p-4 shadow-[0_10px_30px_rgba(31,41,55,0.08)]">
        {DEMO_ROWS.map((item) => (
          <div key={item.label} className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              {item.label}
            </label>
            {/* Each row demonstrates passing arbitrary JSX into the start and end slots. */}
            <TextInput
              placeholder={item.placeholder}
              startItem={item.startItem}
              endItem={item.endItem}
            />
          </div>
        ))}
      </section>
    </main>
  );
}
