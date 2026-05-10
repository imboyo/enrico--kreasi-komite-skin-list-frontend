"use client";

import { WhatsappNumberField } from "components/atomic/molecule/WhatsappNumberField";
import { validateWhatsappField } from "libs/util/whatsapp-number";

import type { DialogFormApi } from "./useDialogForm";

type PhoneNumberFieldProps = {
  form: DialogFormApi;
  fieldId: string;
  disabled: boolean;
};

export function PhoneNumberField({
  form,
  fieldId,
  disabled,
}: PhoneNumberFieldProps) {
  return (
    <form.Field
      name="phoneNumber"
      validators={{
        onBlur: ({ value }) => validateWhatsappField(value),
        onSubmit: ({ value }) => validateWhatsappField(value),
      }}
    >
      {(field) => (
        <WhatsappNumberField
          field={field}
          inputId={fieldId}
          disabled={disabled}
        />
      )}
    </form.Field>
  );
}
