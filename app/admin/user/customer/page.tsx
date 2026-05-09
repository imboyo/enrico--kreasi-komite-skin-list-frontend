import type { Metadata } from "next";

import { PageUser } from "client-side-page/admin/user/user/PageUser";

export const metadata: Metadata = {
  title: "Customer Accounts",
};

export default function AdminCustomerAccountsPage() {
  return <PageUser />;
}
