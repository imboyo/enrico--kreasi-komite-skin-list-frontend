import { WhatsappNumberField } from "@/components/atomic/molecule/WhatsappNumberField";
import type { LoginFormApi } from "@/hooks/useLoginForm";
import { validateWhatsappField } from "libs/util/whatsapp-number";

interface Props {
  form: LoginFormApi;
  disabled: boolean;
}

export function LoginWhatsappNumberField({ form, disabled }: Props) {
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
          inputId="login-whatsapp-number"
          disabled={disabled}
        />
      )}
    </form.Field>
  );
}
