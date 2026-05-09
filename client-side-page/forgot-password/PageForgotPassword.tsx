"use client";

import { AnimatePresence, motion } from "motion/react";

import { useForgotPasswordFlow } from "@/hooks/useForgotPasswordFlow";

import { LoginAvatar } from "../login/LoginAvatar";
import { ForgotPasswordOtpStep } from "./ForgotPasswordOtpStep";
import { ForgotPasswordResetStep } from "./ForgotPasswordResetStep";
import { ForgotPasswordSuccessStep } from "./ForgotPasswordSuccessStep";
import { ForgotPasswordWhatsappStep } from "./ForgotPasswordWhatsappStep";

export function PageForgotPassword() {
  const forgotPasswordFlow = useForgotPasswordFlow();
  const { currentStep, direction } = forgotPasswordFlow;

  const transitionX = direction > 0 ? 20 : -20;

  const renderStep = () => {
    if (currentStep === "otp") {
      return <ForgotPasswordOtpStep {...forgotPasswordFlow} />;
    }

    if (currentStep === "reset") {
      return <ForgotPasswordResetStep {...forgotPasswordFlow} />;
    }

    if (currentStep === "success") {
      return <ForgotPasswordSuccessStep />;
    }

    return <ForgotPasswordWhatsappStep {...forgotPasswordFlow} />;
  };

  return (
    <main className="flex min-h-full flex-col items-center gap-12 px-6 py-14">
      <LoginAvatar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentStep}
          className="w-full max-w-sm rounded-xl border border-gray-200 p-6"
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
