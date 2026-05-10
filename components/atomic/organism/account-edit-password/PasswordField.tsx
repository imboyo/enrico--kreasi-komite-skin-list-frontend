import { Icon } from "@iconify/react";
import type { ReactNode } from "react";
import type {
  DeepKeys,
  DeepValue,
  FormAsyncValidateOrFn,
  FormValidateOrFn,
  ReactFormExtendedApi,
} from "@tanstack/react-form";

import { FormFieldError } from "@/components/atomic/atom/FormFieldError";
import { PasswordToggleButton } from "@/components/atomic/atom/PasswordToggleButton";
import { TextInput } from "@/components/atomic/atom/TextInput";

type SharedPasswordFieldFormApi<TFormValues extends Record<string, unknown>> =
  ReactFormExtendedApi<
    TFormValues,
    undefined | FormValidateOrFn<TFormValues>,
    undefined | FormValidateOrFn<TFormValues>,
    undefined | FormAsyncValidateOrFn<TFormValues>,
    undefined | FormValidateOrFn<TFormValues>,
    undefined | FormAsyncValidateOrFn<TFormValues>,
    undefined | FormValidateOrFn<TFormValues>,
    undefined | FormAsyncValidateOrFn<TFormValues>,
    undefined | FormValidateOrFn<TFormValues>,
    undefined | FormAsyncValidateOrFn<TFormValues>,
    undefined | FormAsyncValidateOrFn<TFormValues>,
    never
  >;

type StringFieldName<TFormValues extends Record<string, unknown>> = {
  [TFieldName in DeepKeys<TFormValues>]: DeepValue<
    TFormValues,
    TFieldName
  > extends string
    ? TFieldName
    : never;
}[DeepKeys<TFormValues>];

interface PasswordFieldProps<
  TFormValues extends Record<string, unknown>,
  TFieldName extends StringFieldName<TFormValues>,
> {
  form: SharedPasswordFieldFormApi<TFormValues>;
  name: TFieldName;
  label: string;
  placeholder: string;
  autoComplete: string;
  visible: boolean;
  onToggle: () => void;
  disabled: boolean;
  inputId: string;
  helperText?: ReactNode;
  validate: (value: DeepValue<TFormValues, TFieldName>) => string | undefined;
}

export function PasswordField<
  TFormValues extends Record<string, unknown>,
  TFieldName extends StringFieldName<TFormValues>,
>({
  form,
  name,
  label,
  placeholder,
  autoComplete,
  visible,
  onToggle,
  disabled,
  inputId,
  helperText,
  validate,
}: PasswordFieldProps<TFormValues, TFieldName>) {
  return (
    <form.Field
      name={name}
      validators={{
        // Reuse the caller's field-level validator so each form keeps its own schema.
        onBlur: ({ value }) => validate(value),
        onSubmit: ({ value }) => validate(value),
      }}
    >
      {(field) => (
        /* Shared password input field */
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
          <TextInput
            id={inputId}
            type={visible ? "text" : "password"}
            placeholder={placeholder}
            /* StringFieldName guarantees this field is a string. */
            value={field.state.value as string}
            onChange={(event) =>
              field.handleChange(
                event.target.value as DeepValue<TFormValues, TFieldName>,
              )
            }
            onBlur={field.handleBlur}
            autoComplete={autoComplete}
            startItem={<Icon icon="material-symbols:lock-outline" />}
            endItem={
              <PasswordToggleButton visible={visible} onToggle={onToggle} />
            }
            disabled={disabled}
            surface="transparent"
          />
          {helperText}
          <FormFieldError
            isTouched={field.state.meta.isTouched}
            error={field.state.meta.errors[0]}
          />
        </div>
      )}
    </form.Field>
  );
}
