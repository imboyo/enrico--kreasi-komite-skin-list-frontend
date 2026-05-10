"use client";

import { PasswordField } from "@/components/atomic/organism/account-edit-password/PasswordField";

import {
  dialogFormSchema,
  type DialogFormApi,
  validateDialogField,
} from "./useDialogForm";

interface PasswordFieldProps {
  form: DialogFormApi;
  inputId: string;
  disabled: boolean;
  visible: boolean;
  onToggle: () => void;
}

export function PasswordField({
  form,
  inputId,
  disabled,
  visible,
  onToggle,
}: PasswordFieldProps) {
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
      validate={(value) => validateDialogField(dialogFormSchema.shape.password, value)}
    />
  );
}
