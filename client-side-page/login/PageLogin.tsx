"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { useMultiStepForm } from "@/hooks/useMultiStepForm";

import { LoginAvatar } from "./LoginAvatar";
import { LoginFormStep } from "./LoginFormStep";
import { LoginOtpStep } from "./LoginOtpStep";
import { type LoginFormValues } from "./login-form.schema";

const LOGIN_FLOW_STEPS = ["login", "otp"] as const;

export function PageLogin() {
  const flow = useMultiStepForm({ steps: LOGIN_FLOW_STEPS });
  const [pendingLogin, setPendingLogin] = useState<LoginFormValues | null>(
    null,
  );

  const transitionX = flow.direction > 0 ? 20 : -20;

  const renderStep = () => {
    if (flow.currentStep === "otp") {
      return (
        <LoginOtpStep
          pendingLogin={pendingLogin}
          backToLogin={() => flow.goToStep("login")}
        />
      );
    }

    return (
      <LoginFormStep
        onLoginChainSuccess={(values) => {
          setPendingLogin(values);
          flow.nextStep();
        }}
      />
    );
  };

  return (
    <main className="flex min-h-full flex-col items-center px-6 py-10">
      <LoginAvatar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={flow.currentStep}
          className="w-full"
          // The flow direction keeps OTP/back transitions aligned with register.
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
