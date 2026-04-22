import { NotLoginFooter } from "@/components/atomic/layout/not-login/NotLoginFooter";
import React from "react";

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <NotLoginFooter />
    </>
  );
}
