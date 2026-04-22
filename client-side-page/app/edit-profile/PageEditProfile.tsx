"use client";

import { motion } from "motion/react";

export function PageEditProfile() {
  return (
    <motion.main
      className="mx-auto flex w-full max-w-125 flex-col gap-6 px-4 py-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-[40px] font-medium">Edit Profile</h1>
        <h6 className="text-muted-foreground text-sm">
          &#34;Update your profile information.&#34;
        </h6>
      </div>

      <div className="mt-4">
        {/* Empty content for now */}
        <p className="text-muted-foreground">Form will go here.</p>
      </div>
    </motion.main>
  );
}
