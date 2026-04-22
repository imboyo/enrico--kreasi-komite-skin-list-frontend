import { Icon } from "@iconify/react";

import { TextInput } from "@/components/atomic/atom/TextInput";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  showPassword: boolean;
  onToggleShowPassword: () => void;
  disabled: boolean;
  error?: string | null;
}

export function LoginPasswordField({
  value,
  onChange,
  onBlur,
  showPassword,
  onToggleShowPassword,
  disabled,
  error,
}: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="login-password"
        className="text-sm font-medium text-foreground"
      >
        Password
      </label>
      <TextInput
        id="login-password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        autoComplete="current-password"
        startItem={<Icon icon="material-symbols:lock-outline" />}
        endItem={
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={onToggleShowPassword}
            className="text-input-placeholder transition-colors hover:text-foreground"
          >
            <Icon
              icon={
                showPassword
                  ? "material-symbols:visibility-off-outline"
                  : "material-symbols:visibility-outline"
              }
              className="size-5"
            />
          </button>
        }
        disabled={disabled}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
