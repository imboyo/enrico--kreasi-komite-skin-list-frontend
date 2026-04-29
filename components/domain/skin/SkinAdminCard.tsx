"use client";

import { Icon } from "@iconify/react";
import type { ReactNode } from "react";
import { cn } from "util/cn";

export type SkinCareCardItem = {
  id: string;
  label: string;
  description: string;
  isChecked: boolean;
};

type SkinCareItemCardProps<TItem extends SkinCareCardItem> = {
  item: TItem;
  icon?: ReactNode;
  checkedLabel?: string;
  uncheckedLabel?: string;
  actions?: ReactNode;
};

export function SkinAdminCard<TItem extends SkinCareCardItem>({
  item,
  icon = (
    <Icon icon="material-symbols:spa-outline-rounded" className="size-6" />
  ),
  checkedLabel = "Default",
  uncheckedLabel = "Optional",
  actions,
}: SkinCareItemCardProps<TItem>) {
  return (
    <article className="rounded-3xl border border-[#bcbcbc] bg-background p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_6px_14px_rgba(90,90,90,0.08)] transition-all hover:border-primary/40 hover:bg-primary/5">
      {/* Section: Skin care item identity and actions */}
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="min-w-0 flex-1 text-base font-semibold text-foreground">
              {item.label}
            </h2>
            <span
              className={cn(
                "shrink-0 rounded-lg border px-2.5 py-1 text-[11px] font-medium",
                item.isChecked
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border bg-muted text-muted-foreground",
              )}
            >
              {item.isChecked ? checkedLabel : uncheckedLabel}
            </span>
          </div>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
            {item.description}
          </p>
        </div>

        {actions ? (
          <div onClick={(event) => event.stopPropagation()}>{actions}</div>
        ) : null}
      </div>
    </article>
  );
}
