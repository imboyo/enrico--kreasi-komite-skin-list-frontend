"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/atomic/atom/Button";
import {
  login,
  InvalidCredentialsError,
  type LoginPayload,
} from "@/mock-backend/auth/login";
import { APP_URL } from "@/constant";

import { LoginAvatar } from "./LoginAvatar";
import { LoginHeading } from "./LoginHeading";
import { LoginEmailField } from "./LoginEmailField";
import { LoginPasswordField } from "./LoginPasswordField";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").pipe(z.email("Enter a valid email address")),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
});

// Runs a single zod field schema and returns the first error message or undefined.
function validateField<T>(schema: z.ZodType<T>, value: T): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export function PageLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) =>
      // Simulate a 1-second network delay so the loading state is visible.
      login(payload, { delayMs: 1000 }),
    onSuccess: () => {
      router.push(APP_URL.HOME);
    },
  });

  const form = useForm({
    defaultValues: { email: "", password: "" },
    onSubmit: async ({ value }) => {
      loginMutation.mutate(value);
    },
  });

  const serverError = loginMutation.error
    ? (loginMutation.error as unknown) instanceof InvalidCredentialsError
      ? loginMutation.error.message
      : "Something went wrong. Please try again."
    : null;

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
        <form.Field
          name="email"
          validators={{
            onBlur: ({ value }) =>
              validateField(loginSchema.shape.email, value),
            onSubmit: ({ value }) =>
              validateField(loginSchema.shape.email, value),
          }}
        >
          {(field) => (
            <LoginEmailField
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              disabled={loginMutation.isPending}
              error={field.state.meta.isTouched ? field.state.meta.errors[0] : null}
            />
          )}
        </form.Field>

        <form.Field
          name="password"
          validators={{
            onBlur: ({ value }) =>
              validateField(loginSchema.shape.password, value),
            onSubmit: ({ value }) =>
              validateField(loginSchema.shape.password, value),
          }}
        >
          {(field) => (
            <LoginPasswordField
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              showPassword={showPassword}
              onToggleShowPassword={() => setShowPassword((prev) => !prev)}
              disabled={loginMutation.isPending}
              error={field.state.meta.isTouched ? field.state.meta.errors[0] : null}
            />
          )}
        </form.Field>

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

        <form.Subscribe selector={(state) => [state.isValid, state.values]}>
          {([isValid, values]) => {
            // Disable the button if either field is empty (before any touch/validation).
            const hasValues =
              !!(values as { email: string; password: string }).email.trim() &&
              !!(values as { email: string; password: string }).password.trim();

            return (
              <Button
                type="submit"
                fullWidth
                size="lg"
                isLoading={loginMutation.isPending}
                disabled={loginMutation.isPending || (hasValues ? !isValid && form.state.submissionAttempts > 0 : true)}
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
