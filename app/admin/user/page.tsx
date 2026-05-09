import type { Metadata } from "next";
import Link from "next/link";

import { APP_URL } from "@/constant";

export const metadata: Metadata = {
  title: "Account Management",
};

export default function AdminUserPage() {
  const managementPages = [
    {
      description:
        "Kelola akun pelanggan, status akses, dan informasi utama pengguna aplikasi.",
      href: APP_URL.ADMIN_CUSTOMER_ACCOUNTS,
      label: "Pelanggan",
    },
    {
      description:
        "Kelola akun admin, role, dan akses dashboard untuk tim internal.",
      href: APP_URL.ADMIN_ADMIN_ACCOUNTS,
      label: "Pengelola",
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-4 lg:px-8 lg:py-6">
      {/* Section: Management page header */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Manajemen Akun
        </p>
        <h1 className="text-2xl font-semibold text-foreground">
          Pilih halaman pengelolaan
        </h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Gunakan halaman yang sesuai untuk mengelola akun pelanggan atau
          pengelola tanpa redirect antar route.
        </p>
      </div>

      {/* Section: Management page shortcuts */}
      <div className="grid gap-4 md:grid-cols-2">
        {managementPages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="flex min-h-40 flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-muted"
          >
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">
                {page.label}
              </h2>
              <p className="text-sm leading-6 text-muted-foreground">
                {page.description}
              </p>
            </div>

            <span className="text-sm font-medium text-foreground">
              Buka halaman
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
