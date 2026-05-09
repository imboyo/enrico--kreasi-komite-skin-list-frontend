import { FormFieldError } from "@/components/atomic/atom/FormFieldError";
import { OtpInput } from "@/components/atomic/atom/OtpInput";
import type { AccountEditPhoneNumberFlowState } from "./useAccountEditPhoneNumberFlow";

type Props = Pick<
  AccountEditPhoneNumberFlowState,
  "otpForm" | "verifyMutation" | "validateOtpField"
>;

export function OtpField({
  otpForm,
  verifyMutation,
  validateOtpField,
}: Props) {
  return (
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
            htmlFor="account-edit-phone-otp"
            className="text-sm font-medium text-foreground"
          >
            Kode OTP
          </label>
          <OtpInput
            id="account-edit-phone-otp"
            value={field.state.value}
            onChange={(event) => field.handleChange(event.target.value)}
            onBlur={field.handleBlur}
            disabled={verifyMutation.isPending}
            surface="transparent"
          />
          <FormFieldError
            isTouched={field.state.meta.isTouched}
            error={field.state.meta.errors[0]}
          />
        </div>
      )}
    </otpForm.Field>
  );
}
