import { Icon } from "@iconify/react";
import React from "react";

interface AvatarEditTriggerProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

// Camera button that opens the file picker, plus its hidden <input>.
export function AvatarEditTrigger({ fileInputRef, onChange, onClick }: AvatarEditTriggerProps) {
  return (
    <>
      {/* Edit trigger button */}
      <button
        onClick={onClick}
        className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-zinc-900 text-white transition-transform hover:scale-105 active:scale-95"
        aria-label="Ubah foto profil"
        type="button"
      >
        <Icon icon="mdi:camera" width={20} height={20} />
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={onChange}
      />
    </>
  );
}
