import Link from "next/link";

import { Button } from "@/components/atomic/atom/Button";
import { WhatsappNumberField } from "@/components/atomic/molecule/WhatsappNumberField";
import { APP_URL } from "@/constant";
import type { useForgotPasswordFlow } from "@/hooks/useForgotPasswordFlow";

type ForgotPasswordFlowState = ReturnType<typeof useForgotPasswordFlow>;

type Props = Pick<
  ForgotPasswordFlowState,
  "whatsappForm" | "requestOtpMutation" | "requestOtpError" | "validateWhatsappNumberField"
>;

export function ForgotPasswordWhatsappStep({
  whatsappForm,
  requestOtpMutation,
  requestOtpError,
  validateWhatsappNumberField,
}: Props) {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="mb-1 text-2xl font-semibold leading-tight text-foreground">
          Forgot password
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your registered WhatsApp number and we&apos;ll send an OTP to reset your password.
        </p>
      </div>

      <form
        className="flex w-full flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          void whatsappForm.handleSubmit();
        }}
      >
        <whatsappForm.Field
          name="whatsappNumber"
          validators={{
            onBlur: ({ value }) => validateWhatsappNumberField(value),
            onSubmit: ({ value }) => validateWhatsappNumberField(value),
          }}
        >
          {(field) => (
            <WhatsappNumberField
              field={field}
              inputId="forgot-password-whatsapp-number"
              disabled={requestOtpMutation.isPending}
            />
          )}
        </whatsappForm.Field>

        {requestOtpError && (
          <p className="text-sm text-destructive">{requestOtpError}</p>
        )}

        <whatsappForm.Subscribe
          selector={(state) => ({ values: state.values, isValid: state.isValid })}
        >
          {({ values, isValid }) => (
            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={requestOtpMutation.isPending}
              disabled={
                requestOtpMutation.isPending ||
                // Disable until the field has content, then respect validation state.
                (!values.whatsappNumber.trim() ||
                  (!isValid && whatsappForm.state.submissionAttempts > 0))
              }
            >
              Send OTP
            </Button>
          )}
        </whatsappForm.Subscribe>

        <p className="text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link
            href={APP_URL.LOGIN}
            className="font-medium text-primary hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </>
  );
}
