"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

import { loginChain } from "@/backend-service/auth/login-chain.service";
import { Button } from "@/components/atomic/atom/Button";
import { APP_URL } from "@/constant";
import { normalizeWhatsappNumber } from "libs/util/whatsapp-number";

import { LoginHeading } from "./LoginHeading";
import { LoginPasswordField } from "./LoginPasswordField";
import { LoginWhatsappNumberField } from "./LoginWhatsappNumberField";
import { type LoginFormApi, type LoginFormValues } from "./login-form.schema";

type LoginFormStepProps = {
  onLoginChainSuccess: (values: LoginFormValues) => void;
};

export function LoginFormStep({ onLoginChainSuccess }: LoginFormStepProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const loginChainMutation = useMutation({
    mutationFn: (payload: LoginFormValues) =>
      loginChain({
        phone_number: normalizeWhatsappNumber(payload.whatsappNumber),
        password: payload.password,
      }),
    onSuccess: (_, payload) => {
      form.reset();
      onLoginChainSuccess(payload);
    },
  });

  const form: LoginFormApi = useForm({
    defaultValues: { whatsappNumber: "", password: "" },
    onSubmit: async ({ value }) => {
      loginChainMutation.mutate(value);
    },
  });

  const loginError = loginChainMutation.error
    ? loginChainMutation.error.message ||
      "Terjadi kesalahan. Silakan coba lagi."
    : null;

  return (
    <>
      {/* Heading */}
      <div className="mb-6 text-center">
        <LoginHeading />
      </div>

      {/* Login form */}
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          void form.handleSubmit();
        }}
      >
        <LoginWhatsappNumberField
          form={form}
          disabled={loginChainMutation.isPending}
        />

        <LoginPasswordField
          form={form}
          showPassword={showPassword}
          onToggleShowPassword={() => setShowPassword((prev) => !prev)}
          disabled={loginChainMutation.isPending}
        />

        {loginError && <p className="text-sm text-destructive">{loginError}</p>}

        <form.Subscribe
          selector={(state) => ({
            isValid: state.isValid,
            values: state.values,
            submissionAttempts: state.submissionAttempts,
          })}
        >
          {({ isValid, values, submissionAttempts }) => {
            const hasValues =
              !!values.whatsappNumber.trim() && !!values.password.trim();

            return (
              <Button
                type="submit"
                fullWidth
                size="lg"
                isLoading={loginChainMutation.isPending}
                disabled={
                  loginChainMutation.isPending ||
                  // Keep the button disabled until credentials have content, then respect validation state.
                  (hasValues ? !isValid && submissionAttempts > 0 : true)
                }
              >
                Lanjutkan
              </Button>
            );
          }}
        </form.Subscribe>

        <Button
          type="button"
          fullWidth
          size="lg"
          variant="outline"
          disabled={loginChainMutation.isPending}
          onClick={() => router.back()}
        >
          Kembali
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Belum punya akun?{" "}
          <Link
            href={APP_URL.REGISTER}
            className="font-medium text-primary hover:underline"
          >
            Daftar
          </Link>
        </p>

        <Link
          href={APP_URL.FORGOT_PASSWORD}
          className="text-center text-sm font-medium text-primary hover:underline"
        >
          Lupa kata sandi?
        </Link>
      </form>
    </>
  );
}
