"use client";

import { Icon } from "@iconify/react";

import { Button } from "@/components/atomic/atom/Button";
import { FormFieldError } from "@/components/atomic/atom/FormFieldError";
import { TextInput } from "@/components/atomic/atom/TextInput";
import {
  editNameSchema,
  useEditNameForm,
  validateEditNameField,
} from "./useEditNameForm";

export function EditNameSection() {
  const { form, mutation, serverError, isSuccess } = useEditNameForm();

  return (
    /* Name edit section */
    <section className="flex flex-col gap-4 rounded-2xl bg-card p-4">
      <h2 className="text-base font-semibold">Name</h2>

      {/* Name edit form section */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
        className="flex flex-col gap-3"
      >
        <form.Field
          name="name"
          validators={{
            onBlur: ({ value }) =>
              validateEditNameField(editNameSchema.shape.name, value),
            onSubmit: ({ value }) =>
              validateEditNameField(editNameSchema.shape.name, value),
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="edit-name"
                className="text-sm font-medium text-foreground"
              >
                Full Name
              </label>
              <TextInput
                id="edit-name"
                type="text"
                placeholder="Enter your name"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                autoComplete="name"
                startItem={
                  <Icon icon="material-symbols:person-outline-rounded" />
                }
                disabled={mutation.isPending}
                surface="transparent"
              />
              <FormFieldError
                isTouched={field.state.meta.isTouched}
                error={field.state.meta.errors[0]}
              />
            </div>
          )}
        </form.Field>

        {serverError && (
          <p className="text-sm text-destructive">{serverError}</p>
        )}
        {isSuccess && (
          <p className="text-sm text-green-600">Name updated successfully.</p>
        )}

        <form.Subscribe
          selector={(s) => ({ isValid: s.isValid, values: s.values })}
        >
          {({ isValid, values }) => (
            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={mutation.isPending}
              disabled={
                mutation.isPending ||
                !values.name.trim() ||
                (!isValid && form.state.submissionAttempts > 0)
              }
            >
              Save Name
            </Button>
          )}
        </form.Subscribe>
      </form>
    </section>
  );
}
