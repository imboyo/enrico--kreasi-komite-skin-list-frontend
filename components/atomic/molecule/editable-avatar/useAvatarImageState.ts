import { useState } from "react";

// Tracks whether the <img> element has finished decoding so we can fade it in.
export function useAvatarImageState(imageUrl: string | null, isImageLoading: boolean) {
  const [loadedImageUrl, setLoadedImageUrl] = useState<string | null>(null);

  const shouldShowImage = Boolean(imageUrl);
  const isImageReady = shouldShowImage && loadedImageUrl === imageUrl;
  const shouldShowLoading = isImageLoading || (shouldShowImage && !isImageReady);

  // Call this from both onLoad and onError so the overlay always clears
  function onImageSettled() {
    setLoadedImageUrl(imageUrl);
  }

  return { shouldShowImage, shouldShowLoading, onImageSettled };
}
