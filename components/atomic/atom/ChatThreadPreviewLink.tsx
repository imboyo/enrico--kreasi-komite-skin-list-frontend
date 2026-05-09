import Link from "next/link";

import { cn } from "@/libs/util/cn";

type ChatThreadPreviewLinkProps = {
  href: string;
  customerName: string;
  latestMessage: string;
  timestampLabel: string;
  className?: string;
};

export function ChatThreadPreviewLink({
  href,
  customerName,
  latestMessage,
  timestampLabel,
  className,
}: ChatThreadPreviewLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col gap-2 rounded-2xl border border-border/60 bg-muted/35 px-3 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:bg-muted/70 hover:shadow-[0_12px_24px_rgba(60,60,60,0.08)]",
        className,
      )}
    >
      {/* Section: Customer name and latest message timestamp */}
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium transition-colors group-hover:text-foreground/90">
          {customerName}
        </p>
        <span className="shrink-0 text-[11px] text-muted-foreground transition-colors group-hover:text-foreground/70">
          {timestampLabel}
        </span>
      </div>

      {/* Section: Latest message preview */}
      <p className="line-clamp-2 text-sm text-muted-foreground transition-colors group-hover:text-foreground/80">
        {latestMessage}
      </p>
    </Link>
  );
}
