"use client";

import { Colors } from "@/client-side-page/home/Colors";
import { HeroCard } from "@/client-side-page/home/HeroCard";
import { MakeUps } from "@/client-side-page/home/MakeUps";
import { Routines } from "@/client-side-page/home/Routines";
import { Scars } from "@/client-side-page/home/Scars";
import { LimitDialog } from "@/components/domain/routine-list/LimitDialog";
import { useRoutineCheckStore } from "@/client-side-page/home/routine-check-store";
import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

const pageVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
} as const;

const sectionVariants = {
  initial: {
    opacity: 0,
    y: 24,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
} as const;

const headingVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
} as const;

const headingItemVariants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
} as const;

export const PageHome = () => {
  const reset = useRoutineCheckStore((s) => s.reset);
  const reduceMotion = useReducedMotion();

  // Keep the page entrance subtle while still respecting reduced-motion
  // preferences for users who opt out of larger transitions.
  const contentVariants = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.2 } },
      }
    : sectionVariants;

  // Reset the shared check counter when this component unmounts so the store
  // doesn't carry stale state into the next mount
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <motion.main
      className="mx-auto flex w-full max-w-125 flex-col gap-6 px-4 py-4"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      {/* Renders itself automatically when the check limit is hit */}
      <LimitDialog />

      <motion.section className="flex flex-col gap-4" variants={contentVariants}>
        <motion.div className="flex flex-col gap-1" variants={headingVariants}>
          <motion.h1 className="text-[40px] font-medium" variants={headingItemVariants}>
            Skin Checklist
          </motion.h1>
          <motion.h6 className="text-muted-foreground text-sm" variants={headingItemVariants}>
            &#34;Track your routine, tone, make up, and skin concerns in one
            place.&#34;
          </motion.h6>
        </motion.div>

        <HeroCard />
      </motion.section>

      <motion.div variants={contentVariants}>
        <Routines />
      </motion.div>
      <motion.div variants={contentVariants}>
        <Colors />
      </motion.div>
      <motion.div variants={contentVariants}>
        <MakeUps />
      </motion.div>
      <motion.div variants={contentVariants}>
        <Scars />
      </motion.div>
    </motion.main>
  );
};
