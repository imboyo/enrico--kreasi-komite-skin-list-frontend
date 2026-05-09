import {
  useForm,
  type ReactFormExtendedApi,
  type FormValidateOrFn,
  type FormAsyncValidateOrFn,
} from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { registerVerify } from "@/backend-service/auth/register-verify.service";
import { Button } from "@/components/atomic/atom/Button";
import { FormFieldError } from "@/components/atomic/atom/FormFieldError";
import { OtpInput } from "@/components/atomic/atom/OtpInput";
import {
  validateRegisterField,
  type RegisterFormValues,
} from "@/hooks/useRegisterForm";
import { normalizeWhatsappNumber } from "libs/util/whatsapp-number";

const otpSchema = z.object({
  otp: z
    .string()
    .min(1, "Kode OTP wajib diisi")
    .length(6, "Kode OTP harus terdiri dari 6 digit"),
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

type RegisterOtpStepProps = {
  pendingRegistration: RegisterFormValues | null;
  backToRegister: () => void;
  onVerifySuccess: (user: { name: string; whatsappNumber: string }) => void;
};

export function RegisterOtpStep({
  pendingRegistration,
  backToRegister,
  onVerifySuccess,
}: RegisterOtpStepProps) {
  const verifyOtpMutation = useMutation({
    mutationFn: (otp: string) => {
      if (!pendingRegistration) {
        throw new Error("Missing pending registration data.");
      }

      return registerVerify({
        phone_number: normalizeWhatsappNumber(
          pendingRegistration.whatsappNumber,
        ),
        otp_code: otp,
      });
    },
    onSuccess: () => {
      if (!pendingRegistration) {
        return;
      }

      // The verify endpoint only confirms activation, so the success screen
      // keeps using the already submitted registration identity.
      onVerifySuccess({
        name: pendingRegistration.name,
        whatsappNumber: pendingRegistration.whatsappNumber,
      });
    },
  });

  const otpForm: OtpFormApi = useForm({
    defaultValues: { otp: "" },
    onSubmit: async ({ value }) => {
      verifyOtpMutation.mutate(value.otp);
    },
  });

  const validateOtpField = (value: string) =>
    validateRegisterField(otpSchema.shape.otp, value);

  const verifyError = verifyOtpMutation.error
    ? "Terjadi kesalahan. Silakan coba lagi."
    : null;

  return (
    <>
      {/* Heading */}
      <div className="mb-6 text-center">
        <h1 className="mb-1 text-2xl font-semibold leading-tight text-foreground">
          Verifikasi akun Anda
        </h1>
        <p className="text-sm text-muted-foreground">
          Masukkan OTP yang dikirim ke{" "}
          <strong>{pendingRegistration?.whatsappNumber}</strong>.
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
                htmlFor="register-otp"
                className="text-sm font-medium text-foreground"
              >
                Kode OTP
              </label>
              <OtpInput
                id="register-otp"
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
          Masukkan 6 digit OTP terbaru yang dikirim ke nomor WhatsApp Anda.
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
              Verifikasi OTP
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
          Kembali
        </Button>
      </form>
    </>
  );
}
