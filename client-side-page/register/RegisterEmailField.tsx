import { Icon } from "@iconify/react";

import { FormFieldError } from "@/components/atomic/atom/FormFieldError";
import { TextInput } from "@/components/atomic/atom/TextInput";
import type { RegisterFormApi } from "@/hooks/useRegisterForm";
import {
  registerSchema,
  validateRegisterField,
} from "@/hooks/useRegisterForm";

interface Props {
  form: RegisterFormApi;
  disabled: boolean;
}

export function RegisterEmailField({ form, disabled }: Props) {
  return (
    <form.Field
      name="email"
      validators={{
        onBlur: ({ value }) =>
          validateRegisterField(registerSchema.shape.email, value),
        onSubmit: ({ value }) =>
          validateRegisterField(registerSchema.shape.email, value),
      }}
    >
      {(field) => (
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="register-email"
            className="text-sm font-medium text-foreground"
          >
            Email
          </label>
          <TextInput
            id="register-email"
            type="email"
            placeholder="Enter your email"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            autoComplete="email"
            startItem={<Icon icon="material-symbols:mail-outline-rounded" />}
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
