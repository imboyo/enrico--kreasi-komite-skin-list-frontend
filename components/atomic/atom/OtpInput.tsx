import { Icon } from "@iconify/react";
import { forwardRef, type ChangeEvent } from "react";

import { TextInput, type TextInputProps } from "@/components/atomic/atom/TextInput";

export type OtpInputProps = TextInputProps;

const OtpInput = forwardRef<HTMLInputElement, OtpInputProps>(
  (
    {
      type = "text",
      inputMode = "numeric",
      maxLength = 6,
      placeholder = "Enter 6-digit OTP",
      autoComplete = "one-time-code",
      startItem = <Icon icon="material-symbols:pin-outline" />,
      onChange,
      ...props
    },
    ref,
  ) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      // Keep OTP values numeric while preserving the normal input onChange API.
      event.target.value = event.target.value.replace(/\D/g, "");
      onChange?.(event);
    };

    return (
      <TextInput
        ref={ref}
        type={type}
        inputMode={inputMode}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
        startItem={startItem}
        onChange={handleChange}
        {...props}
      />
    );
  },
);

OtpInput.displayName = "OtpInput";

export { OtpInput };
