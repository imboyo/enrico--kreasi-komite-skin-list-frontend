"use client";

import { ContactChannelsSection } from "@/client-side-page/contact/components/ContactChannelsSection";
import { ContactHeroSection } from "@/client-side-page/contact/components/ContactHeroSection";
import { SupportNotesSection } from "@/client-side-page/contact/components/SupportNotesSection";
import { motion, useReducedMotion } from "motion/react";
import { pageVariants, sectionVariants } from "libs/util/page-motion-variants";

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
      className="flex w-full flex-col gap-6 py-2 md:gap-8 md:py-4 lg:gap-12 lg:py-6"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      {/* Section: Heading + Hero */}
      <motion.section
        className="flex flex-col gap-4 lg:gap-5"
        variants={contentVariants}
      >
        <ContactHeroSection />
      </motion.section>

      {/* Section: Contact Channels */}
      <motion.section
        className="flex flex-col gap-3 lg:gap-4"
        variants={contentVariants}
      >
        <ContactChannelsSection />
      </motion.section>

      {/* Section: Support Notes */}
      <motion.section
        className="flex flex-col gap-3 lg:gap-4"
        variants={contentVariants}
      >
        <SupportNotesSection />
      </motion.section>
    </motion.main>
  );
};
