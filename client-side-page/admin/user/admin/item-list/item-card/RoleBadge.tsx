import { Badge } from "components/atomic/atom/Badge";
import type { AdminManagerRole } from "mock-backend/admin/user/admins";
import { cn } from "libs/util/cn";

const ROLE_LABEL: Record<AdminManagerRole, string> = {
  "super-admin": "Super Admin",
  moderator: "Moderator",
  "content-manager": "Content Manager",
};

const ROLE_CLASS_NAME: Record<AdminManagerRole, string> = {
  "super-admin": "border-violet-500/30 bg-violet-500/10",
  moderator: "border-blue-500/30 bg-blue-500/10",
  "content-manager": "border-amber-500/30 bg-amber-500/10",
};

const ROLE_LABEL_CLASS_NAME: Record<AdminManagerRole, string> = {
  "super-admin": "text-violet-700",
  moderator: "text-blue-700",
  "content-manager": "text-amber-700",
};

export function RoleBadge({ role }: { role: AdminManagerRole }) {
  return (
    <Badge
      size="sm"
      label={ROLE_LABEL[role]}
      className={ROLE_CLASS_NAME[role]}
      labelClassName={cn("capitalize", ROLE_LABEL_CLASS_NAME[role])}
    />
  );
}
