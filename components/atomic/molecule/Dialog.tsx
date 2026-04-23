import { Dialog as RadixDialog } from "radix-ui";
import { type CSSProperties, type ReactNode } from "react";
import { cn } from "@/util/cn";

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Controlled trigger element — omit if you manage open state yourself */
  trigger?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Dialog surface token. Keeps the original dark style by default. */
  surface?: "dialog" | "dialog-2";
  /** Override dialog panel width (default: fit content, capped by mobile shell) */
  width?: CSSProperties["width"];
  /** Override dialog panel max-height (default: 80vh) */
  maxHeight?: CSSProperties["maxHeight"];
}

export default function Dialog({
  open,
  onOpenChange,
  trigger,
  children,
  className,
  surface = "dialog",
  width,
  maxHeight = "80vh",
}: DialogProps) {
  const surfaceClasses =
    surface === "dialog-2"
      ? [
          "[--dialog-current:var(--dialog-2)]",
          "[--dialog-current-foreground:var(--dialog-2-foreground)]",
          "[--dialog-current-muted:var(--dialog-2-muted)]",
          "[--dialog-current-border:var(--dialog-2-border)]",
        ]
      : [
          "[--dialog-current:var(--dialog)]",
          "[--dialog-current-foreground:var(--dialog-foreground)]",
          "[--dialog-current-muted:var(--dialog-muted)]",
          "[--dialog-current-border:rgba(255,255,255,0.1)]",
        ];

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}

      <RadixDialog.Portal>
        {/* Semi-transparent overlay behind the dialog */}
        <RadixDialog.Overlay className="dialog-overlay fixed inset-0 z-40 bg-black/50" />

        <RadixDialog.Content
          style={{ width, maxHeight }}
          className={cn(
            // Positioning: centered inside the mobile shell
            "dialog-content fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            // Sizing
            "w-[calc(100vw-2rem)] max-w-[468px]",
            // Glass effect: blurred backdrop + semi-transparent bg
            "rounded-2xl border border-dialog-current-border bg-dialog-current/92 backdrop-blur-md shadow-xl",
            // Surface tokens let each dialog switch palettes without duplicating structure.
            "text-dialog-current-foreground",
            surfaceClasses,
            className,
          )}
        >
          {/* Scrollable inner area — overflows vertically when content is tall */}
          <div
            className="overflow-y-auto"
            style={{ maxHeight }}
          >
            {children}
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

/* ── Sub-components consumers can use to structure the dialog ── */

export function DialogHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between px-5 pt-5 pb-3", className)}>
      {children}
    </div>
  );
}

export function DialogTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <RadixDialog.Title
      className={cn("text-base font-semibold text-dialog-current-foreground", className)}
    >
      {children}
    </RadixDialog.Title>
  );
}

export function DialogDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <RadixDialog.Description
      className={cn("text-sm text-dialog-current-muted", className)}
    >
      {children}
    </RadixDialog.Description>
  );
}

export function DialogBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-5 py-3 text-dialog-current-foreground", className)}>
      {children}
    </div>
  );
}

export function DialogFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-end gap-2 px-5 pb-5 pt-3", className)}>
      {children}
    </div>
  );
}

export function DialogClose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <RadixDialog.Close asChild>
      <span className={cn("cursor-pointer", className)}>{children}</span>
    </RadixDialog.Close>
  );
}
