"use client";

import { useEditPhoneNumberFlow } from "client-side-page/app/profile/info/useEditPhoneNumberFlow";
import { OtpStep } from "./OtpStep";
import { PhoneStep } from "./PhoneStep";

export function EditPhoneNumber() {
  const flow = useEditPhoneNumberFlow();

  return (
    /* Phone number change section */
    <section className="flex flex-col gap-4 rounded-2xl bg-card p-4">
      <h2 className="text-base font-semibold">Phone Number</h2>

      {/* Step 1: enter new phone number */}
      {flow.step === "phone" && (
        <PhoneStep
          phoneForm={flow.phoneForm}
          initiateMutation={flow.initiateMutation}
          initiateError={flow.initiateError}
          isSuccess={flow.isSuccess}
          validatePhoneField={flow.validatePhoneField}
        />
      )}

      {/* Step 2: enter OTP sent to the new number */}
      {flow.step === "otp" && (
        <OtpStep
          otpForm={flow.otpForm}
          verifyMutation={flow.verifyMutation}
          verifyError={flow.verifyError}
          pendingPhone={flow.pendingPhone}
          validateOtpField={flow.validateOtpField}
          backToPhone={flow.backToPhone}
        />
      )}
    </section>
  );
}
