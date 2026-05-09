"use client";

import { motion } from "motion/react";

import { SupportReplySection } from "./support-reply-section/SupportReplySection";
import { SkinTotalSection } from "./skin-total-section/SkinTotalSection";

export function PageAdmin() {
  return (
    <motion.div
      className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-4 lg:px-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Section: Skin totals overview */}
      <div className="w-full">
        <SkinTotalSection />
      </div>

      {/* Section: Support reply */}
      <div className="w-full">
        <SupportReplySection />
      </div>
    </motion.div>
  );
}
