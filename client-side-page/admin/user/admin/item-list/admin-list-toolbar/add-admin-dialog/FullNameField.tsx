"use client";

import { Icon } from "@iconify/react";

import { FormFieldError } from "components/atomic/atom/FormFieldError";
import { TextInput } from "components/atomic/atom/TextInput";

import {
  dialogFormSchema,
  type DialogFormApi,
  validateDialogField,
} from "./useDialogForm";

type FullNameFieldProps = {
  form: DialogFormApi;
  fieldId: string;
  disabled: boolean;
};

export function FullNameField({
  form,
  fieldId,
  disabled,
}: FullNameFieldProps) {
  return (
    <form.Field
      name="fullName"
      validators={{
        onBlur: ({ value }) =>
          validateDialogField(dialogFormSchema.shape.fullName, value),
        onSubmit: ({ value }) =>
          validateDialogField(dialogFormSchema.shape.fullName, value),
      }}
    >
      {(field) => (
        <div className="flex flex-col gap-1.5">
          <label htmlFor={fieldId} className="text-sm font-medium">
            Nama lengkap
          </label>
          <TextInput
            id={fieldId}
            value={field.state.value}
            onChange={(event) => field.handleChange(event.target.value)}
            onBlur={field.handleBlur}
            placeholder="Masukkan nama admin"
            autoComplete="name"
            startItem={<Icon icon="material-symbols:person-outline-rounded" />}
            disabled={disabled}
            surface="transparent"
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
