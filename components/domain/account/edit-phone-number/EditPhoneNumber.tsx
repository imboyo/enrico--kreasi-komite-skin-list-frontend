"use client";

import { Icon } from "@iconify/react";

import { useEditPhoneNumberFlow } from "./useEditPhoneNumberFlow";
import { OtpStep } from "./OtpStep";
import { PhoneStep } from "./PhoneStep";

export function EditPhoneNumber() {
  const flow = useEditPhoneNumberFlow();

  return (
    /* Phone number change section */
    <section className="flex flex-col gap-4 rounded-2xl bg-card p-4 md:flex-row md:gap-8 md:p-6">
      {/* Section header: title + description */}
      <div className="flex flex-col gap-1 md:w-1/3">
        <div className="flex items-center gap-2">
          <Icon
            icon="ri:whatsapp-line"
            className="text-lg text-primary"
          />
          <h2 className="text-base font-semibold">Nomor WhatsApp</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Ubah nomor WhatsApp yang terhubung dengan akun.
        </p>
      </div>

      <div className="md:w-2/3">
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
      </div>
    </section>
  );
}
