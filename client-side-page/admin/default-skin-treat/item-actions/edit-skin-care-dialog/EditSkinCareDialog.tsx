"use client";

import { Icon } from "@iconify/react";
import { useId } from "react";

import type { AdminDefaultSkinCare } from "backend-service/admin/default-skin-care";
import { Button } from "components/atomic/atom/Button";
import { FormFieldError } from "components/atomic/atom/FormFieldError";
import { TextInput } from "components/atomic/atom/TextInput";
import Dialog, {
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "components/atomic/molecule/Dialog";

import {
  useEditSkinCareForm,
  editSkinCareFormSchema,
  validateEditSkinCareField,
} from "./useEditSkinCareForm";

type EditSkinCareDialogProps = {
  item: AdminDefaultSkinCare;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditSkinCareDialog({
  item,
  open,
  onOpenChange,
}: EditSkinCareDialogProps) {
  const formId = useId();
  const { form, isPending, serverError, resetForm } = useEditSkinCareForm(item);

  function handleDialogOpenChange(nextOpen: boolean) {
    // Reset only after the mutation is idle so the dialog does not clear during submission.
    if (!nextOpen && !isPending) {
      resetForm();
    }
    onOpenChange(nextOpen);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleDialogOpenChange}
      surface="dialog-2"
    >
      {/* Section: Edit skin care dialog header */}
      <DialogHeader className="items-start">
        <div className="flex flex-col gap-1">
          <DialogTitle>Ubah skin care</DialogTitle>
          <DialogDescription>
            Perbarui nama dan deskripsi skin care tanpa mengubah kategorinya.
          </DialogDescription>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          iconOnly
          aria-label={`Tutup formulir ubah ${item.name}`}
          onClick={() => handleDialogOpenChange(false)}
          disabled={isPending}
        >
          <Icon icon="material-symbols:close-rounded" />
        </Button>
      </DialogHeader>

      {/* Section: Edit skin care form */}
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
                validateEditSkinCareField(
                  editSkinCareFormSchema.shape.name,
                  value,
                ),
              onSubmit: ({ value }) =>
                validateEditSkinCareField(
                  editSkinCareFormSchema.shape.name,
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
                  placeholder="Masukkan nama skin care"
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
                validateEditSkinCareField(
                  editSkinCareFormSchema.shape.description,
                  value,
                ),
              onSubmit: ({ value }) =>
                validateEditSkinCareField(
                  editSkinCareFormSchema.shape.description,
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
                {/* Keep the textarea styles aligned with the add form so both dialogs feel consistent. */}
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

        {/* Section: Edit skin care form actions */}
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
                Simpan perubahan
              </Button>
            )}
          </form.Subscribe>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
