"use client";

import { Icon } from "@iconify/react";

import { FormFieldError } from "components/atomic/atom/FormFieldError";
import { TextInput } from "components/atomic/atom/TextInput";

import {
  addAdminFormSchema,
  type AddAdminFormApi,
  validateAddAdminField,
} from "./useAddAdminForm";

type AddAdminEmailFieldProps = {
  form: AddAdminFormApi;
  fieldId: string;
  disabled: boolean;
};

export function AddAdminEmailField({
  form,
  fieldId,
  disabled,
}: AddAdminEmailFieldProps) {
  return (
    <form.Field
      name="email"
      validators={{
        onBlur: ({ value }) =>
          validateAddAdminField(addAdminFormSchema.shape.email, value),
        onSubmit: ({ value }) =>
          validateAddAdminField(addAdminFormSchema.shape.email, value),
      }}
    >
      {(field) => (
        <div className="flex flex-col gap-1.5">
          <label htmlFor={fieldId} className="text-sm font-medium">
            Email
          </label>
          <TextInput
            id={fieldId}
            type="email"
            value={field.state.value}
            onChange={(event) => field.handleChange(event.target.value)}
            onBlur={field.handleBlur}
            placeholder="Masukkan email admin"
            autoComplete="email"
            startItem={<Icon icon="material-symbols:mail-outline-rounded" />}
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
