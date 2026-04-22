"use client";

import { Icon } from "@iconify/react";
import { motion } from "motion/react";

interface IconCardProps {
  icon: string;
  title: string;
  description: string;
  /** Controls stagger delay index for entrance animation */
  index?: number;
}

/** Reusable card with an icon badge, title, and description. Animates in on mount. */
export const IconCard = ({ icon, title, description, index = 0 }: IconCardProps) => {
  return (
    <motion.div
      className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card/90 px-4 py-4 shadow-sm"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" as const }}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon icon={icon} width={20} height={20} />
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};
