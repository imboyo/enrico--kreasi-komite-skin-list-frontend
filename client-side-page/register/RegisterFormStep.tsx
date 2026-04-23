import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/atomic/atom/Button";
import { APP_URL } from "@/constant";
import type { useRegisterFlow } from "@/hooks/useRegisterFlow";

import { RegisterConfirmPasswordField } from "./RegisterConfirmPasswordField";
import { RegisterEmailField } from "./RegisterEmailField";
import { RegisterHeading } from "./RegisterHeading";
import { RegisterNameField } from "./RegisterNameField";
import { RegisterPasswordField } from "./RegisterPasswordField";

type RegisterFlowState = ReturnType<typeof useRegisterFlow>;

type RegisterFormStepProps = Pick<
  RegisterFlowState,
  | "form"
  | "registerMutation"
  | "registerError"
  | "showPassword"
  | "showConfirmPassword"
  | "toggleShowPassword"
  | "toggleShowConfirmPassword"
>;

export function RegisterFormStep({
  form,
  registerMutation,
  registerError,
  showPassword,
  showConfirmPassword,
  toggleShowPassword,
  toggleShowConfirmPassword,
}: RegisterFormStepProps) {
  const router = useRouter();

  return (
    <>
      <div className="mb-6 text-center">
        <RegisterHeading />
      </div>

      <form
        className="flex w-full flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          void form.handleSubmit();
        }}
      >
        <RegisterNameField form={form} disabled={registerMutation.isPending} />

        <RegisterEmailField form={form} disabled={registerMutation.isPending} />

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
