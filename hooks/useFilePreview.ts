"use client";

import { useEffect, useState } from "react";
import { streamFile } from "backend-service/file";

type FilePreviewResult = {
  url: string | null;
  isLoading: boolean;
  error: Error | null;
};

/**
 * Fetches a file by UUID from the authenticated file service and returns
 * a local blob URL safe for use in <img>, <video>, etc.
 * The blob URL is revoked automatically when the UUID changes or the
 * component unmounts, preventing memory leaks.
 */
export function useFilePreview(
  fileUuid: string | null | undefined,
): FilePreviewResult {
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!fileUuid) {
      setUrl(null);
      setError(null);
      return;
    }

    let objectUrl: string | null = null;
    let cancelled = false;

    setIsLoading(true);
    setError(null);
    setUrl(null);

    streamFile(fileUuid)
      .then((res) => res.blob())
      .then((blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setUrl(objectUrl);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
      // Revoke blob URL to prevent memory leaks when UUID changes or component unmounts
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [fileUuid]);

  return { url, isLoading, error };
}
