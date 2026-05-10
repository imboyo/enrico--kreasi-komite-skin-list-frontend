"use client";

import { WhatsappNumberField } from "components/atomic/molecule/WhatsappNumberField";
import { validateWhatsappField } from "libs/util/whatsapp-number";

import type { AddAdminFormApi } from "./useAddAdminForm";

type AddAdminPhoneNumberFieldProps = {
  form: AddAdminFormApi;
  fieldId: string;
  disabled: boolean;
};

export function AddAdminPhoneNumberField({
  form,
  fieldId,
  disabled,
}: AddAdminPhoneNumberFieldProps) {
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
