"use client";

import { PasswordField } from "@/components/atomic/organism/account-edit-password/PasswordField";

import {
  addAdminFormSchema,
  type AddAdminFormApi,
  validateAddAdminField,
} from "./useAddAdminForm";

interface AddAdminPasswordFieldProps {
  form: AddAdminFormApi;
  inputId: string;
  disabled: boolean;
  visible: boolean;
  onToggle: () => void;
}

export function AddAdminPasswordField({
  form,
  inputId,
  disabled,
  visible,
  onToggle,
}: AddAdminPasswordFieldProps) {
  return (
    <PasswordField
      form={form}
      name="password"
      inputId={inputId}
      disabled={disabled}
      visible={visible}
      onToggle={onToggle}
      label="Password"
      placeholder="Masukkan password admin"
      autoComplete="new-password"
      helperText={
        <p className="text-xs text-dialog-current-muted">
          Gunakan minimal 8 karakter untuk password awal admin.
        </p>
      }
      validate={(value) =>
        validateAddAdminField(addAdminFormSchema.shape.password, value)
      }
    />
  );
}
