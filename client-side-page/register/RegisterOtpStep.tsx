import { Icon } from "@iconify/react";

import { Button } from "@/components/atomic/atom/Button";
import { FormFieldError } from "@/components/atomic/atom/FormFieldError";
import { TextInput } from "@/components/atomic/atom/TextInput";
import type { useRegisterFlow } from "@/hooks/useRegisterFlow";

type RegisterFlowState = ReturnType<typeof useRegisterFlow>;

type RegisterOtpStepProps = Pick<
  RegisterFlowState,
  | "otpForm"
  | "pendingRegistration"
  | "verifyOtpMutation"
  | "verifyError"
  | "backToRegister"
  | "validateOtpField"
>;

export function RegisterOtpStep({
  otpForm,
  pendingRegistration,
  verifyOtpMutation,
  verifyError,
  backToRegister,
  validateOtpField,
}: RegisterOtpStepProps) {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="mb-1 text-2xl font-semibold leading-tight text-foreground">
          Verify your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter the OTP sent to <strong>{pendingRegistration?.email}</strong>.
        </p>
      </div>

      <form
        className="flex w-full flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          void otpForm.handleSubmit();
        }}
      >
        <otpForm.Field
          name="otp"
          validators={{
            onBlur: ({ value }) => validateOtpField(value),
            onSubmit: ({ value }) => validateOtpField(value),
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="register-otp"
                className="text-sm font-medium text-foreground"
              >
                OTP Code
              </label>
              <TextInput
                id="register-otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                value={field.state.value}
                onChange={(event) =>
                  field.handleChange(event.target.value.replace(/\D/g, ""))
                }
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

        <p className="text-xs text-muted-foreground">
          Use <span className="font-medium text-foreground">123456</span> for
          the mock OTP.
        </p>

        {verifyError && <p className="text-sm text-destructive">{verifyError}</p>}

        <otpForm.Subscribe
          selector={(state) => ({
            isValid: state.isValid,
            values: state.values,
          })}
        >
          {({ isValid, values }) => (
            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={verifyOtpMutation.isPending}
              disabled={
                verifyOtpMutation.isPending ||
                !values.otp.trim() ||
                (!isValid && otpForm.state.submissionAttempts > 0)
              }
            >
              Verify OTP
            </Button>
          )}
        </otpForm.Subscribe>

        <Button
          type="button"
          fullWidth
          size="lg"
          variant="outline"
          disabled={verifyOtpMutation.isPending}
          onClick={backToRegister}
        >
          Back
        </Button>
      </form>
    </>
  );
}
