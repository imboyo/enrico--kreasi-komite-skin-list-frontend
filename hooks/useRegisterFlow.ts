"use client";

import { useState } from "react";

import type { RegisterFormValues } from "./useRegisterForm";
import { useMultiStepForm } from "./useMultiStepForm";

const REGISTER_FLOW_STEPS = ["register", "otp", "success"] as const;

export function useRegisterFlow() {
  const flow = useMultiStepForm({
    steps: REGISTER_FLOW_STEPS,
  });

  // Shared state passed between steps — set by one step, read by the next.
  const [pendingRegistration, setPendingRegistration] =
    useState<RegisterFormValues | null>(null);

  const [registeredUser, setRegisteredUser] = useState<{
    name: string;
    whatsappNumber: string;
  } | null>(null);

  return {
    ...flow,
    pendingRegistration,
    registeredUser,
    onRegisterSuccess: (values: RegisterFormValues) => {
      setPendingRegistration(values);
      flow.nextStep();
    },
    onVerifySuccess: (user: { name: string; whatsappNumber: string }) => {
      setRegisteredUser(user);
      flow.nextStep();
    },
    backToRegister: () => flow.goToStep("register"),
  };
}
