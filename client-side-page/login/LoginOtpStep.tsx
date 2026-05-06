"use client";

import {
  type FormAsyncValidateOrFn,
  type FormValidateOrFn,
  type ReactFormExtendedApi,
  useForm,
} from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { loginVerify } from "@/backend-service/auth/login-verify.service";
import { Button } from "@/components/atomic/atom/Button";
import { FormFieldError } from "@/components/atomic/atom/FormFieldError";
import { OtpInput } from "@/components/atomic/atom/OtpInput";
import { APP_URL } from "@/constant";
import { useAuthStore } from "@/store/auth/auth.store";
import { normalizeWhatsappNumber } from "libs/util/whatsapp-number";

import { type LoginFormValues, validateLoginField } from "./login-form.schema";

const otpSchema = z.object({
  otp: z.string().min(1, "OTP is required").length(6, "OTP must be 6 digits"),
});

type OtpValues = z.infer<typeof otpSchema>;

type OtpFormApi = ReactFormExtendedApi<
  OtpValues,
  undefined | FormValidateOrFn<OtpValues>,
  undefined | FormValidateOrFn<OtpValues>,
  undefined | FormAsyncValidateOrFn<OtpValues>,
  undefined | FormValidateOrFn<OtpValues>,
  undefined | FormAsyncValidateOrFn<OtpValues>,
  undefined | FormValidateOrFn<OtpValues>,
  undefined | FormAsyncValidateOrFn<OtpValues>,
  undefined | FormValidateOrFn<OtpValues>,
  undefined | FormAsyncValidateOrFn<OtpValues>,
  undefined | FormAsyncValidateOrFn<OtpValues>,
  never
>;

type LoginOtpStepProps = {
  pendingLogin: LoginFormValues | null;
  backToLogin: () => void;
};

export function LoginOtpStep({ pendingLogin, backToLogin }: LoginOtpStepProps) {
  const router = useRouter();
  const setTokens = useAuthStore((state) => state.setTokens);

  const verifyOtpMutation = useMutation({
    mutationFn: (otp: string) => {
      if (!pendingLogin) {
        throw new Error("Missing pending login data.");
      }

      return loginVerify({
        phone_number: normalizeWhatsappNumber(pendingLogin.whatsappNumber),
        otp_code: otp,
      });
    },
    onSuccess: (tokens) => {
      setTokens(tokens.access_token, tokens.refresh_token);
      // Replace the login route after verification so a successful auth lands on
      // the app dashboard and does not keep the login page as the forward target.
      router.replace(APP_URL.APP);
    },
  });

  const otpForm: OtpFormApi = useForm({
    defaultValues: { otp: "" },
    onSubmit: async ({ value }) => {
      verifyOtpMutation.mutate(value.otp);
    },
  });

  const validateOtpField = (value: string) =>
    validateLoginField(otpSchema.shape.otp, value);

  const verifyError = verifyOtpMutation.error
    ? verifyOtpMutation.error.message ||
      "Something went wrong. Please try again."
    : null;

  return (
    <>
      {/* Heading */}
      <div className="mb-6 text-center">
        <h1 className="mb-1 text-2xl font-semibold leading-tight text-foreground">
          Verify your login
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter the OTP sent to <strong>{pendingLogin?.whatsappNumber}</strong>.
        </p>
      </div>

      {/* OTP form */}
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
                htmlFor="login-otp"
                className="text-sm font-medium text-foreground"
              >
                OTP Code
              </label>
              <OtpInput
                id="login-otp"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
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
          Enter the latest 6-digit OTP sent to your WhatsApp number.
        </p>

        {verifyError && (
          <p className="text-sm text-destructive">{verifyError}</p>
        )}

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
          onClick={backToLogin}
        >
          Back
        </Button>
      </form>
    </>
  );
}
