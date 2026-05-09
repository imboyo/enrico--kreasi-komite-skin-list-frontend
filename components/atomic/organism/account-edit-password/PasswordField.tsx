import { Icon } from "@iconify/react";

import { FormFieldError } from "@/components/atomic/atom/FormFieldError";
import { PasswordToggleButton } from "@/components/atomic/atom/PasswordToggleButton";
import { TextInput } from "@/components/atomic/atom/TextInput";
import {
  type AccountEditPasswordFormApi,
  accountEditPasswordSchema,
  validateAccountEditPasswordField,
} from "./useAccountEditPasswordForm";

interface PasswordFieldProps {
  form: AccountEditPasswordFormApi;
  name: "currentPassword" | "newPassword" | "confirmPassword";
  label: string;
  placeholder: string;
  autoComplete: string;
  visible: boolean;
  onToggle: () => void;
  disabled: boolean;
  inputId: string;
}

export function PasswordField({
  form,
  name,
  label,
  placeholder,
  autoComplete,
  visible,
  onToggle,
  disabled,
  inputId,
}: PasswordFieldProps) {
  return (
    <form.Field
      name={name}
      validators={{
        onBlur: ({ value }) =>
          validateAccountEditPasswordField(
            accountEditPasswordSchema.shape[name],
            value,
          ),
        onSubmit: ({ value }) =>
          validateAccountEditPasswordField(
            accountEditPasswordSchema.shape[name],
            value,
          ),
      }}
    >
      {(field) => (
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
          <TextInput
            id={inputId}
            type={visible ? "text" : "password"}
            placeholder={placeholder}
            value={field.state.value}
            onChange={(event) => field.handleChange(event.target.value)}
            onBlur={field.handleBlur}
            autoComplete={autoComplete}
            startItem={<Icon icon="material-symbols:lock-outline" />}
            endItem={
              <PasswordToggleButton visible={visible} onToggle={onToggle} />
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
