"use client";

import { Icon } from "@iconify/react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import MobileContainer from "@/components/atomic/atom/MobileContainer";

const pageVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
} as const;

const cardVariants = {
  initial: {
    opacity: 0,
    y: 28,
    scale: 0.96,
    filter: "blur(12px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
} as const;

const floatTransition = {
  duration: 4.8,
  ease: "easeInOut" as const,
  repeat: Number.POSITIVE_INFINITY,
};

export default function NotFoundPage() {
  const reduceMotion = useReducedMotion();

  const floatAnimation = reduceMotion
    ? { y: 0, rotate: 0 }
    : { y: [0, -10, 0], rotate: [-1.5, 1.5, -1.5] };

  return (
    <MobileContainer>
      <motion.main
        className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 py-10"
        initial="initial"
        animate="animate"
        variants={pageVariants}
      >
        {/* Ambient background accents */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-28 top-16 h-56 w-56 rounded-full bg-secondary/25 blur-3xl" />
          <div className="absolute -right-32 bottom-12 h-64 w-64 rounded-full bg-accent/70 blur-3xl" />
          <div className="absolute left-1/2 top-10 h-28 w-28 -translate-x-1/2 rounded-full border border-white/35" />
        </div>

        {/* 404 content card */}
        <motion.section
          className="relative mx-auto flex w-full max-w-105 flex-col items-center overflow-hidden rounded-4xl border border-white/55  px-5 py-8 text-center shadow-[0_22px_70px_rgba(54,53,54,0.16),inset_0_1px_0_rgba(255,255,255,0.68)] backdrop-blur-2xl backdrop-saturate-150"
          variants={cardVariants}
        >
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/45 via-white/15 to-white/5" />
          <div className="pointer-events-none absolute inset-x-5 top-4 h-24 rounded-full bg-muted/80 blur-2xl" />

          <motion.div
            className="relative grid size-44 place-items-center"
            animate={floatAnimation}
            transition={floatTransition}
          >
            <div className="absolute inset-4 rounded-full bg-primary shadow-[inset_0_-18px_34px_rgba(0,0,0,0.18)]" />
            <div className="absolute inset-0 rounded-full border border-primary/10 bg-white/40" />
            <div className="absolute right-5 top-6 size-9 rounded-full bg-secondary shadow-[0_10px_24px_rgba(201,111,59,0.32)]" />
            <div className="absolute bottom-7 left-7 size-5 rounded-full bg-accent" />

            <div className="relative flex flex-col items-center text-primary-foreground">
              <Icon
                icon="solar:face-scan-circle-bold-duotone"
                className="mb-1 size-16"
              />
              <span className="font-mono text-4xl font-semibold tracking-[-0.08em]">
                404
              </span>
            </div>
          </motion.div>

          <motion.div
            className="relative mt-3 flex flex-col gap-3"
            variants={cardVariants}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              Page missing
            </p>
            <h1 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-foreground">
              This skin note slipped out of the checklist.
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The page may have moved, expired, or never existed. Go back home
              and continue tracking from the right place.
            </p>
          </motion.div>

          {/* Primary navigation actions */}
          <motion.div
            className="relative mt-7 flex w-full flex-col gap-3"
            variants={cardVariants}
          >
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Icon
                icon="solar:home-smile-angle-bold-duotone"
                className="size-5"
              />
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-muted px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Icon
                icon="solar:chat-round-like-bold-duotone"
                className="size-5"
              />
              Ask for Help
            </Link>
          </motion.div>
        </motion.section>
      </motion.main>
    </MobileContainer>
  );
}
