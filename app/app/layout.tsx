import MobileContainer from "@/components/atomic/atom/MobileContainer";
import { AppTopbar } from "@/components/atomic/layout/app/AppTopbar";
import { AppSidebar } from "@/components/atomic/layout/app/AppSidebar";
import GuardLogin from "@/guard/GuardLogin";
import React from "react";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Only USER role can access the app area; impersonation is resolved in GuardLogin.
    <GuardLogin allowedRoles={["USER"]}>
      <MobileContainer>
        <AppTopbar />
        <AppSidebar />
        <div className="flex-1 min-h-0">{children}</div>
      </MobileContainer>
    </GuardLogin>
  );
}
