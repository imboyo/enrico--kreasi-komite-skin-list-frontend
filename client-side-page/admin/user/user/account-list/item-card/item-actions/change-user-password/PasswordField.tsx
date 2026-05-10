"use client";

import { PasswordField as BasePasswordField } from "components/atomic/organism/account-edit-password/PasswordField";
import {
  formSchema,
  type FormApi,
  validateField,
} from "client-side-page/admin/user/user/account-list/item-card/item-actions/change-user-password/useForm";

type PasswordFieldProps = {
  form: FormApi;
  inputId: string;
  disabled: boolean;
  visible: boolean;
  onToggle: () => void;
};

export function ChangeUserPasswordField({
  form,
  inputId,
  disabled,
  visible,
  onToggle,
}: PasswordFieldProps) {
  return (
    <BasePasswordField
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
          Gunakan 8-128 karakter. Password baru akan dikirim ke WhatsApp
          pelanggan.
        </p>
      }
      validate={(value) => validateField(formSchema.shape.password, value)}
    />
  );
}
