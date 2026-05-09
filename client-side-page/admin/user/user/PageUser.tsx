"use client";

import { AccountList } from "client-side-page/admin/user/user/account-list/AccountList";
import { APP_URL } from "constant";

import { AdminAccountPageShell } from "@/components/atomic/layout/admin/AdminAccountPageShell";

export function PageUser() {
  return (
    <AdminAccountPageShell
      title="Pelanggan"
      description="Kelola akun pelanggan, status akses, dan informasi utama pengguna aplikasi."
      siblingHref={APP_URL.ADMIN_ADMIN_ACCOUNTS}
      siblingLabel="Buka halaman pengelola"
    >
      <AccountList />
    </AdminAccountPageShell>
  );
}
