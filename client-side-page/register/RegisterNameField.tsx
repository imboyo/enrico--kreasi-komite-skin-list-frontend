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

export function RegisterNameField({ form, disabled }: Props) {
  return (
    <form.Field
      name="name"
      validators={{
        onBlur: ({ value }) => validateRegisterField(registerSchema.shape.name, value),
        onSubmit: ({ value }) =>
          validateRegisterField(registerSchema.shape.name, value),
      }}
    >
      {(field) => (
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="register-name"
            className="text-sm font-medium text-foreground"
          >
            Full Name
          </label>
          <TextInput
            id="register-name"
            type="text"
            placeholder="Enter your full name"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            autoComplete="name"
            startItem={<Icon icon="material-symbols:person-outline-rounded" />}
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
