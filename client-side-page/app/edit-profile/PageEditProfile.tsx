"use client";

import { motion } from "motion/react";
import { ProfileHeroSection } from "./ProfileHeroSection";
import { DashboardShortcutsSection } from "./DashboardShortcutsSection";
import { SkinGoalsSection } from "./skin-goal-section/SkinGoalsSection";

export function PageEditProfile() {
  return (
    <motion.main
      className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 lg:gap-8 lg:px-8 lg:py-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <ProfileHeroSection />

      <div className="flex flex-col gap-8">
        <DashboardShortcutsSection />
        <SkinGoalsSection />
      </div>
    </motion.main>
  );
}
