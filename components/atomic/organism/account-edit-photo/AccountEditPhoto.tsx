"use client";

import { EditableAvatar } from "@/components/atomic/molecule/editable-avatar/EditableAvatar";

const AVATAR_SIZE = 96;

export function AccountEditPhoto() {
  return (
    /* Photo profile edit section */
    <section className="flex flex-col items-center gap-4 rounded-2xl bg-card p-6">
      <h2 className="text-base font-semibold">Foto Profil</h2>
      <EditableAvatar enableProfilePhotoUpload size={AVATAR_SIZE} />
    </section>
  );
}
