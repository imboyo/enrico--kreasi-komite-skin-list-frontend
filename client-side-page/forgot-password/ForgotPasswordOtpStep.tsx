import { Button } from "@/components/atomic/atom/Button";
import { FormFieldError } from "@/components/atomic/atom/FormFieldError";
import { OtpInput } from "@/components/atomic/atom/OtpInput";
import type { useForgotPasswordFlow } from "@/hooks/useForgotPasswordFlow";

type ForgotPasswordFlowState = ReturnType<typeof useForgotPasswordFlow>;

type Props = Pick<
  ForgotPasswordFlowState,
  | "otpForm"
  | "pendingWhatsappNumber"
  | "verifyOtpMutation"
  | "verifyOtpError"
  | "backToWhatsapp"
  | "validateOtpField"
>;

export function ForgotPasswordOtpStep({
  otpForm,
  pendingWhatsappNumber,
  verifyOtpMutation,
  verifyOtpError,
  backToWhatsapp,
  validateOtpField,
}: Props) {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="mb-1 text-2xl font-semibold leading-tight text-foreground">
          Masukkan OTP
        </h1>
        <p className="text-sm text-muted-foreground">
          Masukkan OTP yang dikirim ke <strong>{pendingWhatsappNumber}</strong>.
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
                htmlFor="forgot-password-otp"
                className="text-sm font-medium text-foreground"
              >
                Kode OTP
              </label>
              <OtpInput
                id="forgot-password-otp"
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

        {verifyOtpError && (
          <p className="text-sm text-destructive">{verifyOtpError}</p>
        )}

        <otpForm.Subscribe
          selector={(state) => ({ isValid: state.isValid, values: state.values })}
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
          onClick={backToWhatsapp}
        >
          Kembali
        </Button>
      </form>
    </>
  );
}
