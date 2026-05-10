"use client";

import type { AdminAccount } from "backend-service/admin/account/admin";

import { StatusBadge } from "client-side-page/admin/user/admin/item-list/item-card/StatusBadge";
import { ItemActions } from "client-side-page/admin/user/admin/item-list/item-card/item-actions/ItemActions";
import { cn } from "libs/util/cn";
import { getInitials } from "@/libs/util/get-initials";
import { useFilePreview } from "@/hooks/useFilePreview";

const STATUS_DOT_CLASS: Record<AdminAccount["status"], string> = {
  ACTIVE: "bg-emerald-500",
  INACTIVE: "bg-slate-400",
};

export function ItemCard({ admin }: { admin: AdminAccount }) {
  const { url: photoUrl } = useFilePreview(admin.profile_photo?.uuid ?? null);

  return (
    <article className="rounded-3xl border border-[#bcbcbc] bg-background p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_6px_14px_rgba(90,90,90,0.08)] transition-all hover:border-primary/40 hover:bg-primary/5">
      {/* Section: Admin identity and actions */}
      <div className="flex items-start gap-3">
        <div className="relative shrink-0">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={`Foto profil ${admin.full_name}`}
              className="size-11 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary">
              {getInitials(admin.full_name)}
            </div>
          )}
          {/* Online/offline status indicator dot */}
          <span
            className={cn(
              "absolute bottom-0.5 right-0.5 size-2.5 rounded-full border-2 border-background",
              STATUS_DOT_CLASS[admin.status],
            )}
          />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-semibold text-foreground">
            {admin.full_name}
          </h2>
          <p className="mt-1 truncate text-sm text-muted-foreground">
            {admin.email ?? "Belum ada email"}
          </p>
          <p className="mt-1 truncate text-xs text-muted-foreground">
            {admin.phone_number}
          </p>
        </div>

        <ItemActions admin={admin} />
      </div>

      {/* Section: Admin metadata */}
      <div className="mt-4 flex flex-wrap items-center justify-end gap-3">
        <StatusBadge status={admin.status} />
      </div>
    </article>
  );
}
