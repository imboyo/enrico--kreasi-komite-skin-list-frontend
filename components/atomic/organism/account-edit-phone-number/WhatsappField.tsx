import { WhatsappNumberField } from "@/components/atomic/molecule/WhatsappNumberField";
import type { AccountEditPhoneNumberFlowState } from "./useAccountEditPhoneNumberFlow";

type Props = Pick<
  AccountEditPhoneNumberFlowState,
  "phoneForm" | "initiateMutation" | "validatePhoneField"
>;

export function WhatsappField({
  phoneForm,
  initiateMutation,
  validatePhoneField,
}: Props) {
  return (
    <phoneForm.Field
      name="phoneNumber"
      validators={{
        onBlur: ({ value }) => validatePhoneField(value),
        onSubmit: ({ value }) => validatePhoneField(value),
      }}
    >
      {(field) => (
        <WhatsappNumberField
          field={field}
          inputId="account-edit-phone-number"
          disabled={initiateMutation.isPending}
        />
      )}
    </phoneForm.Field>
  );
}
