export const pageVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
} as const;

export const sectionVariants = {
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

export const headingVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
} as const;

export const headingItemVariants = {
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

export const fadeUp = (delay: number) =>
  ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay, ease: "easeOut" as const },
  }) as const;
