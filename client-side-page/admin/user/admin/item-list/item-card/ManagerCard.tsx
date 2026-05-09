import type { AdminManager } from "mock-backend/admin/user/admins";
import { RoleBadge } from "client-side-page/admin/user/admin/item-list/item-card/RoleBadge";
import { ItemActions } from "client-side-page/admin/user/admin/item-list/item-card/ItemActions";
import { cn } from "libs/util/cn";

function getAdminInitials(fullName: string) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((name) => name[0])
    .join("")
    .toUpperCase();
}

const STATUS_DOT_CLASS: Record<AdminManager["status"], string> = {
  active: "bg-emerald-500",
  inactive: "bg-slate-400",
};

export function ManagerCard({ admin }: { admin: AdminManager }) {
  return (
    <article className="rounded-[24px] border border-[#bcbcbc] bg-background p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_6px_14px_rgba(90,90,90,0.08)] transition-all hover:border-primary/40 hover:bg-primary/5">
      {/* Section: Admin identity and actions */}
      <div className="flex items-start gap-3">
        <div className="relative flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-sm font-semibold text-primary">
          {getAdminInitials(admin.fullName)}
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
            {admin.fullName}
          </h2>
          <p className="mt-1 truncate text-sm text-muted-foreground">
            {admin.email}
          </p>
        </div>

        <ItemActions admin={admin} />
      </div>

      {/* Section: Admin role */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-muted-foreground">Role</span>
        <RoleBadge role={admin.role} />
      </div>
    </article>
  );
}
