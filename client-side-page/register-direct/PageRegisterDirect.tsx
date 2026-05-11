"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

import { getProfile, registerDirect } from "@/backend-service";
import { Button } from "@/components/atomic/atom/Button";
import { APP_URL } from "@/constant";
import { useAuthStore } from "@/store/auth/auth.store";
import type { AccountRole } from "@/store/auth/auth.types";
import { normalizeWhatsappNumber } from "libs/util/whatsapp-number";

import { LoginAvatar } from "@/client-side-page/login/LoginAvatar";
import {
  type RegisterFormApi,
  type RegisterFormValues,
} from "@/hooks/useRegisterForm";

import { RegisterConfirmPasswordField } from "@/client-side-page/register/RegisterConfirmPasswordField";
import { RegisterNameField } from "@/client-side-page/register/RegisterNameField";
import { RegisterPasswordField } from "@/client-side-page/register/RegisterPasswordField";
import { RegisterWhatsappNumberField } from "@/client-side-page/register/RegisterWhatsappNumberField";

export function PageRegisterDirect() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getDashboardHref = (role: AccountRole) =>
    role === "ADMIN" ? APP_URL.ADMIN : APP_URL.APP;

  const registerMutation = useMutation({
    mutationFn: async (payload: RegisterFormValues) => {
      const tokens = await registerDirect({
        full_name: payload.name,
        phone_number: normalizeWhatsappNumber(payload.whatsappNumber),
        password: payload.password,
      });

      // Pass the fresh access token directly — the store isn't populated yet,
      // so fetcher would send the request without an Authorization header.
      const profile = await getProfile(tokens.access_token);

      return { tokens, profile };
    },
    onSuccess: ({ tokens, profile }) => {
      const role: AccountRole = profile.role === "ADMIN" ? "ADMIN" : "USER";

      // Persist tokens together with the fetched profile so local guards and
      // future screens can make role-based decisions without another lookup.
      setAuth(tokens.access_token, tokens.refresh_token, {
        uuid: profile.uuid,
        fullName: profile.full_name,
        photoProfile: profile.profile_photo?.uuid ?? null,
        role,
        email: profile.email,
        phoneNumber: profile.phone_number,
      });

      // Replace the register route after success so a successful auth lands on
      // the correct dashboard and does not keep the register page as the forward target.
      router.replace(getDashboardHref(role));
    },
  });

  const form: RegisterFormApi = useForm({
    defaultValues: {
      name: "",
      whatsappNumber: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      registerMutation.mutate(value);
    },
  });

  const registerError = registerMutation.error
    ? "Terjadi kesalahan. Silakan coba lagi."
    : null;

  return (
    <main className="flex min-h-full flex-col items-center px-6 py-10">
      <LoginAvatar />

      <div className="w-full max-w-sm">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="mb-1 text-center text-2xl font-semibold leading-tight text-foreground">
            Buat akun Anda
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            Bergabung ke Skin List dari Skin Committee
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Beta Testing Register — tanpa OTP
          </p>
        </div>

        {/* Register form */}
        <form
          className="flex w-full flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            void form.handleSubmit();
          }}
        >
          <RegisterNameField
            form={form}
            disabled={registerMutation.isPending}
          />

          <RegisterWhatsappNumberField
            form={form}
            disabled={registerMutation.isPending}
          />

          <RegisterPasswordField
            form={form}
            showPassword={showPassword}
            onToggleShowPassword={() => setShowPassword((prev) => !prev)}
            disabled={registerMutation.isPending}
          />

          <RegisterConfirmPasswordField
            form={form}
            showPassword={showConfirmPassword}
            onToggleShowPassword={() =>
              setShowConfirmPassword((prev) => !prev)
            }
            disabled={registerMutation.isPending}
          />

          {registerError && (
            <p className="text-sm text-destructive">{registerError}</p>
          )}

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
                !!values.whatsappNumber.trim() &&
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
                    (hasValues
                      ? !isValid && submissionAttempts > 0
                      : true)
                  }
                >
                  Daftar
                </Button>
              );
            }}
          </form.Subscribe>

          <Button
            type="button"
            fullWidth
            size="lg"
            variant="outline"
            disabled={registerMutation.isPending}
            onClick={() => router.back()}
          >
            Kembali
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link
              href={APP_URL.LOGIN}
              className="font-medium text-primary hover:underline"
            >
              Masuk
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
