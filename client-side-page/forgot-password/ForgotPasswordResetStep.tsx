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
          Atur ulang kata sandi
        </h1>
        <p className="text-sm text-muted-foreground">
          Buat kata sandi baru untuk akun Anda.
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
                Kata Sandi Baru
              </label>
              <TextInput
                id="forgot-password-new-password"
                type={showNewPassword ? "text" : "password"}
                placeholder="Buat kata sandi baru"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                autoComplete="new-password"
                startItem={<Icon icon="material-symbols:lock-outline" />}
                endItem={
                  <button
                    type="button"
                    aria-label={
                      showNewPassword
                        ? "Sembunyikan kata sandi"
                        : "Tampilkan kata sandi"
                    }
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
              if (!value) return "Mohon konfirmasi kata sandi Anda";
              return value === fieldApi.form.getFieldValue("newPassword")
                ? undefined
                : "Konfirmasi kata sandi tidak cocok";
            },
            onChange: ({ value, fieldApi }) => {
              if (!value) return undefined;
              return value === fieldApi.form.getFieldValue("newPassword")
                ? undefined
                : "Konfirmasi kata sandi tidak cocok";
            },
            onSubmit: ({ value, fieldApi }) =>
              value === fieldApi.form.getFieldValue("newPassword")
                ? undefined
                : "Konfirmasi kata sandi tidak cocok",
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="forgot-password-confirm-password"
                className="text-sm font-medium text-foreground"
              >
                Konfirmasi Kata Sandi
              </label>
              <TextInput
                id="forgot-password-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Masukkan ulang kata sandi baru"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                autoComplete="new-password"
                startItem={<Icon icon="material-symbols:lock-outline" />}
                endItem={
                  <button
                    type="button"
                    aria-label={
                      showConfirmPassword
                        ? "Sembunyikan kata sandi"
                        : "Tampilkan kata sandi"
                    }
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
                Atur Ulang Kata Sandi
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
          Kembali
        </Button>
      </form>
    </>
  );
}
