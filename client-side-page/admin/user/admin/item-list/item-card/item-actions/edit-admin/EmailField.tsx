"use client";

import { Icon } from "@iconify/react";
import type { ChangeEvent } from "react";

import { FormFieldError } from "components/atomic/atom/FormFieldError";
import { TextInput } from "components/atomic/atom/TextInput";

type EmailFieldProps = {
  adminUuid: string;
  value: string;
  error?: string;
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function EmailField({
  adminUuid,
  value,
  error,
  disabled,
  onChange,
}: EmailFieldProps) {
  const fieldId = `edit-admin-email-${adminUuid}`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium">
        Email
      </label>
      <TextInput
        id={fieldId}
        type="email"
        value={value}
        onChange={onChange}
        placeholder="Masukkan email admin"
        autoComplete="email"
        startItem={<Icon icon="material-symbols:mail-outline-rounded" />}
        disabled={disabled}
        surface="transparent"
      />
      <FormFieldError isTouched error={error} />
    </div>
  );
}
