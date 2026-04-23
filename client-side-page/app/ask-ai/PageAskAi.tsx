"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { Button } from "@/components/atomic/atom/Button";
import { APP_URL } from "@/constant";

export function PageAskAi() {
  return (
    <motion.main
      className="mx-auto flex w-full max-w-125 flex-col gap-6 px-4 py-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero section */}
      <section className="rounded-[28px] border border-border/70 bg-background px-5 py-6 shadow-[0_12px_30px_rgba(60,60,60,0.08)]">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
            AI Assistant
          </p>
          <h1 className="text-[32px] font-medium leading-tight text-foreground">
            Coming Soon
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The Ask AI feature is still under construction. We are preparing a
            guided assistant experience for your skin-related questions.
          </p>

          {/* Status section */}
          <div className="rounded-3xl border border-dashed border-border bg-muted/40 px-4 py-4">
            <p className="text-sm font-medium text-foreground">
              This page is not available yet.
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Please check back later while we finish the feature and connect
              it to the rest of the dashboard flow.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation section */}
      <Link href={APP_URL.APP} className="w-full">
        <Button fullWidth size="lg" variant="outline">
          Back to Dashboard
        </Button>
      </Link>
    </motion.main>
  );
}
