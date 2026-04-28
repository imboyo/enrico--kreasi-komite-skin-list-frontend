import type { Metadata } from "next";

import { PageAdmin } from "@/client-side-page/admin/PageAdmin";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function AdminDashboardPage() {
  return <PageAdmin />;
}
