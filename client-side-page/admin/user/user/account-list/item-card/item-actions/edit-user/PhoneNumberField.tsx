"use client";

import { Icon } from "@iconify/react";
import type { ChangeEvent } from "react";

import { FormFieldError } from "components/atomic/atom/FormFieldError";
import { TextInput } from "components/atomic/atom/TextInput";

type PhoneNumberFieldProps = {
  userUuid: string;
  value: string;
  error?: string;
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function PhoneNumberField({
  userUuid,
  value,
  error,
  disabled,
  onChange,
}: PhoneNumberFieldProps) {
  const fieldId = `edit-user-phone-${userUuid}`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium">
        Nomor telepon
      </label>
      <TextInput
        id={fieldId}
        type="tel"
        value={value}
        onChange={onChange}
        placeholder="Masukkan nomor telepon"
        autoComplete="tel"
        startItem={<Icon icon="material-symbols:call-outline-rounded" />}
        disabled={disabled}
        surface="transparent"
      />
      <FormFieldError isTouched error={error} />
    </div>
  );
}
