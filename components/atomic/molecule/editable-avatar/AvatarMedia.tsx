import { Icon } from "@iconify/react";
import { cn } from "libs/util/cn";

interface AvatarMediaProps {
  size: number;
  imageUrl: string | null;
  shouldShowImage: boolean;
  shouldShowLoading: boolean;
  onImageSettled: () => void;
}

// The circular avatar — shows the image (with fade-in), a placeholder icon, or a loading overlay.
export function AvatarMedia({
  size,
  imageUrl,
  shouldShowImage,
  shouldShowLoading,
  onImageSettled,
}: AvatarMediaProps) {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden rounded-full border-4 border-background bg-zinc-200"
      style={{ width: size, height: size }}
    >
      {/* Avatar image or placeholder icon */}
      {shouldShowImage ? (
        // Blob URLs from the file-preview hook are local, so a plain <img> is fine here
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={imageUrl ?? ""}
          alt="Avatar Profil"
          className={cn(
            "h-full w-full object-cover transition-opacity duration-300",
            shouldShowLoading ? "opacity-0" : "opacity-100",
          )}
          onLoad={onImageSettled}
          onError={onImageSettled}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-zinc-400">
          <Icon icon="mdi:account" width={size / 2} height={size / 2} />
        </div>
      )}

      {/* Loading overlay while fetching blob or waiting for image decode */}
      {shouldShowLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/70 backdrop-blur-[1px]">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-zinc-600 shadow-sm">
            <Icon icon="mdi:loading" width={22} height={22} className="animate-spin" />
          </span>
          <span className="text-center text-[11px] font-medium text-zinc-500">Memuat foto...</span>
        </div>
      )}
    </div>
  );
}
