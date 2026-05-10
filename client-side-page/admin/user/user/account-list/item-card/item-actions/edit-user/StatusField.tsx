"use client";

import { Icon } from "@iconify/react";
import type { ChangeEvent } from "react";

import type { VisibleAccountStatus } from "backend-service/admin/account";
import { FormFieldError } from "components/atomic/atom/FormFieldError";

type StatusFieldProps = {
  userUuid: string;
  value: VisibleAccountStatus;
  error?: string;
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const USER_STATUS_OPTIONS: { value: VisibleAccountStatus; label: string }[] = [
  { value: "ACTIVE", label: "Aktif" },
  { value: "INACTIVE", label: "Tidak aktif" },
];

export function StatusField({
  userUuid,
  value,
  error,
  disabled,
  onChange,
}: StatusFieldProps) {
  const fieldId = `edit-user-status-${userUuid}`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium">
        Status
      </label>
      <div className="flex min-h-12 items-center gap-3 rounded-2xl border border-input bg-transparent px-4 transition-shadow duration-150 focus-within:ring-2 focus-within:ring-ring">
        <Icon
          icon="material-symbols:verified-user-outline-rounded"
          className="size-5 shrink-0 text-input-placeholder"
        />
        <select
          id={fieldId}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full border-none bg-transparent py-3 text-sm text-foreground outline-none disabled:cursor-not-allowed"
        >
          {USER_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <FormFieldError isTouched error={error} />
    </div>
  );
}
