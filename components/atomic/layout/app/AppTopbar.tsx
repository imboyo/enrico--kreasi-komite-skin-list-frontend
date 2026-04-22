// Topbar variant for app pages.
// Keep this wrapper thin so shared behavior stays in BaseTopbar while app-specific actions can be added later.
"use client";

import Link from "next/link";
import { BaseTopbar } from "@/components/atomic/organism/topbar/BaseTopbar";
import Image from "next/image";

export function AppTopbar() {
  return (
    <BaseTopbar
      rightSection={
        <Link
          href="/app/profile"
          aria-label="Open profile"
          className="block h-10 w-10 overflow-hidden rounded-full border border-border bg-muted"
        >
          {/* Use a fixed avatar URL so the app topbar always has a visible profile entry point. */}
          <Image
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80"
            alt="Profile photo"
            width={40}
            height={40}
            loading="eager"
            className="h-full w-full object-cover"
          />
        </Link>
      }
    />
  );
}
