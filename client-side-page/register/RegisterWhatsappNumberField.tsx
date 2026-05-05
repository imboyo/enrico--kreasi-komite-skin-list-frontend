import { WhatsappNumberField } from "@/components/atomic/molecule/WhatsappNumberField";
import type { RegisterFormApi } from "@/hooks/useRegisterForm";
import { validateWhatsappField } from "libs/util/whatsapp-number";

interface Props {
  form: RegisterFormApi;
  disabled: boolean;
}

export function RegisterWhatsappNumberField({ form, disabled }: Props) {
  return (
    <form.Field
      name="whatsappNumber"
      validators={{
        onBlur: ({ value }) => validateWhatsappField(value),
        onSubmit: ({ value }) => validateWhatsappField(value),
      }}
    >
      {(field) => (
        <WhatsappNumberField
          field={field}
          inputId="register-whatsapp-number"
          disabled={disabled}
        />
      )}
    </form.Field>
  );
}
