"use client";

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

export function BaseSidebar({ title, topSection, children, bottomSection }: BaseSidebarProps) {
  const { isOpen, close } = useSidebarStore();
  useSidebarCloseOnEscape(isOpen, close);

  return (
    <BaseSidebarShell
      isOpen={isOpen}
      title={title}
      topSection={topSection}
      bottomSection={bottomSection}
      onClose={close}
    >
      {children}
    </BaseSidebarShell>
  );
}
