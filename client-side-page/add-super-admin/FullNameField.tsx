import { Icon } from "@iconify/react";

import { FormFieldError } from "@/components/atomic/atom/FormFieldError";
import { TextInput } from "@/components/atomic/atom/TextInput";

import {
  addSuperAdminSchema,
  type AddSuperAdminFormApi,
  validateAddSuperAdminField,
} from "./add-super-admin.schema";

interface Props {
  form: AddSuperAdminFormApi;
  disabled: boolean;
}

export function FullNameField({ form, disabled }: Props) {
  return (
    <form.Field
      name="fullName"
      validators={{
        onBlur: ({ value }) =>
          validateAddSuperAdminField(addSuperAdminSchema.shape.fullName, value),
        onSubmit: ({ value }) =>
          validateAddSuperAdminField(addSuperAdminSchema.shape.fullName, value),
      }}
    >
      {(field) => (
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="super-admin-full-name"
            className="text-sm font-medium text-foreground"
          >
            Nama Lengkap
          </label>
          <TextInput
            id="super-admin-full-name"
            placeholder="Masukkan nama lengkap"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            autoComplete="name"
            startItem={<Icon icon="material-symbols:person-outline" />}
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
