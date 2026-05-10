import { cva, type VariantProps } from "class-variance-authority";

import type { AdminAccount } from "backend-service/admin/account/admin";

import { Badge } from "components/atomic/atom/Badge";
import { cn } from "libs/util/cn";

const STATUS_LABEL: Record<AdminAccount["status"], string> = {
  ACTIVE: "Aktif",
  INACTIVE: "Nonaktif",
};

const statusBadgeVariants = cva("", {
  variants: {
    status: {
      ACTIVE: "border-emerald-500/30 bg-emerald-500/10",
      INACTIVE: "border-slate-400/30 bg-slate-500/10",
    },
  },
});

const statusLabelVariants = cva("capitalize", {
  variants: {
    status: {
      ACTIVE: "text-emerald-700",
      INACTIVE: "text-slate-600",
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
