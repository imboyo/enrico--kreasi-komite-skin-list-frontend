import { Icon } from "@iconify/react";

import { TextInput } from "@/components/atomic/atom/TextInput";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled: boolean;
  error?: string | null;
}

export function LoginEmailField({ value, onChange, onBlur, disabled, error }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="login-email"
        className="text-sm font-medium text-foreground"
      >
        Email
      </label>
      <TextInput
        id="login-email"
        type="email"
        placeholder="Enter your email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        autoComplete="email"
        startItem={<Icon icon="material-symbols:mail-outline-rounded" />}
        disabled={disabled}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
