"use client";

import { Button } from "components/atomic/atom/Button";
import { useEditPasswordForm } from "client-side-page/app/profile/info/useEditPasswordForm";
import { EditPasswordField } from "./EditPasswordField";

export function EditPassword() {
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
        <EditPasswordField
          form={form}
          name="currentPassword"
          label="Current Password"
          placeholder="Enter current password"
          autoComplete="current-password"
          visible={showCurrent}
          onToggle={toggleShowCurrent}
          disabled={mutation.isPending}
          inputId="edit-current-password"
        />

        <EditPasswordField
          form={form}
          name="newPassword"
          label="New Password"
          placeholder="Enter new password"
          autoComplete="new-password"
          visible={showNew}
          onToggle={toggleShowNew}
          disabled={mutation.isPending}
          inputId="edit-new-password"
        />

        <EditPasswordField
          form={form}
          name="confirmPassword"
          label="Confirm New Password"
          placeholder="Re-enter new password"
          autoComplete="new-password"
          visible={showConfirm}
          onToggle={toggleShowConfirm}
          disabled={mutation.isPending}
          inputId="edit-confirm-password"
        />

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
