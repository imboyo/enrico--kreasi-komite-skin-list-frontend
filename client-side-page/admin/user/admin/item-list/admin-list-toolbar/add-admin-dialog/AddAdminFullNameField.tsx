"use client";

import { Icon } from "@iconify/react";

import { FormFieldError } from "components/atomic/atom/FormFieldError";
import { TextInput } from "components/atomic/atom/TextInput";

import {
  addAdminFormSchema,
  type AddAdminFormApi,
  validateAddAdminField,
} from "./useAddAdminForm";

type AddAdminFullNameFieldProps = {
  form: AddAdminFormApi;
  fieldId: string;
  disabled: boolean;
};

export function AddAdminFullNameField({
  form,
  fieldId,
  disabled,
}: AddAdminFullNameFieldProps) {
  return (
    <form.Field
      name="fullName"
      validators={{
        onBlur: ({ value }) =>
          validateAddAdminField(addAdminFormSchema.shape.fullName, value),
        onSubmit: ({ value }) =>
          validateAddAdminField(addAdminFormSchema.shape.fullName, value),
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
