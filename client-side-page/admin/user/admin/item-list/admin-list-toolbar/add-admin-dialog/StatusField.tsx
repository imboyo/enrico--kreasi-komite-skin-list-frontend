"use client";

import { Icon } from "@iconify/react";

import type { VisibleAccountStatus } from "backend-service/admin/account";
import { FormFieldError } from "components/atomic/atom/FormFieldError";
import { Select } from "components/atomic/atom/Select";

import {
  dialogFormSchema,
  type DialogFormApi,
  validateDialogField,
} from "./useDialogForm";

type StatusFieldProps = {
  form: DialogFormApi;
  fieldId: string;
  disabled: boolean;
};

const ADMIN_STATUS_OPTIONS: { value: VisibleAccountStatus; label: string }[] = [
  { value: "ACTIVE", label: "Aktif" },
  { value: "INACTIVE", label: "Tidak aktif" },
];

export function StatusField({
  form,
  fieldId,
  disabled,
}: StatusFieldProps) {
  return (
    <form.Field
      name="status"
      validators={{
        onBlur: ({ value }) =>
          validateDialogField(dialogFormSchema.shape.status, value),
        onSubmit: ({ value }) =>
          validateDialogField(dialogFormSchema.shape.status, value),
      }}
    >
      {(field) => (
        <div className="flex flex-col gap-1.5">
          <label htmlFor={fieldId} className="text-sm font-medium">
            Status
          </label>
          <Select
            id={fieldId}
            value={field.state.value}
            onChange={(event) =>
              field.handleChange(event.target.value as VisibleAccountStatus)
            }
            disabled={disabled}
            surface="transparent"
            startItem={
              <Icon
                icon="material-symbols:verified-user-outline-rounded"
                className="size-5 shrink-0"
              />
            }
            options={ADMIN_STATUS_OPTIONS}
          />
          <FormFieldError
            isTouched={field.state.meta.isTouched}
            error={field.state.meta.errors[0]}
          />
        </div>
      )}
    </form.Field>
  );
}
