"use client";

import { motion } from "motion/react";

import { AccountEditName } from "@/components/atomic/organism/account-edit-name";
import { AccountEditPassword } from "@/components/atomic/organism/account-edit-password";
import { AccountEditPhoneNumber } from "@/components/atomic/organism/account-edit-phone-number";
import { AccountEditPhoto } from "@/components/atomic/organism/account-edit-photo";

export function PageAdminEditProfile() {
  return (
    <motion.div
      className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-0 py-0 lg:gap-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid w-full gap-6 lg:grid-cols-[20rem_minmax(0,1fr)] lg:items-start">
        <AccountEditPhoto />

        <div className="flex min-w-0 flex-col gap-4 lg:gap-6">
          <AccountEditName />
          <AccountEditPhoneNumber />
          <AccountEditPassword />
        </div>
      </div>
    </motion.div>
  );
}
