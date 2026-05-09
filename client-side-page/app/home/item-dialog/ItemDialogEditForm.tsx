"use client";

import { Button } from "@/components/atomic/atom/Button";
import { FormFieldError } from "@/components/atomic/atom/FormFieldError";
import { TextInput } from "@/components/atomic/atom/TextInput";
import {
  dashboardItemEditSchema,
  validateDashboardItemField,
} from "@/hooks/useDashboardItemEditForm";

import type { ItemDialogEditFormProps } from "./types";

export function ItemDialogEditForm({
  form,
  isPending,
  isDeleting = false,
  serverError,
  onSave,
  onCancel,
  onDelete,
}: ItemDialogEditFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void onSave();
      }}
      className="flex flex-col gap-5"
    >
      {/* Edit form fields section */}
      <div className="flex flex-col gap-4">
        <form.Field
          name="label"
          validators={{
            onBlur: ({ value }) =>
              validateDashboardItemField(
                dashboardItemEditSchema.shape.label,
                value,
              ),
            onSubmit: ({ value }) =>
              validateDashboardItemField(
                dashboardItemEditSchema.shape.label,
                value,
              ),
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="dashboard-item-title"
                className="text-xs font-medium text-dialog-current-muted"
              >
                Judul
              </label>
              <TextInput
                id="dashboard-item-title"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                placeholder="Masukkan judul"
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
              validateDashboardItemField(
                dashboardItemEditSchema.shape.description,
                value,
              ),
            onSubmit: ({ value }) =>
              validateDashboardItemField(
                dashboardItemEditSchema.shape.description,
                value,
              ),
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="dashboard-item-description"
                className="text-xs font-medium text-dialog-current-muted"
              >
                Deskripsi
              </label>
              {/* Match textarea styling with the project input surface while supporting multi-line content. */}
              <textarea
                id="dashboard-item-description"
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
      </div>

      {serverError ? (
        <p className="text-sm text-destructive">{serverError}</p>
      ) : null}

      {/* Edit action buttons section */}
      <div className="flex flex-col gap-2">
        <form.Subscribe
          selector={(formState) => ({
            canSubmit: formState.canSubmit,
            isValid: formState.isValid,
            values: formState.values,
            submissionAttempts: formState.submissionAttempts,
          })}
        >
          {({ canSubmit, isValid, values, submissionAttempts }) => (
            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isPending}
              disabled={
                isPending ||
                !canSubmit ||
                !values.label.trim() ||
                (!isValid && submissionAttempts > 0)
              }
            >
              Simpan Perubahan
            </Button>
          )}
        </form.Subscribe>

        <Button
          type="button"
          fullWidth
          size="lg"
          variant="secondary"
          onClick={onCancel}
          disabled={isPending}
        >
          Batal
        </Button>

        {/* Destructive delete action */}
        <Button
          type="button"
          fullWidth
          size="lg"
          variant="ghost"
          className="text-destructive hover:bg-destructive/5"
          onClick={onDelete}
          disabled={isPending}
          isLoading={isDeleting}
        >
          {isDeleting ? "Menghapus..." : "Hapus"}
        </Button>
      </div>
    </form>
  );
}
