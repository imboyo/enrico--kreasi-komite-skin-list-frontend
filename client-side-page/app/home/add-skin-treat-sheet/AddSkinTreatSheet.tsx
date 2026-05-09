"use client";

import { useEffect } from "react";
import { Icon } from "@iconify/react";

import { Button } from "@/components/atomic/atom/Button";
import { FormFieldError } from "@/components/atomic/atom/FormFieldError";
import { TextInput } from "@/components/atomic/atom/TextInput";
import { BottomSheet } from "@/components/atomic/molecule/BottomSheet";
import type { SkinTreatCategory } from "@/backend-service/user/skin-treat";

import {
  useAddSkinTreatForm,
  addSkinTreatSchema,
  validateAddSkinTreatField,
} from "./useAddSkinTreatForm";

interface AddSkinTreatSheetProps {
  open: boolean;
  category: SkinTreatCategory;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddSkinTreatSheet({
  open,
  category,
  onClose,
  onSuccess,
}: AddSkinTreatSheetProps) {
  const { form, isPending, serverError } = useAddSkinTreatForm({
    category,
    onSuccess,
  });

  // Reset form state every time the sheet closes so it's clean on next open
  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      panelClassName="h-auto max-h-[70dvh]"
    >
      {/* Header section */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <Button
          type="button"
          size="sm"
          variant="ghost"
          iconOnly
          onClick={onClose}
          className="rounded-full text-muted-foreground hover:bg-muted"
          aria-label="Tutup"
        >
          <Icon icon="lucide:x" className="size-4" />
        </Button>

        <h3 className="text-sm font-semibold text-foreground">
          Tambah Skin Treat
        </h3>
      </div>

      <div className="h-px bg-border" />

      {/* Form section */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void form.handleSubmit();
        }}
        className="flex flex-col gap-4 overflow-y-auto p-4"
      >
        <form.Field
          name="name"
          validators={{
            onBlur: ({ value }) =>
              validateAddSkinTreatField(addSkinTreatSchema.shape.name, value),
            onSubmit: ({ value }) =>
              validateAddSkinTreatField(addSkinTreatSchema.shape.name, value),
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="add-skin-treat-name"
                className="text-xs font-medium text-muted-foreground"
              >
                Nama
              </label>
              <TextInput
                id="add-skin-treat-name"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                placeholder="Masukkan nama"
                disabled={isPending}
              />
              <FormFieldError
                isTouched={field.state.meta.isTouched}
                error={field.state.meta.errors[0]}
              />
            </div>
          )}
        </form.Field>

        <form.Field
          name="description"
          validators={{
            onBlur: ({ value }) =>
              validateAddSkinTreatField(
                addSkinTreatSchema.shape.description,
                value,
              ),
            onSubmit: ({ value }) =>
              validateAddSkinTreatField(
                addSkinTreatSchema.shape.description,
                value,
              ),
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="add-skin-treat-description"
                className="text-xs font-medium text-muted-foreground"
              >
                Deskripsi{" "}
                <span className="text-muted-foreground/60">(opsional)</span>
              </label>
              {/* Textarea mirrors the shared input surface style */}
              <textarea
                id="add-skin-treat-description"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                placeholder="Masukkan deskripsi"
                rows={3}
                disabled={isPending}
                className="w-full rounded-2xl border border-input bg-input-surface px-4 py-3 text-sm text-foreground outline-none placeholder:text-input-placeholder focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <FormFieldError
                isTouched={field.state.meta.isTouched}
                error={field.state.meta.errors[0]}
              />
            </div>
          )}
        </form.Field>

        {serverError ? (
          <p className="text-sm text-destructive">{serverError}</p>
        ) : null}

        {/* Submit action section */}
        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            values: state.values,
          })}
        >
          {({ canSubmit, values }) => (
            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isPending}
              disabled={isPending || !canSubmit || !values.name.trim()}
            >
              Tambah Skin Treat
            </Button>
          )}
        </form.Subscribe>
      </form>
    </BottomSheet>
  );
}
