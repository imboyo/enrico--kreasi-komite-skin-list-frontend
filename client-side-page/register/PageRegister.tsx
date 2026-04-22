"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/atomic/atom/Button";
import { APP_URL } from "@/constant";
import { useRegisterForm } from "@/hooks/useRegisterForm";

import { LoginAvatar } from "../login/LoginAvatar";
import { RegisterConfirmPasswordField } from "./RegisterConfirmPasswordField";
import { RegisterEmailField } from "./RegisterEmailField";
import { RegisterHeading } from "./RegisterHeading";
import { RegisterNameField } from "./RegisterNameField";
import { RegisterPasswordField } from "./RegisterPasswordField";

export function PageRegister() {
  const router = useRouter();
  const {
    form,
    registerMutation,
    serverError,
    showPassword,
    showConfirmPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
  } = useRegisterForm();

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-10">
      <LoginAvatar />
      <RegisterHeading />

      <form
        className="flex w-full flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
      >
        <RegisterNameField
          form={form}
          disabled={registerMutation.isPending}
        />

        <RegisterEmailField
          form={form}
          disabled={registerMutation.isPending}
        />

        <RegisterPasswordField
          form={form}
          showPassword={showPassword}
          onToggleShowPassword={toggleShowPassword}
          disabled={registerMutation.isPending}
        />

        <RegisterConfirmPasswordField
          form={form}
          showPassword={showConfirmPassword}
          onToggleShowPassword={toggleShowConfirmPassword}
          disabled={registerMutation.isPending}
        />

        {serverError && (
          <p className="text-sm text-destructive">{serverError}</p>
        )}

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href={APP_URL.LOGIN} className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>

        <form.Subscribe
          selector={(state) => ({
            isValid: state.isValid,
            values: state.values,
            submissionAttempts: state.submissionAttempts,
          })}
        >
          {({ isValid, values, submissionAttempts }) => {
            const hasValues =
              !!values.name.trim() &&
              !!values.email.trim() &&
              !!values.password.trim() &&
              !!values.confirmPassword.trim();

            return (
              <Button
                type="submit"
                fullWidth
                size="lg"
                isLoading={registerMutation.isPending}
                disabled={
                  registerMutation.isPending ||
                  (hasValues ? !isValid && submissionAttempts > 0 : true)
                }
              >
                Register
              </Button>
            );
          }}
        </form.Subscribe>

        <Button
          fullWidth
          size="lg"
          variant="outline"
          disabled={registerMutation.isPending}
          onClick={() => router.back()}
        >
          Back
        </Button>
      </form>
    </main>
  );
}
