"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { APP_URL } from "@/constant";
import { login, type LoginPayload } from "@/mock-backend/auth/login";

export function useLoginMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      // Simulate a short delay so the loading state is visible during the mock request.
      login(payload, { delayMs: 1000 }),
    onSuccess: () => {
      router.push(APP_URL.HOME);
    },
  });
}
