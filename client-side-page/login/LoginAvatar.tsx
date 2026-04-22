import { Icon } from "@iconify/react";

export function LoginAvatar() {
  return (
    <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-primary/10">
      <Icon
        icon="material-symbols:person-rounded"
        className="size-10 text-primary"
      />
    </div>
  );
}
