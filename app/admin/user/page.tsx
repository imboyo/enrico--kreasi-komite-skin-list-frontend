import type { Metadata } from "next";

import { PageAdminUser } from "@/client-side-page/admin/user/PageAdminUser";

export const metadata: Metadata = {
  title: "User List",
};

export default function AdminUserPage() {
  return <PageAdminUser />;
}
