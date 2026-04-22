import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/util/cn";

export type FallbackProps = HTMLAttributes<HTMLDivElement> & {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
};

export function Fallback({
  action,
  className,
  description,
  title,
  ...props
}: FallbackProps) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-dashed border-border bg-card/80 px-5 py-6 text-center shadow-sm",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-2">
        <p className="text-base font-semibold text-foreground">{title}</p>
        {description ? (
          <p className="max-w-72 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        ) : null}
        {action ? <div className="pt-2">{action}</div> : null}
      </div>
    </div>
  );
}
