"use client";

import { useForm, type ReactFormExtendedApi, type FormValidateOrFn, type FormAsyncValidateOrFn } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";

import { updateName } from "@/mock-backend/user/profile/update-name";
import { MockServerDownError } from "@/mock-backend/utils/mock-control";

export const editNameSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type EditNameFormValues = z.infer<typeof editNameSchema>;

export type EditNameFormApi = ReactFormExtendedApi<
  EditNameFormValues,
  undefined | FormValidateOrFn<EditNameFormValues>,
  undefined | FormValidateOrFn<EditNameFormValues>,
  undefined | FormAsyncValidateOrFn<EditNameFormValues>,
  undefined | FormValidateOrFn<EditNameFormValues>,
  undefined | FormAsyncValidateOrFn<EditNameFormValues>,
  undefined | FormValidateOrFn<EditNameFormValues>,
  undefined | FormAsyncValidateOrFn<EditNameFormValues>,
  undefined | FormValidateOrFn<EditNameFormValues>,
  undefined | FormAsyncValidateOrFn<EditNameFormValues>,
  undefined | FormAsyncValidateOrFn<EditNameFormValues>,
  never
>;

export function validateEditNameField<T>(schema: z.ZodType<T>, value: T): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export function useEditNameForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: (payload: EditNameFormValues) => updateName(payload),
    onSuccess: () => setIsSuccess(true),
  });

  const form: EditNameFormApi = useForm({
    defaultValues: { name: "" },
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
  });

  const serverError = mutation.error
    ? mutation.error instanceof MockServerDownError
      ? "Server is unavailable. Please try again."
      : "Something went wrong. Please try again."
    : null;

  return { form, mutation, serverError, isSuccess };
}
