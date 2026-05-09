import { Button } from "components/atomic/atom/Button";
import type { EditPhoneNumberFlowState } from "client-side-page/app/profile/info/useEditPhoneNumberFlow";
import { EditPhoneNumberSuccessIndicator } from "./EditPhoneNumberSuccessIndicator";
import { EditPhoneNumberWhatsappField } from "./EditPhoneNumberWhatsappField";

type Props = Pick<
  EditPhoneNumberFlowState,
  | "phoneForm"
  | "initiateMutation"
  | "initiateError"
  | "isSuccess"
  | "validatePhoneField"
>;

export function PhoneStep({
  phoneForm,
  initiateMutation,
  initiateError,
  isSuccess,
  validatePhoneField,
}: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void phoneForm.handleSubmit();
      }}
      className="flex flex-col gap-3"
    >
      <EditPhoneNumberWhatsappField
        phoneForm={phoneForm}
        initiateMutation={initiateMutation}
        validatePhoneField={validatePhoneField}
      />

      {initiateError && (
        <p className="text-sm text-destructive">{initiateError}</p>
      )}
      {isSuccess && <EditPhoneNumberSuccessIndicator />}

      <phoneForm.Subscribe
        selector={(s) => ({ isValid: s.isValid, values: s.values })}
      >
        {({ isValid, values }) => (
          <Button
            type="submit"
            fullWidth
            size="lg"
            isLoading={initiateMutation.isPending}
            disabled={
              initiateMutation.isPending ||
              !values.phoneNumber.trim() ||
              (!isValid && phoneForm.state.submissionAttempts > 0)
            }
          >
            Kirim OTP
          </Button>
        )}
      </phoneForm.Subscribe>
    </form>
  );
}
