import { ItemList } from "client-side-page/admin/user/admin/item-list/ItemList";
import { APP_URL } from "constant";

import { AdminAccountPageShell } from "@/components/atomic/layout/admin/AdminAccountPageShell";

export function PageAdmin() {
  return (
    <AdminAccountPageShell
      title="Pengelola"
      description="Kelola akun admin, role, dan akses dashboard untuk tim internal."
      siblingHref={APP_URL.ADMIN_CUSTOMER_ACCOUNTS}
      siblingLabel="Buka halaman pelanggan"
    >
      {/* Section: Admin account list */}
      <ItemList />
    </AdminAccountPageShell>
  );
}
