"use client";

import { PasswordField } from "components/atomic/organism/account-edit-password/PasswordField";

import {
  formSchema,
  type FormApi,
  validateField,
} from "client-side-page/admin/user/admin/item-list/item-card/item-actions/change-admin-password/useForm";

type PasswordFieldProps = {
  form: FormApi;
  inputId: string;
  disabled: boolean;
  visible: boolean;
  onToggle: () => void;
};

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
      label="Password baru"
      placeholder="Masukkan password baru"
      autoComplete="new-password"
      helperText={
        <p className="text-xs text-dialog-current-muted">
          Gunakan 8-128 karakter. Password baru akan dikirim ke WhatsApp admin.
        </p>
      }
        validate={(value) =>
        validateField(
          formSchema.shape.password,
          value,
        )
      }
    />
  );
}
