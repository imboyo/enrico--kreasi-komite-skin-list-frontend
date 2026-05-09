"use client";

import { motion } from "motion/react";

import { PhotoProfileSection } from "@/components/domain/account/edit-photo/PhotoProfileSection";
import { EditNameSection } from "@/components/domain/account/edit-name/EditNameSection";
import { EditPhoneNumber } from "@/components/domain/account/edit-phone-number/EditPhoneNumber";
import { EditPassword } from "@/components/domain/account/edit-password/EditPassword";

export function PageAdminEditProfile() {
  return (
    <motion.main
      className="mx-auto flex w-full max-w-125 flex-col gap-6 px-4 py-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PhotoProfileSection />
      <EditNameSection />
      <EditPhoneNumber />
      <EditPassword />
    </motion.main>
  );
}
