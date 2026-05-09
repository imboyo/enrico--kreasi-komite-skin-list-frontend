"use client";

import { Colors } from "@/client-side-page/home/Colors";
import { HeroCard } from "@/client-side-page/home/HeroCard";
import { MakeUps } from "@/client-side-page/home/MakeUps";
import { Routines } from "@/client-side-page/home/Routines";
import { Scars } from "@/client-side-page/home/Scars";
import { RoutineCheckLimitDialog } from "components/atomic/organism/RoutineCheckLimitDialog";
import { useRoutineCheckStore } from "@/client-side-page/home/routine-check-store";
import { useEffect } from "react";
import { motion, MotionConfig } from "motion/react";
import {
  headingItemVariants,
  headingVariants,
  pageVariants,
  sectionVariants,
} from "libs/util/page-motion-variants";

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
      {/* Layout already provides the max-w + px container so we only need
            internal spacing here */}
      <motion.main
        className="flex flex-col gap-8 md:gap-10 lg:gap-12"
        initial="initial"
        animate="animate"
        variants={pageVariants}
      >
        {/* Renders itself automatically when the check limit is hit */}
        <RoutineCheckLimitDialog />

        {/* Hero section */}
        <motion.section className="flex flex-col gap-5 md:gap-6" variants={sectionVariants}>
          <motion.div className="flex flex-col gap-2" variants={headingVariants}>
            <motion.h1
              className="text-[40px] font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl"
              variants={headingItemVariants}
            >
              Skin Checklist
            </motion.h1>
            <motion.h6
              className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base lg:text-lg"
              variants={headingItemVariants}
            >
              &#34;Track your routine, tone, make up, and skin concerns in one
              place.&#34;
            </motion.h6>
          </motion.div>

          <HeroCard />
        </motion.section>

        {/* Checklist sections — single column on all screens */}
        <div className="flex flex-col gap-8 md:gap-10 lg:gap-12">
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
        </div>
      </motion.main>
    </MotionConfig>
  );
};
