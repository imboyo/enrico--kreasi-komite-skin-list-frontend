import { Badge } from "components/atomic/atom/Badge";
import type { AccountStatus } from "backend-service/admin/account";
import { cn } from "libs/util/cn";

const USER_STATUS_LABEL: Record<AccountStatus, string> = {
  INITIALIZING: "Inisialisasi",
  ACTIVE: "Aktif",
  INACTIVE: "Tidak Aktif",
  TO_DELETED: "Akan Dihapus",
};

const USER_STATUS_CLASS_NAME: Record<AccountStatus, string> = {
  INITIALIZING: "border-amber-500/30 bg-amber-500/10",
  ACTIVE: "border-emerald-500/30 bg-emerald-500/10",
  INACTIVE: "border-slate-400/30 bg-slate-500/10",
  TO_DELETED: "border-rose-500/30 bg-rose-500/10",
};

const USER_STATUS_LABEL_CLASS_NAME: Record<AccountStatus, string> = {
  INITIALIZING: "text-amber-700",
  ACTIVE: "text-emerald-700",
  INACTIVE: "text-slate-600",
  TO_DELETED: "text-rose-700",
};

export function StatusBadge({ status }: { status: AccountStatus }) {
  return (
    <Badge
      size="sm"
      label={USER_STATUS_LABEL[status]}
      className={USER_STATUS_CLASS_NAME[status]}
      labelClassName={cn("capitalize", USER_STATUS_LABEL_CLASS_NAME[status])}
    />
  );
}
