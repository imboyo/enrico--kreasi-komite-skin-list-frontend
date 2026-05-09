import { Icon } from "@iconify/react";

import { FormFieldError } from "components/atomic/atom/FormFieldError";
import { TextInput } from "components/atomic/atom/TextInput";
import { PasswordToggleButton } from "components/atomic/atom/PasswordToggleButton";
import {
  type EditPasswordFormApi,
  editPasswordSchema,
  validateEditPasswordField,
} from "./useEditPasswordForm";

interface EditPasswordFieldProps {
  form: EditPasswordFormApi;
  name: "currentPassword" | "newPassword" | "confirmPassword";
  label: string;
  placeholder: string;
  autoComplete: string;
  visible: boolean;
  onToggle: () => void;
  disabled: boolean;
  inputId: string;
}

export function EditPasswordField({
  form,
  name,
  label,
  placeholder,
  autoComplete,
  visible,
  onToggle,
  disabled,
  inputId,
}: EditPasswordFieldProps) {
  return (
    <form.Field
      name={name}
      validators={{
        onBlur: ({ value }) =>
          validateEditPasswordField(editPasswordSchema.shape[name], value),
        onSubmit: ({ value }) =>
          validateEditPasswordField(editPasswordSchema.shape[name], value),
      }}
    >
      {(field) => (
        <div className="flex flex-col gap-1.5">
          <label htmlFor={inputId} className="text-sm font-medium text-foreground">
            {label}
          </label>
          <TextInput
            id={inputId}
            type={visible ? "text" : "password"}
            placeholder={placeholder}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            autoComplete={autoComplete}
            startItem={<Icon icon="material-symbols:lock-outline" />}
            endItem={<PasswordToggleButton visible={visible} onToggle={onToggle} />}
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
