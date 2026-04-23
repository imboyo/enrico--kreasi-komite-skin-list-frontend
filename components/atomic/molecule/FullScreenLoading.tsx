import { Icon } from "@iconify/react";

interface FullScreenLoadingProps {
  visible: boolean;
  message?: string;
}

/** Full-viewport overlay shown during async operations that block user interaction. */
export function FullScreenLoading({ visible, message }: FullScreenLoadingProps) {
  if (!visible) {
    return null;
  }

  return (
    // Fixed overlay covers the entire viewport so the user cannot tap anything behind it.
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-3 bg-black/50 backdrop-blur-sm"
      aria-busy="true"
      aria-label={message ?? "Loading"}
    >
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-background px-8 py-6 shadow-xl">
        <Icon
          icon="lucide:loader-circle"
          className="size-8 animate-spin text-primary"
        />

        {message && (
          <p className="text-sm font-medium text-foreground">{message}</p>
        )}
      </div>
    </div>
  );
}
