import { Badge } from "components/atomic/atom/Badge";
import type { UserAccount } from "backend-service/admin/account/user";
import { cn } from "libs/util/cn";

const USER_STATUS_LABEL: Record<UserAccount["status"], string> = {
  ACTIVE: "Aktif",
  INACTIVE: "Tidak Aktif",
};

const USER_STATUS_CLASS_NAME: Record<UserAccount["status"], string> = {
  ACTIVE: "border-emerald-500/30 bg-emerald-500/10",
  INACTIVE: "border-slate-400/30 bg-slate-500/10",
};

const USER_STATUS_LABEL_CLASS_NAME: Record<UserAccount["status"], string> = {
  ACTIVE: "text-emerald-700",
  INACTIVE: "text-slate-600",
};

export function StatusBadge({ status }: { status: UserAccount["status"] }) {
  return (
    <Badge
      size="sm"
      label={USER_STATUS_LABEL[status]}
      className={USER_STATUS_CLASS_NAME[status]}
      labelClassName={cn("capitalize", USER_STATUS_LABEL_CLASS_NAME[status])}
    />
  );
}
