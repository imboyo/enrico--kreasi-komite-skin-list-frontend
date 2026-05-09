import { Icon } from "@iconify/react";

import { FormFieldError } from "@/components/atomic/atom/FormFieldError";
import { TextInput } from "@/components/atomic/atom/TextInput";
import type { RegisterFormApi } from "@/hooks/useRegisterForm";

interface Props {
  form: RegisterFormApi;
  showPassword: boolean;
  onToggleShowPassword: () => void;
  disabled: boolean;
}

export function RegisterConfirmPasswordField({
  form,
  showPassword,
  onToggleShowPassword,
  disabled,
}: Props) {
  return (
    <form.Field
      name="confirmPassword"
      validators={{
        onChangeListenTo: ["password"],
        onBlur: ({ value, fieldApi }) => {
          // Re-run the cross-field check here so confirm-password errors update after either field changes.
          if (!value) {
            return "Mohon konfirmasi kata sandi Anda";
          }

          return value === fieldApi.form.getFieldValue("password")
            ? undefined
            : "Konfirmasi kata sandi tidak cocok";
        },
        onChange: ({ value, fieldApi }) => {
          if (!value) {
            return undefined;
          }

          return value === fieldApi.form.getFieldValue("password")
            ? undefined
            : "Konfirmasi kata sandi tidak cocok";
        },
        onSubmit: ({ value, fieldApi }) =>
          value === fieldApi.form.getFieldValue("password")
            ? undefined
            : "Konfirmasi kata sandi tidak cocok",
      }}
    >
      {(field) => (
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="register-confirm-password"
            className="text-sm font-medium text-foreground"
          >
            Konfirmasi Kata Sandi
          </label>
          <TextInput
            id="register-confirm-password"
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan ulang kata sandi Anda"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            autoComplete="new-password"
            startItem={<Icon icon="material-symbols:lock-outline" />}
            endItem={
              <button
                type="button"
                aria-label={
                  showPassword
                    ? "Sembunyikan kata sandi"
                    : "Tampilkan kata sandi"
                }
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
