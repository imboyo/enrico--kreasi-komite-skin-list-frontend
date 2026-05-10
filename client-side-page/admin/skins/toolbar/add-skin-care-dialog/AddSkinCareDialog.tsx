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

import { useAddSkinCareForm, addSkinCareFormSchema, validateAddSkinCareField } from "./useAddSkinCareForm";
import type { AdminSkinCategoryId } from "../../utils/skinCategory";

type AddSkinCareDialogProps = {
  open: boolean;
  category: AdminSkinCategoryId;
  categoryLabel: string;
  onOpenChange: (open: boolean) => void;
};

export function AddSkinCareDialog({
  open,
  category,
  categoryLabel,
  onOpenChange,
}: AddSkinCareDialogProps) {
  const formId = useId();
  const { form, isPending, resetForm, serverError } = useAddSkinCareForm({
    category,
    categoryLabel,
    onSuccess: () => {
      resetForm();
      onOpenChange(false);
    },
  });

  function handleDialogOpenChange(nextOpen: boolean) {
    // Reset stale form state only after the dialog is truly closing.
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
      {/* Section: Add skin care dialog header */}
      <DialogHeader className="items-start">
        <div className="flex flex-col gap-1">
          <DialogTitle>{`Tambah ${categoryLabel}`}</DialogTitle>
          <DialogDescription>
            {`Buat data skin care baru untuk kategori ${categoryLabel.toLowerCase()}.`}
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

      {/* Section: Add skin care form */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void form.handleSubmit();
        }}
      >
        <DialogBody className="flex flex-col gap-4">
          {/* Section: Skin care name field */}
          <form.Field
            name="name"
            validators={{
              onBlur: ({ value }) =>
                validateAddSkinCareField(addSkinCareFormSchema.shape.name, value),
              onSubmit: ({ value }) =>
                validateAddSkinCareField(addSkinCareFormSchema.shape.name, value),
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

          {/* Section: Skin care description field */}
          <form.Field
            name="description"
            validators={{
              onBlur: ({ value }) =>
                validateAddSkinCareField(
                  addSkinCareFormSchema.shape.description,
                  value,
                ),
              onSubmit: ({ value }) =>
                validateAddSkinCareField(
                  addSkinCareFormSchema.shape.description,
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
                {/* Match the dialog field styling while keeping multiline input readable. */}
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

        {/* Section: Add skin care form actions */}
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
