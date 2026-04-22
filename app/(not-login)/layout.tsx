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
      {children}
    </MobileContainer>
  );
}
