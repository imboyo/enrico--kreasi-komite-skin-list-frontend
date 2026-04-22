import { Icon } from "@iconify/react";

import type { LoginFormApi } from "@/hooks/useLoginForm";
import { loginSchema, validateLoginField } from "@/hooks/useLoginForm";

import { FormFieldError } from "@/components/atomic/atom/FormFieldError";
import { TextInput } from "@/components/atomic/atom/TextInput";

interface Props {
  form: LoginFormApi;
  disabled: boolean;
}

export function LoginEmailField({ form, disabled }: Props) {
  return (
    <form.Field
      name="email"
      validators={{
        onBlur: ({ value }) => validateLoginField(loginSchema.shape.email, value),
        onSubmit: ({ value }) =>
          validateLoginField(loginSchema.shape.email, value),
      }}
    >
      {(field) => (
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="login-email"
            className="text-sm font-medium text-foreground"
          >
            Email
          </label>
          <TextInput
            id="login-email"
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
