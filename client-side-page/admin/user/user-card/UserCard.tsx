import type { AdminUser } from "@/mock-backend/admin/user/users";
import { ItemActions } from "@/client-side-page/admin/user/user-card/item-actions/ItemActions";
import { UserStatusBadge } from "@/client-side-page/admin/user/user-card/Badge";

function getUserInitials(fullName: string) {
  // Use the first two name segments so the avatar remains stable and compact.
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((name) => name[0])
    .join("")
    .toUpperCase();
}

export function UserCard({ user }: { user: AdminUser }) {
  return (
    <article className="rounded-[24px] border border-[#bcbcbc] bg-background p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_6px_14px_rgba(90,90,90,0.08)] transition-all hover:border-primary/40 hover:bg-primary/5">
      {/* Section: User identity and actions */}
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary">
          {getUserInitials(user.fullName)}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-semibold text-foreground">
            {user.fullName}
          </h2>
          <p className="mt-1 truncate text-sm text-muted-foreground">
            {user.email}
          </p>
        </div>

        <ItemActions user={user} />
      </div>

      {/* Section: User metadata */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-muted-foreground">
          Status
        </span>
        <UserStatusBadge status={user.status} />
      </div>
    </article>
  );
}
