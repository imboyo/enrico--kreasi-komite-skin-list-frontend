import { Icon } from "@iconify/react";

export function PasswordToggleButton({
  visible,
  onToggle,
}: {
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={visible ? "Hide password" : "Show password"}
      onClick={onToggle}
      className="text-input-placeholder transition-colors hover:text-foreground"
    >
      <Icon
        icon={
          visible
            ? "material-symbols:visibility-off-outline"
            : "material-symbols:visibility-outline"
        }
        className="size-5"
      />
    </button>
  );
}
