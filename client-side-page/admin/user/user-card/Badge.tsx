import { Badge } from "@/components/atomic/atom/Badge";
import type { AdminUserStatus } from "@/mock-backend/admin/user/users";
import { cn } from "@/util/cn";

const USER_STATUS_LABEL: Record<AdminUserStatus, string> = {
  active: "Active",
  inactive: "Inactive",
  suspended: "Suspended",
};

const USER_STATUS_CLASS_NAME: Record<AdminUserStatus, string> = {
  active: "border-emerald-500/30 bg-emerald-500/10",
  inactive: "border-slate-400/30 bg-slate-500/10",
  suspended: "border-rose-500/30 bg-rose-500/10",
};

const USER_STATUS_LABEL_CLASS_NAME: Record<AdminUserStatus, string> = {
  active: "text-emerald-700",
  inactive: "text-slate-600",
  suspended: "text-rose-700",
};

export function UserStatusBadge({ status }: { status: AdminUserStatus }) {
  return (
    <Badge
      size="sm"
      label={USER_STATUS_LABEL[status]}
      className={USER_STATUS_CLASS_NAME[status]}
      labelClassName={cn("capitalize", USER_STATUS_LABEL_CLASS_NAME[status])}
    />
  );
}
