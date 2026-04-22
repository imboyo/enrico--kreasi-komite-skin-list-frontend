import { Icon } from "@iconify/react";

import type { LoginFormApi } from "@/hooks/useLoginForm";
import { loginSchema, validateLoginField } from "@/hooks/useLoginForm";

import { FormFieldError } from "@/components/atomic/atom/FormFieldError";
import { TextInput } from "@/components/atomic/atom/TextInput";

interface Props {
  form: LoginFormApi;
  showPassword: boolean;
  onToggleShowPassword: () => void;
  disabled: boolean;
}

export function LoginPasswordField({
  form,
  showPassword,
  onToggleShowPassword,
  disabled,
}: Props) {
  return (
    <form.Field
      name="password"
      validators={{
        onBlur: ({ value }) =>
          validateLoginField(loginSchema.shape.password, value),
        onSubmit: ({ value }) =>
          validateLoginField(loginSchema.shape.password, value),
      }}
    >
      {(field) => (
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="login-password"
            className="text-sm font-medium text-foreground"
          >
            Password
          </label>
          <TextInput
            id="login-password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            autoComplete="current-password"
            startItem={<Icon icon="material-symbols:lock-outline" />}
            endItem={
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={onToggleShowPassword}
                className="text-input-placeholder transition-colors hover:text-foreground"
              >
                <Icon
                  icon={
                    showPassword
                      ? "material-symbols:visibility-off-outline"
                      : "material-symbols:visibility-outline"
                  }
                  className="size-5"
                />
              </button>
            }
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
