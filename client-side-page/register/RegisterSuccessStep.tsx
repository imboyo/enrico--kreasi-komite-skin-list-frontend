import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/atomic/atom/Button";
import { APP_URL } from "@/constant";
import type { useRegisterFlow } from "@/hooks/useRegisterFlow";

type RegisterFlowState = ReturnType<typeof useRegisterFlow>;

type RegisterSuccessStepProps = Pick<RegisterFlowState, "registeredUser">;

export function RegisterSuccessStep({
  registeredUser,
}: RegisterSuccessStepProps) {
  const router = useRouter();

  return (
    <>
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/12 text-primary">
          <Icon
            icon="material-symbols:check-circle-outline-rounded"
            className="size-9"
          />
        </div>
        <h1 className="mb-1 text-2xl font-semibold leading-tight text-foreground">
          Registration complete
        </h1>
        <p className="text-sm text-muted-foreground">
          {registeredUser?.name} is ready to sign in with{" "}
          <strong>{registeredUser?.whatsappNumber}</strong>.
        </p>
      </div>

      <div className="flex w-full flex-col gap-4">
        <Button fullWidth size="lg" onClick={() => router.push(APP_URL.LOGIN)}>
          Go to Login Page
        </Button>

        <button
          type="button"
          className="text-sm font-medium text-primary hover:underline"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
    </>
  );
}
