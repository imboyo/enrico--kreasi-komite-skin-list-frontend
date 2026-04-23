"use client";

import { AnimatePresence, motion } from "motion/react";

import { useRegisterFlow } from "@/hooks/useRegisterFlow";

import { LoginAvatar } from "../login/LoginAvatar";
import { RegisterFormStep } from "./RegisterFormStep";
import { RegisterOtpStep } from "./RegisterOtpStep";
import { RegisterSuccessStep } from "./RegisterSuccessStep";

export function PageRegister() {
  const registerFlow = useRegisterFlow();
  const { currentStep, direction } = registerFlow;

  const transitionX = direction > 0 ? 20 : -20;

  const renderStep = () => {
    if (currentStep === "otp") {
      return <RegisterOtpStep {...registerFlow} />;
    }

    if (currentStep === "success") {
      return <RegisterSuccessStep {...registerFlow} />;
    }

    return <RegisterFormStep {...registerFlow} />;
  };

  return (
    <main className="flex min-h-full flex-col items-center px-6 py-10">
      <LoginAvatar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentStep}
          className="w-full"
          // The direction from the reusable flow hook keeps back/next motion consistent.
          initial={{ opacity: 0, x: transitionX }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -transitionX }}
          transition={{ duration: 0.24, ease: "easeOut" }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
