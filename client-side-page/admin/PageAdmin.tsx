"use client";

import { motion } from "motion/react";

import { SupportReplySection } from "./support-reply-section/SupportReplySection";
import { SkinTotalSection } from "./skin-total-section/SkinTotalSection";

export function PageAdmin() {
  return (
    <motion.div
      className="mx-auto flex w-full max-w-125 flex-1 flex-col gap-6 px-4 py-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <SkinTotalSection />
      <SupportReplySection />
    </motion.div>
  );
}
