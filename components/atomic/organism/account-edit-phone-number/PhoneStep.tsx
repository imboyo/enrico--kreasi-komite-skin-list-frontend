import { Button } from "@/components/atomic/atom/Button";
import { SuccessIndicator } from "./SuccessIndicator";
import { WhatsappField } from "./WhatsappField";
import type { AccountEditPhoneNumberFlowState } from "./useAccountEditPhoneNumberFlow";

type Props = Pick<
  AccountEditPhoneNumberFlowState,
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
      onSubmit={(event) => {
        event.preventDefault();
        void phoneForm.handleSubmit();
      }}
      className="flex flex-col gap-3"
    >
      <WhatsappField
        phoneForm={phoneForm}
        initiateMutation={initiateMutation}
        validatePhoneField={validatePhoneField}
      />

      {initiateError && (
        <p className="text-sm text-destructive">{initiateError}</p>
      )}
      {isSuccess && <SuccessIndicator />}

      <phoneForm.Subscribe
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
