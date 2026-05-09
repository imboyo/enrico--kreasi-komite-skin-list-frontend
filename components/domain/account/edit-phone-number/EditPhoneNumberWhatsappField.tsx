import { WhatsappNumberField } from "components/atomic/molecule/WhatsappNumberField";
import type { EditPhoneNumberFlowState } from "./useEditPhoneNumberFlow";

type Props = Pick<
  EditPhoneNumberFlowState,
  "phoneForm" | "initiateMutation" | "validatePhoneField"
>;

export function EditPhoneNumberWhatsappField({
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
          inputId="edit-phone-number"
          disabled={initiateMutation.isPending}
        />
      )}
    </phoneForm.Field>
  );
}
