"use client";

import { useState } from "react";

type Direction = 1 | -1;

type UseMultiStepFormOptions<TStep extends string> = {
  steps: readonly TStep[];
  initialStep?: TStep;
};

export function useMultiStepForm<TStep extends string>({
  steps,
  initialStep,
}: UseMultiStepFormOptions<TStep>) {
  const firstStep = initialStep ?? steps[0];
  const [currentStep, setCurrentStep] = useState<TStep>(firstStep);
  const [direction, setDirection] = useState<Direction>(1);

  const getStepIndex = (step: TStep) => steps.indexOf(step);
  const currentIndex = getStepIndex(currentStep);
  const isFirstStep = currentIndex <= 0;
  const isLastStep = currentIndex === steps.length - 1;

  const goToStep = (nextStep: TStep) => {
    const nextIndex = getStepIndex(nextStep);

    if (nextIndex === -1 || nextStep === currentStep) {
      return;
    }

    setDirection(nextIndex > currentIndex ? 1 : -1);
    setCurrentStep(nextStep);
  };

  const nextStep = () => {
    if (isLastStep) {
      return;
    }

    goToStep(steps[currentIndex + 1]);
  };

  const previousStep = () => {
    if (isFirstStep) {
      return;
    }

    goToStep(steps[currentIndex - 1]);
  };

  const reset = () => {
    setDirection(-1);
    setCurrentStep(firstStep);
  };

  return {
    steps,
    currentStep,
    currentIndex,
    direction,
    isFirstStep,
    isLastStep,
    goToStep,
    nextStep,
    previousStep,
    reset,
  };
}
