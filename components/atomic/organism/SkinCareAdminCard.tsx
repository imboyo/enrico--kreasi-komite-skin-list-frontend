"use client";

import { Icon } from "@iconify/react";
import type { ReactNode } from "react";

import { Checkbox } from "@/components/atomic/atom/Checkbox";

import type { AdminDefaultSkinCare } from "backend-service/admin/default-skin-care";

type SkinCareItemCardProps = {
  item: AdminDefaultSkinCare;
  icon?: ReactNode;
  actions?: ReactNode;
  isChecked?: boolean;
};

export function SkinCareAdminCard({
  item,
  icon = (
    <Icon icon="material-symbols:spa-outline-rounded" className="size-6" />
  ),
  actions,
  isChecked = false,
}: SkinCareItemCardProps) {
  return (
    <article className={`rounded-3xl border bg-background p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_6px_14px_rgba(90,90,90,0.08)] transition-all ${
      isChecked
        ? "border-secondary/70 bg-secondary/15 ring-2 ring-secondary/45"
        : "border-[#bcbcbc] hover:border-secondary/40 hover:bg-secondary/5"
    }`}>
      {/* Section: Skin care item identity and actions */}
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold text-foreground">
            {item.name}
          </h2>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
            {item.description?.trim() || "Belum ada deskripsi."}
          </p>
        </div>

        {actions ? (
          <div onClick={(event) => event.stopPropagation()}>{actions}</div>
        ) : null}
      </div>
    </article>
  );
}
