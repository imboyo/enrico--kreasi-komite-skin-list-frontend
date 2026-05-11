"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

import { getProfile, login } from "@/backend-service";
import { Button } from "@/components/atomic/atom/Button";
import { APP_URL } from "@/constant";
import { useAuthStore } from "@/store/auth/auth.store";
import type { AccountRole } from "@/store/auth/auth.types";
import { normalizeWhatsappNumber } from "libs/util/whatsapp-number";

import { LoginAvatar } from "@/client-side-page/login/LoginAvatar";
import { LoginHeading } from "@/client-side-page/login/LoginHeading";
import { LoginPasswordField } from "@/client-side-page/login/LoginPasswordField";
import { LoginWhatsappNumberField } from "@/client-side-page/login/LoginWhatsappNumberField";
import { type LoginFormApi, type LoginFormValues } from "@/client-side-page/login/login-form.schema";

export function PageLoginDirect() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [showPassword, setShowPassword] = useState(false);

  const getDashboardHref = (role: AccountRole) =>
    role === "ADMIN" ? APP_URL.ADMIN : APP_URL.APP;

  const loginMutation = useMutation({
    mutationFn: async (payload: LoginFormValues) => {
      const tokens = await login({
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

      // Replace the login route after success so a successful auth lands on
      // the correct dashboard and does not keep the login page as the forward target.
      router.replace(getDashboardHref(role));
    },
  });

  const form: LoginFormApi = useForm({
    defaultValues: { whatsappNumber: "", password: "" },
    onSubmit: async ({ value }) => {
      loginMutation.mutate(value);
    },
  });

  const loginError = loginMutation.error
    ? loginMutation.error.message || "Terjadi kesalahan. Silakan coba lagi."
    : null;

  return (
    <main className="flex min-h-full flex-col items-center px-6 py-10">
      <LoginAvatar />
      <div className="w-full max-w-sm">
        {/* Heading */}
        <div className="mb-6 text-center">
          <LoginHeading />
          <p className="text-xs text-muted-foreground">
            Beta Testing Login — tanpa OTP
          </p>
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
            disabled={loginMutation.isPending}
          />

          <LoginPasswordField
            form={form}
            showPassword={showPassword}
            onToggleShowPassword={() => setShowPassword((prev) => !prev)}
            disabled={loginMutation.isPending}
          />

          {loginError && (
            <p className="text-sm text-destructive">{loginError}</p>
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
                !!values.whatsappNumber.trim() && !!values.password.trim();

              return (
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  isLoading={loginMutation.isPending}
                  disabled={
                    loginMutation.isPending ||
                    // Keep the button disabled until credentials have content, then respect validation state.
                    (hasValues ? !isValid && submissionAttempts > 0 : true)
                  }
                >
                  Masuk
                </Button>
              );
            }}
          </form.Subscribe>

          <Button
            type="button"
            fullWidth
            size="lg"
            variant="outline"
            disabled={loginMutation.isPending}
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
      </div>
    </main>
  );
}
