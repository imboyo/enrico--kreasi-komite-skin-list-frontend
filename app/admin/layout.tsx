import type { ReactNode } from "react";

import { AdminSidebar } from "@/components/atomic/layout/admin/AdminSidebar";
import { AdminTopbar } from "@/components/atomic/layout/admin/AdminTopbar";
import GuardLogin from "@/guard/GuardLogin";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: Readonly<AdminLayoutProps>) {
  return (
    <GuardLogin allowedRoles={["ADMIN"]}>
      <div className="flex min-h-dvh bg-background">
        {/* Section: Admin Sidebar */}
        <AdminSidebar />

        {/* Section: Admin Page Shell */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Section: Admin Topbar */}
          <AdminTopbar />

          {/* Section: Admin Content */}
          <main className="min-w-0 flex-1 overflow-y-auto">
            <div className="mx-auto flex min-h-full w-full max-w-125 flex-col px-4 py-4 sm:max-w-160 md:max-w-3xl lg:max-w-240 xl:max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </GuardLogin>
  );
}
