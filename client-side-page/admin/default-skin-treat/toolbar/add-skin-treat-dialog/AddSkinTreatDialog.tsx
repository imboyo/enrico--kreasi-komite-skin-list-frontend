"use client";

import { Icon } from "@iconify/react";
import { useId } from "react";

import { Button } from "components/atomic/atom/Button";
import { FormFieldError } from "components/atomic/atom/FormFieldError";
import { TextInput } from "components/atomic/atom/TextInput";
import BaseDialog, {
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "components/atomic/molecule/Dialog";

import {
  addSkinTreatFormSchema,
  useAddSkinTreatForm,
  validateAddSkinTreatField,
} from "./useAddSkinTreatForm";
import type { AdminDefaultSkinTreatCategoryId } from "../../utils/defaultSkinTreatCategory";

type AddSkinTreatDialogProps = {
  open: boolean;
  category: AdminDefaultSkinTreatCategoryId;
  categoryLabel: string;
  onOpenChange: (open: boolean) => void;
};

export function AddSkinTreatDialog({
  open,
  category,
  categoryLabel,
  onOpenChange,
}: Readonly<AddSkinTreatDialogProps>) {
  const formId = useId();
  const { form, isPending, resetForm, serverError } = useAddSkinTreatForm({
    category,
    categoryLabel,
    onSuccess: () => {
      resetForm();
      onOpenChange(false);
    },
  });

  function handleDialogOpenChange(nextOpen: boolean) {
    // Reset stale field state only after the dialog is actually closing.
    if (!nextOpen && !isPending) {
      resetForm();
    }

    onOpenChange(nextOpen);
  }

  return (
    <BaseDialog
      open={open}
      onOpenChange={handleDialogOpenChange}
      surface="dialog-2"
    >
      {/* Section: Add skin treat dialog header */}
      <DialogHeader className="items-start">
        <div className="flex flex-col gap-1">
          <DialogTitle>{`Tambah ${categoryLabel}`}</DialogTitle>
          <DialogDescription>
            {`Buat data skin treat baru untuk kategori ${categoryLabel.toLowerCase()}.`}
          </DialogDescription>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          iconOnly
          aria-label={`Tutup formulir tambah ${categoryLabel.toLowerCase()}`}
          onClick={() => handleDialogOpenChange(false)}
          disabled={isPending}
        >
          <Icon icon="material-symbols:close-rounded" />
        </Button>
      </DialogHeader>

      {/* Section: Add skin treat form */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void form.handleSubmit();
        }}
      >
        <DialogBody className="flex flex-col gap-4">
          {/* Section: Skin treat name field */}
          <form.Field
            name="name"
            validators={{
              onBlur: ({ value }) =>
                validateAddSkinTreatField(
                  addSkinTreatFormSchema.shape.name,
                  value,
                ),
              onSubmit: ({ value }) =>
                validateAddSkinTreatField(
                  addSkinTreatFormSchema.shape.name,
                  value,
                ),
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor={`${formId}-name`}
                  className="text-xs font-medium text-dialog-current-muted"
                >
                  Nama
                </label>
                <TextInput
                  id={`${formId}-name`}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder={`Masukkan nama ${categoryLabel.toLowerCase()}`}
                  disabled={isPending}
                />
                <FormFieldError
                  isTouched={field.state.meta.isTouched}
                  error={field.state.meta.errors[0]}
                />
              </div>
            )}
          </form.Field>

          {/* Section: Skin treat description field */}
          <form.Field
            name="description"
            validators={{
              onBlur: ({ value }) =>
                validateAddSkinTreatField(
                  addSkinTreatFormSchema.shape.description,
                  value,
                ),
              onSubmit: ({ value }) =>
                validateAddSkinTreatField(
                  addSkinTreatFormSchema.shape.description,
                  value,
                ),
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor={`${formId}-description`}
                  className="text-xs font-medium text-dialog-current-muted"
                >
                  Deskripsi{" "}
                  <span className="text-dialog-current-muted/70">
                    (opsional)
                  </span>
                </label>
                {/* Keep the textarea styling aligned with the edit dialog for a consistent form surface. */}
                <textarea
                  id={`${formId}-description`}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Masukkan deskripsi"
                  rows={4}
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
        </DialogBody>

        {/* Section: Add skin treat form actions */}
        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={() => handleDialogOpenChange(false)}
            disabled={isPending}
          >
            Batal
          </Button>

          <form.Subscribe
            selector={(state) => ({
              canSubmit: state.canSubmit,
              values: state.values,
            })}
          >
            {({ canSubmit, values }) => (
              <Button
                type="submit"
                size="md"
                isLoading={isPending}
                disabled={isPending || !canSubmit || !values.name.trim()}
              >
                {`Tambah ${categoryLabel}`}
              </Button>
            )}
          </form.Subscribe>
        </DialogFooter>
      </form>
    </BaseDialog>
  );
}
