import type { ReactNode } from "react";

import MobileContainer from "@/components/atomic/atom/MobileContainer";
import { AdminSidebar } from "@/components/atomic/layout/admin/AdminSidebar";
import { AdminTopbar } from "@/components/atomic/layout/admin/AdminTopbar";
import GuardLogin from "@/guard/GuardLogin";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: Readonly<AdminLayoutProps>) {
  return (
    // Only ADMIN role — access is always tied to the authenticated account info
    <GuardLogin allowedRoles={["ADMIN"]}>
      <MobileContainer>
        <AdminTopbar />
        <AdminSidebar />

        {/* Section: Admin Page Content */}
        <main className="flex min-h-0 flex-1 flex-col">{children}</main>
      </MobileContainer>
    </GuardLogin>
  );
}
