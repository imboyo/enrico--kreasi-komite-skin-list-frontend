"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { register } from "@/backend-service/auth";
import { APP_URL } from "@/constant";

export type RegisterMutationPayload = {
  name: string;
  whatsappNumber: string;
  password: string;
};

export function useRegisterMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterMutationPayload) =>
      // Translate the register form shape into the backend contract expected by the auth service.
      register({
        full_name: payload.name,
        phone_number: payload.whatsappNumber,
        password: payload.password,
      }),
    onSuccess: () => {
      router.push(APP_URL.LOGIN);
    },
  });
}
