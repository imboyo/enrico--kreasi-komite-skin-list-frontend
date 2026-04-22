"use client";

import {motion, useReducedMotion} from "motion/react";

const ambientOrbs = [
  {
    className: "left-[-2rem] top-[4%] h-80 w-80 bg-orange-400/35",
    animate: {
      x: [0, 18, -10, 0],
      y: [0, -24, 12, 0],
      scale: [1, 1.2, 0.95, 1],
      opacity: [0.3, 0.45, 0.35, 0.3],
    },
    duration: 18,
  },
  {
    className: "right-[-2rem] top-[42%] h-96 w-96 bg-orange-400/30",
    animate: {
      x: [0, -22, 10, 0],
      y: [0, 16, -18, 0],
      scale: [1, 0.96, 1.2, 1],
      opacity: [0.25, 0.4, 0.3, 0.25],
    },
    duration: 22,
  },
];

export default function MobileContainerBackdrop() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="mobile-shell-backdrop absolute inset-0" />
      <div className="mobile-shell-dots absolute inset-0" />
      <div className="mobile-shell-vignette absolute inset-0" />
      <div className="absolute inset-y-12 left-1/2 w-[min(30rem,88vw)] -translate-x-1/2 rounded-full bg-orange-200/20 blur-3xl" />

      {ambientOrbs.map((orb) => (
        <motion.div
          key={orb.className}
          animate={reduceMotion ? {opacity: 0.7, scale: 1} : orb.animate}
          className={`absolute rounded-full blur-3xl ${orb.className}`}
          transition={{
            duration: orb.duration,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      ))}
    </div>
  );
}
