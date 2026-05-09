"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "motion/react";

interface AdminAccountPageShellProps {
  children: ReactNode;
  description: string;
  siblingHref: string;
  siblingLabel: string;
  title: string;
}

export function AdminAccountPageShell({
  children,
  description,
  siblingHref,
  siblingLabel,
  title,
}: Readonly<AdminAccountPageShellProps>) {
  return (
    <motion.div
      className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 px-4 py-4 lg:px-8 lg:py-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Section: Page header */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Manajemen Akun
          </p>
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Section: Sibling page shortcut */}
        <Link
          href={siblingHref}
          className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          {siblingLabel}
        </Link>
      </div>

      {/* Section: Page content */}
      <div className="min-w-0 flex-1">{children}</div>
    </motion.div>
  );
}
