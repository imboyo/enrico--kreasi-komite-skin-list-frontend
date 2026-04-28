"use client";

import { ClassNames, keyframes } from "@emotion/react";
import { DropdownMenu as RadixDropdownMenu } from "radix-ui";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";

import { cn } from "@/util/cn";

type MenuDropdownProps = {
  trigger: ReactNode;
  children: ReactNode;
  align?: ComponentPropsWithoutRef<typeof RadixDropdownMenu.Content>["align"];
  side?: ComponentPropsWithoutRef<typeof RadixDropdownMenu.Content>["side"];
  sideOffset?: number;
  className?: string;
};

type MenuDropdownItemProps = ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.Item
> & {
  icon?: ReactNode;
  destructive?: boolean;
};

const dropdownContentIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px) scale(0.96);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const dropdownContentOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  to {
    opacity: 0;
    transform: translateY(-4px) scale(0.96);
  }
`;

export function MenuDropdown({
  trigger,
  children,
  align = "end",
  side = "bottom",
  sideOffset = 8,
  className,
}: MenuDropdownProps) {
  return (
    <RadixDropdownMenu.Root>
      {/* Trigger section */}
      <RadixDropdownMenu.Trigger asChild>{trigger}</RadixDropdownMenu.Trigger>

      {/* Dropdown menu section */}
      <RadixDropdownMenu.Portal>
        <ClassNames>
          {({ css }) => (
            <RadixDropdownMenu.Content
              align={align}
              side={side}
              sideOffset={sideOffset}
              className={cn(
                css`
                  transform-origin: var(
                    --radix-dropdown-menu-content-transform-origin
                  );
                  will-change: opacity, transform;

                  &[data-state="open"] {
                    animation: ${dropdownContentIn} 160ms ease-out forwards;
                  }

                  &[data-state="closed"] {
                    animation: ${dropdownContentOut} 120ms ease-in forwards;
                  }
                `,
                "z-50 min-w-52 overflow-hidden rounded-lg border border-border bg-background p-1 text-foreground shadow-lg shadow-foreground/10",
                className,
              )}
            >
              {children}
            </RadixDropdownMenu.Content>
          )}
        </ClassNames>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
}

export function MenuDropdownLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <RadixDropdownMenu.Label
      className={cn(
        "px-3 py-2 text-xs font-medium text-muted-foreground",
        className,
      )}
    >
      {children}
    </RadixDropdownMenu.Label>
  );
}

export function MenuDropdownItem({
  icon,
  destructive,
  children,
  className,
  ...props
}: MenuDropdownItemProps) {
  return (
    <RadixDropdownMenu.Item
      className={cn(
        "flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm outline-none transition-colors duration-150",
        "hover:bg-foreground/10 focus:bg-foreground/10 data-disabled:pointer-events-none data-disabled:opacity-50",
        destructive
          ? "text-destructive hover:bg-destructive/10 focus:bg-destructive/10"
          : "text-foreground",
        className,
      )}
      {...props}
    >
      {/* Optional icon slot */}
      {icon ? (
        <span className="inline-flex size-5 shrink-0 items-center justify-center">
          {icon}
        </span>
      ) : null}
      <span className="min-w-0 flex-1">{children}</span>
    </RadixDropdownMenu.Item>
  );
}

export function MenuDropdownSeparator({ className }: { className?: string }) {
  return (
    <RadixDropdownMenu.Separator
      className={cn("my-1 h-px bg-border", className)}
    />
  );
}
