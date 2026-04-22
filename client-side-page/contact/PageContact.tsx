"use client";

import { ContactChannelsSection } from "@/client-side-page/contact/components/ContactChannelsSection";
import { ContactHeroSection } from "@/client-side-page/contact/components/ContactHeroSection";
import { SupportNotesSection } from "@/client-side-page/contact/components/SupportNotesSection";
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

export const PageContact = () => {
  const reduceMotion = useReducedMotion();

  // Keep the page animation aligned with home while still reducing
  // movement for users who prefer minimal motion.
  const contentVariants = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.2 } },
      }
    : sectionVariants;

  return (
    <motion.main
      className="mx-auto flex w-full max-w-125 flex-col gap-6 px-4 py-4"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <motion.section className="flex flex-col gap-4" variants={contentVariants}>
        <motion.div className="flex flex-col gap-1" variants={headingVariants}>
          <motion.h1 className="text-[40px] font-medium" variants={headingItemVariants}>
            Contact Us
          </motion.h1>
          <motion.h6 className="text-muted-foreground text-sm" variants={headingItemVariants}>
            Reach the Kreasi Komite team through the channel that fits your question best.
          </motion.h6>
        </motion.div>

        <ContactHeroSection />
      </motion.section>

      <motion.section className="flex flex-col gap-3" variants={contentVariants}>
        <ContactChannelsSection />
      </motion.section>

      <motion.section className="flex flex-col gap-3" variants={contentVariants}>
        <SupportNotesSection />
      </motion.section>
    </motion.main>
  );
};
