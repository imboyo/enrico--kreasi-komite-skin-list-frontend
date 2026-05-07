"use client";

import { Icon } from "@iconify/react";

import { Button } from "@/components/atomic/atom/Button";
import { FormFieldError } from "@/components/atomic/atom/FormFieldError";
import { TextInput } from "@/components/atomic/atom/TextInput";
import {
  editPasswordSchema,
  useEditPasswordForm,
  validateEditPasswordField,
} from "./useEditPasswordForm";

function PasswordToggleButton({
  visible,
  onToggle,
}: {
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={visible ? "Hide password" : "Show password"}
      onClick={onToggle}
      className="text-input-placeholder transition-colors hover:text-foreground"
    >
      <Icon
        icon={
          visible
            ? "material-symbols:visibility-off-outline"
            : "material-symbols:visibility-outline"
        }
        className="size-5"
      />
    </button>
  );
}

export function EditPasswordSection() {
  const {
    form,
    mutation,
    serverError,
    isSuccess,
    showCurrent,
    showNew,
    showConfirm,
    toggleShowCurrent,
    toggleShowNew,
    toggleShowConfirm,
  } = useEditPasswordForm();

  return (
    <section className="flex flex-col gap-4 rounded-2xl bg-card p-4">
      <h2 className="text-base font-semibold">Password</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
        className="flex flex-col gap-3"
      >
        {/* Current password */}
        <form.Field
          name="currentPassword"
          validators={{
            onBlur: ({ value }) =>
              validateEditPasswordField(
                editPasswordSchema.shape.currentPassword,
                value,
              ),
            onSubmit: ({ value }) =>
              validateEditPasswordField(
                editPasswordSchema.shape.currentPassword,
                value,
              ),
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="edit-current-password"
                className="text-sm font-medium text-foreground"
              >
                Current Password
              </label>
              <TextInput
                id="edit-current-password"
                type={showCurrent ? "text" : "password"}
                placeholder="Enter current password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                autoComplete="current-password"
                startItem={<Icon icon="material-symbols:lock-outline" />}
                endItem={
                  <PasswordToggleButton
                    visible={showCurrent}
                    onToggle={toggleShowCurrent}
                  />
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

        {/* New password */}
        <form.Field
          name="newPassword"
          validators={{
            onBlur: ({ value }) =>
              validateEditPasswordField(
                editPasswordSchema.shape.newPassword,
                value,
              ),
            onSubmit: ({ value }) =>
              validateEditPasswordField(
                editPasswordSchema.shape.newPassword,
                value,
              ),
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="edit-new-password"
                className="text-sm font-medium text-foreground"
              >
                New Password
              </label>
              <TextInput
                id="edit-new-password"
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                autoComplete="new-password"
                startItem={<Icon icon="material-symbols:lock-outline" />}
                endItem={
                  <PasswordToggleButton
                    visible={showNew}
                    onToggle={toggleShowNew}
                  />
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

        {/* Confirm new password */}
        <form.Field
          name="confirmPassword"
          validators={{
            onBlur: ({ value }) =>
              validateEditPasswordField(
                editPasswordSchema.shape.confirmPassword,
                value,
              ),
            onSubmit: ({ value }) =>
              validateEditPasswordField(
                editPasswordSchema.shape.confirmPassword,
                value,
              ),
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="edit-confirm-password"
                className="text-sm font-medium text-foreground"
              >
                Confirm New Password
              </label>
              <TextInput
                id="edit-confirm-password"
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter new password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                autoComplete="new-password"
                startItem={<Icon icon="material-symbols:lock-outline" />}
                endItem={
                  <PasswordToggleButton
                    visible={showConfirm}
                    onToggle={toggleShowConfirm}
                  />
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
          <p className="text-sm text-green-600">
            Password updated successfully.
          </p>
        )}

        <form.Subscribe
          selector={(s) => ({ isValid: s.isValid, values: s.values })}
        >
          {({ isValid, values }) => {
            const hasValues =
              !!values.currentPassword.trim() &&
              !!values.newPassword.trim() &&
              !!values.confirmPassword.trim();

            return (
              <Button
                type="submit"
                fullWidth
                size="lg"
                isLoading={mutation.isPending}
                disabled={
                  mutation.isPending ||
                  !hasValues ||
                  (!isValid && form.state.submissionAttempts > 0)
                }
              >
                Save Password
              </Button>
            );
          }}
        </form.Subscribe>
      </form>
    </section>
  );
}
