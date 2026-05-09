import { Icon } from "@iconify/react";

export function EditPhoneNumberSuccessIndicator() {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2.5 text-sm text-green-700 dark:bg-green-950/30 dark:text-green-400">
      <Icon
        icon="material-symbols:check-circle-outline-rounded"
        className="shrink-0 text-base"
      />
      Nomor WhatsApp berhasil diperbarui.
    </div>
  );
}
