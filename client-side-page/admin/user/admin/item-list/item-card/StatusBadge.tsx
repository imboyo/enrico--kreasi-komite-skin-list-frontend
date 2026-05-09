import { cva, type VariantProps } from "class-variance-authority";

import type { AdminAccount } from "backend-service/admin/account/admin";

import { Badge } from "components/atomic/atom/Badge";
import { cn } from "libs/util/cn";

const STATUS_LABEL: Record<AdminAccount["status"], string> = {
  INITIALIZING: "Inisialisasi",
  ACTIVE: "Aktif",
  INACTIVE: "Nonaktif",
  TO_DELETED: "Menunggu Hapus",
};

const statusBadgeVariants = cva("", {
  variants: {
    status: {
      INITIALIZING: "border-amber-500/30 bg-amber-500/10",
      ACTIVE: "border-emerald-500/30 bg-emerald-500/10",
      INACTIVE: "border-slate-400/30 bg-slate-500/10",
      TO_DELETED: "border-rose-500/30 bg-rose-500/10",
    },
  },
});

const statusLabelVariants = cva("capitalize", {
  variants: {
    status: {
      INITIALIZING: "text-amber-700",
      ACTIVE: "text-emerald-700",
      INACTIVE: "text-slate-600",
      TO_DELETED: "text-rose-700",
    },
  },
});

type StatusBadgeProps = {
  status: AdminAccount["status"];
} & VariantProps<typeof statusBadgeVariants>;

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge
      size="sm"
      label={STATUS_LABEL[status]}
      className={cn(statusBadgeVariants({ status }))}
      labelClassName={cn(statusLabelVariants({ status }))}
    />
  );
}
