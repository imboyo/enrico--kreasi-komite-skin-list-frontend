"use client";

import { Icon } from "@iconify/react";
import type { ChangeEvent } from "react";

import { FormFieldError } from "components/atomic/atom/FormFieldError";
import { TextInput } from "components/atomic/atom/TextInput";

type EmailFieldProps = {
  userUuid: string;
  value: string;
  error?: string;
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function EmailField({
  userUuid,
  value,
  error,
  disabled,
  onChange,
}: EmailFieldProps) {
  const fieldId = `edit-user-email-${userUuid}`;

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
        placeholder="Masukkan email pelanggan"
        autoComplete="email"
        startItem={<Icon icon="material-symbols:mail-outline-rounded" />}
        disabled={disabled}
        surface="transparent"
      />
      <FormFieldError isTouched error={error} />
    </div>
  );
}
