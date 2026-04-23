"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { Button } from "@/components/atomic/atom/Button";
import { APP_URL } from "@/constant";

export function PageChat() {
  return (
    <motion.main
      className="mx-auto flex w-full max-w-125 flex-col gap-6 px-4 py-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero section */}
      <section className="rounded-[28px] border border-border/70 bg-background px-5 py-6 shadow-[0_12px_30px_rgba(60,60,60,0.08)]">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Consultation
          </p>
          <h1 className="text-[32px] font-medium leading-tight text-foreground">
            Chat With Us
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Continue your skincare consultation here and share the detail of the
            item you want to discuss with the Skin Committee team.
          </p>
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
