"use client";

import type { UserAccount } from "backend-service/admin/account/user";
import { ItemActions } from "client-side-page/admin/user/user/account-list/item-card/item-actions/ItemActions";
import { StatusBadge } from "client-side-page/admin/user/user/account-list/item-card/StatusBadge";
import { getInitials } from "@/libs/util/get-initials";
import { formatPhoneNumber } from "@/libs/util/format-phone-number";
import { useFilePreview } from "@/hooks/useFilePreview";

export function ItemCard({ user }: { user: UserAccount }) {
  const { url: photoUrl } = useFilePreview(user.profile_photo?.uuid ?? null);

  return (
    <article className="rounded-[24px] border border-[#bcbcbc] bg-background p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_6px_14px_rgba(90,90,90,0.08)] transition-all hover:border-primary/40 hover:bg-primary/5">
      {/* Section: User identity and actions */}
      <div className="flex items-start gap-3">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={`Foto profil ${user.full_name}`}
            className="size-11 shrink-0 rounded-2xl object-cover"
          />
        ) : (
          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary">
            {getInitials(user.full_name)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-semibold text-foreground">
            {user.full_name}
          </h2>
          <p className="mt-1 truncate text-sm text-muted-foreground">
            {user.email ?? "Belum Ada Email"}
          </p>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">
            {formatPhoneNumber(user.phone_number)}
          </p>
        </div>

        <ItemActions user={user} />
      </div>

      {/* Section: User metadata */}
      <div className="mt-4 flex items-center justify-end gap-3">
        <StatusBadge status={user.status} />
      </div>
    </article>
  );
}
