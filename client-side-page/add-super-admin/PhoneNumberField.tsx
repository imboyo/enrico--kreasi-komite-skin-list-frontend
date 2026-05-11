import { Icon } from "@iconify/react";

import { FormFieldError } from "@/components/atomic/atom/FormFieldError";
import { TextInput } from "@/components/atomic/atom/TextInput";
import {
  sanitizeWhatsappNumberInput,
  validateWhatsappField,
} from "libs/util/whatsapp-number";

import { type AddSuperAdminFormApi } from "./add-super-admin.schema";

interface Props {
  form: AddSuperAdminFormApi;
  disabled: boolean;
}

export function PhoneNumberField({ form, disabled }: Props) {
  return (
    <form.Field
      name="phoneNumber"
      validators={{
        onBlur: ({ value }) => validateWhatsappField(value),
        onSubmit: ({ value }) => validateWhatsappField(value),
      }}
    >
      {(field) => (
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="super-admin-phone-number"
            className="text-sm font-medium text-foreground"
          >
            Nomor WhatsApp
          </label>
          <TextInput
            id="super-admin-phone-number"
            type="tel"
            placeholder="Masukkan nomor WhatsApp"
            value={field.state.value}
            onChange={(e) =>
              field.handleChange(sanitizeWhatsappNumberInput(e.target.value))
            }
            onBlur={field.handleBlur}
            autoComplete="tel"
            startItem={<Icon icon="material-symbols:phone-android-outline" />}
            disabled={disabled}
            surface="transparent"
          />
          <FormFieldError
            isTouched={field.state.meta.isTouched}
            error={field.state.meta.errors[0]}
          />
        </div>
      )}
    </form.Field>
  );
}
