"use client";

import { Icon } from "@iconify/react";

import { Button } from "components/atomic/atom/Button";
import { useEditPasswordForm } from "./useEditPasswordForm";
import { EditPasswordField } from "./EditPasswordField";

export function EditPassword() {
  const {
    form,
    mutation,
    serverError,
    isSuccess,
    showCurrent,
    showNew,
    showConfirm,
    toggleShowCurrent,
    toggleShowNew,
    toggleShowConfirm,
  } = useEditPasswordForm();

  return (
    /* Password edit section */
    <section className="flex flex-col gap-4 rounded-2xl bg-card p-4 md:flex-row md:gap-8 md:p-6">
      {/* Section header: title + description */}
      <div className="flex flex-col gap-1 md:w-1/3">
        <div className="flex items-center gap-2">
          <Icon
            icon="material-symbols:lock-outline"
            className="text-lg text-primary"
          />
          <h2 className="text-base font-semibold">Kata Sandi</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Perbarui kata sandi untuk menjaga keamanan akun.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
        className="flex flex-col gap-3 md:w-2/3"
      >
        <EditPasswordField
          form={form}
          name="currentPassword"
          label="Kata Sandi Saat Ini"
          placeholder="Masukkan kata sandi saat ini"
          autoComplete="current-password"
          visible={showCurrent}
          onToggle={toggleShowCurrent}
          disabled={mutation.isPending}
          inputId="edit-current-password"
        />

        <EditPasswordField
          form={form}
          name="newPassword"
          label="Kata Sandi Baru"
          placeholder="Masukkan kata sandi baru"
          autoComplete="new-password"
          visible={showNew}
          onToggle={toggleShowNew}
          disabled={mutation.isPending}
          inputId="edit-new-password"
        />

        <EditPasswordField
          form={form}
          name="confirmPassword"
          label="Konfirmasi Kata Sandi Baru"
          placeholder="Masukkan ulang kata sandi baru"
          autoComplete="new-password"
          visible={showConfirm}
          onToggle={toggleShowConfirm}
          disabled={mutation.isPending}
          inputId="edit-confirm-password"
        />

        {serverError && (
          <p className="text-sm text-destructive">{serverError}</p>
        )}
        {isSuccess && (
          <p className="text-sm text-green-600">
            Kata sandi berhasil diperbarui.
          </p>
        )}

        <form.Subscribe
          selector={(s) => ({ isValid: s.isValid, values: s.values })}
        >
          {({ isValid, values }) => {
            const hasValues =
              !!values.currentPassword.trim() &&
              !!values.newPassword.trim() &&
              !!values.confirmPassword.trim();

            return (
              <Button
                type="submit"
                className="self-end"
                size="md"
                isLoading={mutation.isPending}
                disabled={
                  mutation.isPending ||
                  !hasValues ||
                  (!isValid && form.state.submissionAttempts > 0)
                }
              >
                Simpan Kata Sandi
              </Button>
            );
          }}
        </form.Subscribe>
      </form>
    </section>
  );
}
