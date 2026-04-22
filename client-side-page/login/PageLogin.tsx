"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/atomic/atom/Button";
import { useLoginForm } from "@/hooks/useLoginForm";

import { LoginAvatar } from "./LoginAvatar";
import { LoginHeading } from "./LoginHeading";
import { LoginEmailField } from "./LoginEmailField";
import { LoginPasswordField } from "./LoginPasswordField";

export function PageLogin() {
  const router = useRouter();
  const { form, loginMutation, serverError, showPassword, toggleShowPassword } =
    useLoginForm();

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-10">
      <LoginAvatar />
      <LoginHeading />

      <form
        className="flex w-full flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
      >
        <LoginEmailField form={form} disabled={loginMutation.isPending} />

        <LoginPasswordField
          form={form}
          showPassword={showPassword}
          onToggleShowPassword={toggleShowPassword}
          disabled={loginMutation.isPending}
        />

        {serverError && (
          <p className="text-sm text-destructive">{serverError}</p>
        )}

        <div className="flex justify-end">
          <Link
            href="#"
            className="text-sm font-medium text-primary hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

        <form.Subscribe
          selector={(state) => ({
            isValid: state.isValid,
            values: state.values,
          })}
        >
          {({ isValid, values }) => {
            // Disable the button if either field is empty (before any touch/validation).
            const hasValues = !!values.email.trim() && !!values.password.trim();

            return (
              <Button
                type="submit"
                fullWidth
                size="lg"
                isLoading={loginMutation.isPending}
                disabled={
                  loginMutation.isPending ||
                  (hasValues
                    ? !isValid && form.state.submissionAttempts > 0
                    : true)
                }
              >
                Continue
              </Button>
            );
          }}
        </form.Subscribe>

        <Button
          fullWidth
          size="lg"
          variant="outline"
          disabled={loginMutation.isPending}
          onClick={() => router.back()}
        >
          Back
        </Button>
      </form>
    </main>
  );
}
