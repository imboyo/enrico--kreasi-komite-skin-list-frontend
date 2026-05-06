import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/atomic/atom/Button";
import { APP_URL } from "@/constant";
import { register } from "@/backend-service/auth/register.service";
import { normalizeWhatsappNumber } from "libs/util/whatsapp-number";
import {
  type RegisterFormApi,
  type RegisterFormValues,
} from "@/hooks/useRegisterForm";

import { RegisterConfirmPasswordField } from "./RegisterConfirmPasswordField";
import { RegisterHeading } from "./RegisterHeading";
import { RegisterNameField } from "./RegisterNameField";
import { RegisterPasswordField } from "./RegisterPasswordField";
import { RegisterWhatsappNumberField } from "./RegisterWhatsappNumberField";

type RegisterFormStepProps = {
  onRegisterSuccess: (values: RegisterFormValues) => void;
};

export function RegisterFormStep({ onRegisterSuccess }: RegisterFormStepProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterFormValues) =>
      register({
        full_name: payload.name,
        phone_number: normalizeWhatsappNumber(payload.whatsappNumber),
        password: payload.password,
      }),
    onSuccess: (_, payload) => {
      form.reset();
      onRegisterSuccess(payload);
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
    ? "Something went wrong. Please try again."
    : null;

  return (
    <>
      {/* Heading */}
      <div className="mb-6 text-center">
        <RegisterHeading />
      </div>

      {/* Register form */}
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          void form.handleSubmit();
        }}
      >
        <RegisterNameField form={form} disabled={registerMutation.isPending} />

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
          onToggleShowPassword={() => setShowConfirmPassword((prev) => !prev)}
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
                  // Keep the button disabled until all fields have content, then respect validation state.
                  (hasValues ? !isValid && submissionAttempts > 0 : true)
                }
              >
                Continue
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
          Back
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href={APP_URL.LOGIN}
            className="font-medium text-primary hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </>
  );
}
