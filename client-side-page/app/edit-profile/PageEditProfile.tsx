"use client";

import { motion } from "motion/react";
import { ProfileHeroSection } from "./ProfileHeroSection";
import { DashboardShortcutsSection } from "./DashboardShortcutsSection";
import { SkinGoalsSection } from "./skin-goal-section/SkinGoalsSection";

export function PageEditProfile() {
  return (
    <motion.main
      className="mx-auto flex w-full max-w-125 flex-col gap-6 px-4 py-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <ProfileHeroSection />
      <DashboardShortcutsSection />
      <SkinGoalsSection />
    </motion.main>
  );
}
