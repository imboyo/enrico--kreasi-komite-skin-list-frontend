"use client";

import { useEffect } from "react";

export default function PWARegistrationProvider() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    // Register once at the app root so every route shares the same worker lifecycle.
    void navigator.serviceWorker
      .register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      })
      .catch((error) => {
        console.error("Service worker registration failed", error);
      });
  }, []);

  return null;
}
