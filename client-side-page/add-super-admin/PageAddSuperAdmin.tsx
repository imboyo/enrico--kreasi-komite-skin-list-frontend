"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

import { addAdminAccount } from "@/backend-service/auth";
import { Button } from "@/components/atomic/atom/Button";
import { APP_URL } from "@/constant";
import { normalizeWhatsappNumber } from "libs/util/whatsapp-number";

import { LoginAvatar } from "@/client-side-page/login/LoginAvatar";

import {
  type AddSuperAdminFormApi,
  type AddSuperAdminFormValues,
} from "./add-super-admin.schema";
import { FullNameField } from "./FullNameField";
import { PasswordField } from "./PasswordField";
import { PhoneNumberField } from "./PhoneNumberField";
import { SecretKeyField } from "./SecretKeyField";

export function PageAddSuperAdmin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const addAdminMutation = useMutation({
    mutationFn: (payload: AddSuperAdminFormValues) =>
      addAdminAccount({
        super_admin_key: payload.secretKey,
        full_name: payload.fullName,
        phone_number: normalizeWhatsappNumber(payload.phoneNumber),
        password: payload.password,
      }),
    onSuccess: () => {
      form.reset();
      router.push(APP_URL.LOGIN);
    },
  });

  const form: AddSuperAdminFormApi = useForm({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      password: "",
      secretKey: "",
    },
    onSubmit: async ({ value }) => {
      addAdminMutation.mutate(value);
    },
  });

  const submitError = addAdminMutation.error
    ? addAdminMutation.error.message || "Terjadi kesalahan. Silakan coba lagi."
    : null;

  return (
    <main className="flex min-h-full flex-col items-center px-6 py-10">
      <LoginAvatar />

      <div className="w-full max-w-sm">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="mb-1 text-center text-2xl font-semibold leading-tight text-foreground">
            Tambah Super Admin
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            Buat akun admin baru dengan kunci rahasia
          </p>
        </div>

        {/* Add super admin form */}
        <form
          className="flex w-full flex-col gap-4"
          autoComplete="off"
          onSubmit={(event) => {
            event.preventDefault();
            void form.handleSubmit();
          }}
        >
          <FullNameField
            form={form}
            disabled={addAdminMutation.isPending}
          />

          <PhoneNumberField
            form={form}
            disabled={addAdminMutation.isPending}
          />

          <PasswordField
            form={form}
            showPassword={showPassword}
            onToggleShowPassword={() => setShowPassword((prev) => !prev)}
            disabled={addAdminMutation.isPending}
          />

          <SecretKeyField
            form={form}
            disabled={addAdminMutation.isPending}
          />

          {submitError && (
            <p className="text-sm text-destructive">{submitError}</p>
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
                !!values.fullName.trim() &&
                !!values.phoneNumber.trim() &&
                !!values.password.trim() &&
                !!values.secretKey.trim();

              return (
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  isLoading={addAdminMutation.isPending}
                  disabled={
                    addAdminMutation.isPending ||
                    (hasValues
                      ? !isValid && submissionAttempts > 0
                      : true)
                  }
                >
                  Buat Akun Admin
                </Button>
              );
            }}
          </form.Subscribe>

          <Button
            type="button"
            fullWidth
            size="lg"
            variant="outline"
            disabled={addAdminMutation.isPending}
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
