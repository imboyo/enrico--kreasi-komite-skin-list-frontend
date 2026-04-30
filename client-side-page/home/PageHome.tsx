"use client";

import { Colors } from "@/client-side-page/home/Colors";
import { HeroCard } from "@/client-side-page/home/HeroCard";
import { MakeUps } from "@/client-side-page/home/MakeUps";
import { Routines } from "@/client-side-page/home/Routines";
import { Scars } from "@/client-side-page/home/Scars";
import { LimitDialog } from "components/domain/skin/list/LimitDialog";
import { useRoutineCheckStore } from "@/client-side-page/home/routine-check-store";
import { useEffect } from "react";
import { motion, MotionConfig } from "motion/react";
import {
  headingItemVariants,
  headingVariants,
  pageVariants,
  sectionVariants,
} from "@/util/page-motion-variants";

export const PageHome = () => {
  const reset = useRoutineCheckStore((s) => s.reset);

  // Reset the shared check counter when this component unmounts so the store
  // doesn't carry stale state into the next mount
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <MotionConfig reducedMotion="user">
      <motion.main
        className="mx-auto flex w-full max-w-125 flex-col gap-6 px-4 py-4"
        initial="initial"
        animate="animate"
        variants={pageVariants}
      >
        {/* Renders itself automatically when the check limit is hit */}
        <LimitDialog />

        <motion.section className="flex flex-col gap-4" variants={sectionVariants}>
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

        <motion.div variants={sectionVariants}>
          <Routines />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <Colors />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <MakeUps />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <Scars />
        </motion.div>
      </motion.main>
    </MotionConfig>
  );
};
