"use client";

import { Icon } from "@iconify/react";
import type { ChangeEvent } from "react";

import { FormFieldError } from "components/atomic/atom/FormFieldError";
import { TextInput } from "components/atomic/atom/TextInput";

type FullNameFieldProps = {
  userUuid: string;
  value: string;
  error?: string;
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function FullNameField({
  userUuid,
  value,
  error,
  disabled,
  onChange,
}: FullNameFieldProps) {
  const fieldId = `edit-user-name-${userUuid}`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium">
        Nama lengkap
      </label>
      <TextInput
        id={fieldId}
        value={value}
        onChange={onChange}
        placeholder="Masukkan nama pelanggan"
        autoComplete="name"
        startItem={<Icon icon="material-symbols:person-outline-rounded" />}
        disabled={disabled}
        surface="transparent"
      />
      <FormFieldError isTouched error={error} />
    </div>
  );
}
