"use client";

import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/atomic/atom/Button";
import { FormFieldError } from "@/components/atomic/atom/FormFieldError";
import { TextInput } from "@/components/atomic/atom/TextInput";
import {
  editEmailSchema,
  otpSchema,
  useEditEmailFlow,
  validateField,
} from "@/hooks/useEditEmailFlow";

export function EditEmailSection() {
  const {
    step,
    pendingEmail,
    emailForm,
    otpForm,
    requestOtpMutation,
    verifyOtpMutation,
    requestError,
    verifyError,
    backToEmail,
  } = useEditEmailFlow();

  return (
    <section className="overflow-hidden rounded-2xl bg-card">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          className="flex flex-col gap-4 p-4"
          // Keying by step keeps each stage mounted long enough for a clean exit animation.
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {step === "done" ? (
            <>
              <h2 className="text-base font-semibold">Email</h2>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Icon icon="material-symbols:check-circle-outline-rounded" className="size-5 shrink-0" />
                <span>Email updated to <strong>{pendingEmail}</strong>.</span>
              </div>
            </>
          ) : step === "otp" ? (
            <>
              <h2 className="text-base font-semibold">Verify Email</h2>
              <p className="text-sm text-muted-foreground">
                We sent a 6-digit OTP to <strong>{pendingEmail}</strong>. Enter it below.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void otpForm.handleSubmit();
                }}
                className="flex flex-col gap-3"
              >
                <otpForm.Field
                  name="otp"
                  validators={{
                    onBlur: ({ value }) => validateField(otpSchema.shape.otp, value),
                    onSubmit: ({ value }) => validateField(otpSchema.shape.otp, value),
                  }}
                >
                  {(field) => (
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="edit-email-otp" className="text-sm font-medium text-foreground">
                        OTP Code
                      </label>
                      <TextInput
                        id="edit-email-otp"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="Enter 6-digit OTP"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value.replace(/\D/g, ""))}
                        onBlur={field.handleBlur}
                        autoComplete="one-time-code"
                        startItem={<Icon icon="material-symbols:pin-outline" />}
                        disabled={verifyOtpMutation.isPending}
                        surface="transparent"
                      />
                      <FormFieldError
                        isTouched={field.state.meta.isTouched}
                        error={field.state.meta.errors[0]}
                      />
                    </div>
                  )}
                </otpForm.Field>

                {verifyError && <p className="text-sm text-destructive">{verifyError}</p>}

                <otpForm.Subscribe selector={(s) => ({ isValid: s.isValid, values: s.values })}>
                  {({ isValid, values }) => (
                    <Button
                      type="submit"
                      fullWidth
                      size="lg"
                      isLoading={verifyOtpMutation.isPending}
                      disabled={
                        verifyOtpMutation.isPending ||
                        (!values.otp.trim() ||
                          (!isValid && otpForm.state.submissionAttempts > 0))
                      }
                    >
                      Verify OTP
                    </Button>
                  )}
                </otpForm.Subscribe>

                <Button
                  fullWidth
                  size="lg"
                  variant="outline"
                  disabled={verifyOtpMutation.isPending}
                  onClick={backToEmail}
                >
                  Change Email
                </Button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-base font-semibold">Email</h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void emailForm.handleSubmit();
                }}
                className="flex flex-col gap-3"
              >
                <emailForm.Field
                  name="email"
                  validators={{
                    onBlur: ({ value }) => validateField(editEmailSchema.shape.email, value),
                    onSubmit: ({ value }) => validateField(editEmailSchema.shape.email, value),
                  }}
                >
                  {(field) => (
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="edit-email" className="text-sm font-medium text-foreground">
                        New Email
                      </label>
                      <TextInput
                        id="edit-email"
                        type="email"
                        placeholder="Enter new email"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        autoComplete="email"
                        startItem={<Icon icon="material-symbols:mail-outline-rounded" />}
                        disabled={requestOtpMutation.isPending}
                        surface="transparent"
                      />
                      <FormFieldError
                        isTouched={field.state.meta.isTouched}
                        error={field.state.meta.errors[0]}
                      />
                    </div>
                  )}
                </emailForm.Field>

                {requestError && <p className="text-sm text-destructive">{requestError}</p>}

                <emailForm.Subscribe selector={(s) => ({ isValid: s.isValid, values: s.values })}>
                  {({ isValid, values }) => (
                    <Button
                      type="submit"
                      fullWidth
                      size="lg"
                      isLoading={requestOtpMutation.isPending}
                      disabled={
                        requestOtpMutation.isPending ||
                        (!values.email.trim() ||
                          (!isValid && emailForm.state.submissionAttempts > 0))
                      }
                    >
                      Send OTP
                    </Button>
                  )}
                </emailForm.Subscribe>
              </form>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
