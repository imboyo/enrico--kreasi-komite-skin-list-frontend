"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { useSidebarStore } from "@/store/sidebar-store";
import { BaseSidebarShell } from "@/components/atomic/organism/sidebar/BaseSidebarShell";
import { useSidebarCloseOnEscape } from "@/components/atomic/organism/sidebar/useSidebarCloseOnEscape";

interface BaseSidebarProps {
  title: string;
  topSection?: ReactNode;
  children?: ReactNode;
  bottomSection?: ReactNode;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

export function BaseSidebar({ title, topSection, children, bottomSection }: BaseSidebarProps) {
  const { isOpen, close } = useSidebarStore();
  const isMobile = useIsMobile();
  useSidebarCloseOnEscape(isMobile && isOpen, close);

  return (
    <BaseSidebarShell
      isOpen={isOpen}
      isFloating={isMobile}
      title={title}
      topSection={topSection}
      bottomSection={bottomSection}
      onClose={close}
    >
      {children}
    </BaseSidebarShell>
  );
}
