"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/atomic/atom/Button";

import { EditNameSection } from "./EditNameSection";
import { EditPassword } from "client-side-page/app/profile/info/edit-password/EditPassword";
import { EditPhoneNumber } from "client-side-page/app/profile/info/edit-phone-number/EditPhoneNumber";

export function PageInfoProfile() {
  const router = useRouter();

  return (
    <motion.main
      className="mx-auto flex w-full max-w-125 flex-col gap-6 px-4 py-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-center text-xl font-semibold">Edit Info</h1>

      <EditNameSection />
      <EditPhoneNumber />
      <EditPassword />

      <Button
        fullWidth
        size="lg"
        variant="outline"
        onClick={() => router.back()}
      >
        Back
      </Button>
    </motion.main>
  );
}
