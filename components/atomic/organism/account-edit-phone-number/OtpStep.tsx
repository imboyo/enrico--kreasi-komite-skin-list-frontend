import { Button } from "@/components/atomic/atom/Button";
import { OtpField } from "./OtpField";
import type { AccountEditPhoneNumberFlowState } from "./useAccountEditPhoneNumberFlow";

type Props = Pick<
  AccountEditPhoneNumberFlowState,
  | "otpForm"
  | "verifyMutation"
  | "verifyError"
  | "pendingPhone"
  | "validateOtpField"
  | "backToPhone"
>;

export function OtpStep({
  otpForm,
  verifyMutation,
  verifyError,
  pendingPhone,
  validateOtpField,
  backToPhone,
}: Props) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void otpForm.handleSubmit();
      }}
      className="flex flex-col gap-3"
    >
      {/* Reminder of which number the OTP was sent to */}
      <p className="text-sm text-muted-foreground">
        Masukkan OTP yang dikirim ke{" "}
        <strong className="text-foreground">{pendingPhone}</strong> melalui
        WhatsApp.
      </p>

      <OtpField
        otpForm={otpForm}
        verifyMutation={verifyMutation}
        validateOtpField={validateOtpField}
      />

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
            className="self-end"
            size="md"
            isLoading={verifyMutation.isPending}
            disabled={
              verifyMutation.isPending ||
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
        className="w-full md:w-fit md:self-end"
        size="lg"
        variant="outline"
        disabled={verifyMutation.isPending}
        onClick={backToPhone}
      >
        Kembali
      </Button>
    </form>
  );
}
