"use client";

import * as RadixPopover from "@radix-ui/react-popover";
import { type ReactNode } from "react";

interface Props {
  trigger: ReactNode;
  children: ReactNode;
  /** Preferred side relative to the trigger. Defaults to "top". */
  side?: "top" | "right" | "bottom" | "left";
  /** Gap between trigger and popover panel in px. Defaults to 6. */
  sideOffset?: number;
}

/** Controlled-free, accessible popover. Wrap the trigger and panel content. */
export function Popover({
  trigger,
  children,
  side = "top",
  sideOffset = 6,
}: Props) {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          side={side}
          sideOffset={sideOffset}
          className="z-50 max-w-65 rounded-lg border border-background/35 bg-foreground px-3 py-2 text-xs text-background shadow-md shadow-foreground/15 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          {children}
          <RadixPopover.Arrow className="fill-foreground stroke-background/35" />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}
