"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { APP_URL } from "@/constant";
import { register, type RegisterPayload } from "@/mock-backend/auth/register";

export function useRegisterMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterPayload) =>
      // Keep the same mock delay profile as login so loading states feel consistent.
      register(payload, { delayMs: 1000 }),
    onSuccess: () => {
      router.push(APP_URL.LOGIN);
    },
  });
}
