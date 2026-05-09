"use client";

import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/atomic/atom/Button";
import { EditNameSection } from "@/components/domain/account/edit-name/EditNameSection";
import { EditPassword } from "@/components/domain/account/edit-password/EditPassword";
import { EditPhoneNumber } from "@/components/domain/account/edit-phone-number/EditPhoneNumber";

export function PageInfoProfile() {
  const router = useRouter();

  return (
    <motion.main
      className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 md:max-w-4xl md:gap-8 md:px-8 md:py-10"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Page header */}
      <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
        <div className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon icon="material-symbols:person-edit-outline-rounded" className="text-xl" />
          </div>
          <h1 className="text-xl font-semibold md:text-2xl">Ubah Info Profil</h1>
        </div>
        <p className="text-sm text-muted-foreground md:text-base">
          Kelola informasi pribadi dan keamanan akun kamu di sini.
        </p>
      </div>

      <div className="flex flex-col gap-6 md:gap-8">
        <EditNameSection />
        <EditPhoneNumber />
        <EditPassword />
      </div>

      <Button
        className="w-full md:w-fit md:self-center"
        size="lg"
        variant="outline"
        onClick={() => router.back()}
      >
        Kembali
      </Button>
    </motion.main>
  );
}
