import { Icon } from "@iconify/react";

import { FormFieldError } from "@/components/atomic/atom/FormFieldError";
import { PasswordToggleButton } from "@/components/atomic/atom/PasswordToggleButton";
import { TextInput } from "@/components/atomic/atom/TextInput";

import {
  addSuperAdminSchema,
  type AddSuperAdminFormApi,
  validateAddSuperAdminField,
} from "./add-super-admin.schema";

interface Props {
  form: AddSuperAdminFormApi;
  showPassword: boolean;
  onToggleShowPassword: () => void;
  disabled: boolean;
}

export function PasswordField({
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
          validateAddSuperAdminField(addSuperAdminSchema.shape.password, value),
        onSubmit: ({ value }) =>
          validateAddSuperAdminField(addSuperAdminSchema.shape.password, value),
      }}
    >
      {(field) => (
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="super-admin-password"
            className="text-sm font-medium text-foreground"
          >
            Kata Sandi
          </label>
          <TextInput
            id="super-admin-password"
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan kata sandi"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            autoComplete="new-password"
            startItem={<Icon icon="material-symbols:lock-outline" />}
            endItem={
              <PasswordToggleButton
                visible={showPassword}
                onToggle={onToggleShowPassword}
              />
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
