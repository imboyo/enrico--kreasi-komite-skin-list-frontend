import type { Metadata } from "next";

import { PageAdmin } from "client-side-page/admin/user/admin/PageAdmin";

export const metadata: Metadata = {
  title: "Admin Accounts",
};

export default function AdminManagerAccountsPage() {
  return <PageAdmin />;
}
