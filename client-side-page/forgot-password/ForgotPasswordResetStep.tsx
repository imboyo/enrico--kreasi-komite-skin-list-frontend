import { Icon } from "@iconify/react";

import { Button } from "@/components/atomic/atom/Button";
import { FormFieldError } from "@/components/atomic/atom/FormFieldError";
import { TextInput } from "@/components/atomic/atom/TextInput";
import {
  forgotPasswordResetSchema,
  type useForgotPasswordFlow,
} from "@/hooks/useForgotPasswordFlow";
import { validateRegisterField } from "@/hooks/useRegisterForm";

type ForgotPasswordFlowState = ReturnType<typeof useForgotPasswordFlow>;

type Props = Pick<
  ForgotPasswordFlowState,
  | "resetForm"
  | "resetPasswordMutation"
  | "resetPasswordError"
  | "showNewPassword"
  | "showConfirmPassword"
  | "toggleShowNewPassword"
  | "toggleShowConfirmPassword"
  | "backToOtp"
>;

export function ForgotPasswordResetStep({
  resetForm,
  resetPasswordMutation,
  resetPasswordError,
  showNewPassword,
  showConfirmPassword,
  toggleShowNewPassword,
  toggleShowConfirmPassword,
  backToOtp,
}: Props) {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="mb-1 text-2xl font-semibold leading-tight text-foreground">
          Reset password
        </h1>
        <p className="text-sm text-muted-foreground">
          Create a new password for your account.
        </p>
      </div>

      <form
        className="flex w-full flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          void resetForm.handleSubmit();
        }}
      >
        {/* New password field */}
        <resetForm.Field
          name="newPassword"
          validators={{
            onBlur: ({ value }) =>
              validateRegisterField(forgotPasswordResetSchema.shape.newPassword, value),
            onSubmit: ({ value }) =>
              validateRegisterField(forgotPasswordResetSchema.shape.newPassword, value),
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="forgot-password-new-password"
                className="text-sm font-medium text-foreground"
              >
                New Password
              </label>
              <TextInput
                id="forgot-password-new-password"
                type={showNewPassword ? "text" : "password"}
                placeholder="Create new password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                autoComplete="new-password"
                startItem={<Icon icon="material-symbols:lock-outline" />}
                endItem={
                  <button
                    type="button"
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                    onClick={toggleShowNewPassword}
                    className="text-input-placeholder transition-colors hover:text-foreground"
                  >
                    <Icon
                      icon={
                        showNewPassword
                          ? "material-symbols:visibility-off-outline"
                          : "material-symbols:visibility-outline"
                      }
                      className="size-5"
                    />
                  </button>
                }
                disabled={resetPasswordMutation.isPending}
                surface="transparent"
              />
              <FormFieldError
                isTouched={field.state.meta.isTouched}
                error={field.state.meta.errors[0]}
              />
            </div>
          )}
        </resetForm.Field>

        {/* Confirm password with cross-field validation against newPassword */}
        <resetForm.Field
          name="confirmPassword"
          validators={{
            onChangeListenTo: ["newPassword"],
            onBlur: ({ value, fieldApi }) => {
              if (!value) return "Please confirm your password";
              return value === fieldApi.form.getFieldValue("newPassword")
                ? undefined
                : "Passwords do not match";
            },
            onChange: ({ value, fieldApi }) => {
              if (!value) return undefined;
              return value === fieldApi.form.getFieldValue("newPassword")
                ? undefined
                : "Passwords do not match";
            },
            onSubmit: ({ value, fieldApi }) =>
              value === fieldApi.form.getFieldValue("newPassword")
                ? undefined
                : "Passwords do not match",
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="forgot-password-confirm-password"
                className="text-sm font-medium text-foreground"
              >
                Confirm Password
              </label>
              <TextInput
                id="forgot-password-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter new password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                autoComplete="new-password"
                startItem={<Icon icon="material-symbols:lock-outline" />}
                endItem={
                  <button
                    type="button"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    onClick={toggleShowConfirmPassword}
                    className="text-input-placeholder transition-colors hover:text-foreground"
                  >
                    <Icon
                      icon={
                        showConfirmPassword
                          ? "material-symbols:visibility-off-outline"
                          : "material-symbols:visibility-outline"
                      }
                      className="size-5"
                    />
                  </button>
                }
                disabled={resetPasswordMutation.isPending}
                surface="transparent"
              />
              <FormFieldError
                isTouched={field.state.meta.isTouched}
                error={field.state.meta.errors[0]}
              />
            </div>
          )}
        </resetForm.Field>

        {resetPasswordError && (
          <p className="text-sm text-destructive">{resetPasswordError}</p>
        )}

        <resetForm.Subscribe
          selector={(state) => ({
            isValid: state.isValid,
            values: state.values,
            submissionAttempts: state.submissionAttempts,
          })}
        >
          {({ isValid, values, submissionAttempts }) => {
            const hasValues =
              !!values.newPassword.trim() && !!values.confirmPassword.trim();

            return (
              <Button
                type="submit"
                fullWidth
                size="lg"
                isLoading={resetPasswordMutation.isPending}
                disabled={
                  resetPasswordMutation.isPending ||
                  (hasValues ? !isValid && submissionAttempts > 0 : true)
                }
              >
                Reset Password
              </Button>
            );
          }}
        </resetForm.Subscribe>

        <Button
          type="button"
          fullWidth
          size="lg"
          variant="outline"
          disabled={resetPasswordMutation.isPending}
          onClick={backToOtp}
        >
          Back
        </Button>
      </form>
    </>
  );
}
