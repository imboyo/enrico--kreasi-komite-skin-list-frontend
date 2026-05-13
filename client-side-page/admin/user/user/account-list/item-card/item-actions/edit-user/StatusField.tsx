"use client";

import { Icon } from "@iconify/react";
import type { ChangeEvent } from "react";

import type { VisibleAccountStatus } from "backend-service/admin/account";
import { FormFieldError } from "components/atomic/atom/FormFieldError";
import { Select } from "components/atomic/atom/Select";

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
      <Select
        id={fieldId}
        value={value}
        onChange={onChange}
        disabled={disabled}
        surface="transparent"
        startItem={
          <Icon
            icon="material-symbols:verified-user-outline-rounded"
            className="size-5 shrink-0"
          />
        }
        options={USER_STATUS_OPTIONS}
      />
      <FormFieldError isTouched error={error} />
    </div>
  );
}
