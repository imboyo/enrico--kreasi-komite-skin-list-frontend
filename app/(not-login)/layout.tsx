import MobileContainer from "@/components/atomic/atom/MobileContainer";
import { NotLoginTopbar } from "@/components/atomic/layout/not-login/NotLoginTopbar";
import { NotLoginSidebar } from "@/components/atomic/layout/not-login/NotLoginSidebar";
import React from "react";

export default function NotLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MobileContainer>
      <NotLoginTopbar />
      <NotLoginSidebar />
      {/* The content slot grows under the fixed topbar height instead of
          claiming a second full viewport and creating extra page height. */}
      <div className="flex-1 min-h-0">{children}</div>
    </MobileContainer>
  );
}
