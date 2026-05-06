"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

import { APP_URL } from "@/constant";
import { useAuthStore } from "@/store/auth/auth.store";
import { useSidebarStore } from "@/store/sidebar-store";

interface UseLogoutOptions {
  redirectTo?: string;
}

export function useLogout({ redirectTo = APP_URL.LOGIN }: UseLogoutOptions = {}) {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const closeSidebar = useSidebarStore((state) => state.close);
  const [isLoggingOut, startLogoutTransition] = useTransition();

  useEffect(() => {
    // Warm the destination route so layout shell changes feel immediate after logout.
    router.prefetch(redirectTo);
  }, [redirectTo, router]);

  function logout() {
    startLogoutTransition(() => {
      // Close the sidebar before redirecting so mobile navigation state does not
      // leak into the next authenticated screen the user opens.
      closeSidebar();
      clearAuth();
      router.replace(redirectTo);
    });
  }

  return {
    logout,
    isLoggingOut,
  };
}
