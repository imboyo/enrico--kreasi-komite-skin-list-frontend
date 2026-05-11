"use client";

import { useRef, useState } from "react";
import { Icon } from "@iconify/react";

import { FormFieldError } from "@/components/atomic/atom/FormFieldError";
import { PasswordToggleButton } from "@/components/atomic/atom/PasswordToggleButton";
import { TextInput } from "@/components/atomic/atom/TextInput";

import {
  addSuperAdminSchema,
  type AddSuperAdminFormApi,
  validateAddSuperAdminField,
} from "./add-super-admin.schema";

interface Props {
  form: AddSuperAdminFormApi;
  disabled: boolean;
}

/**
 * Secret key input that prevents browser password managers from saving the value.
 *
 * Strategy:
 * 1. autoComplete="off" on both form and input level.
 * 2. readOnly on mount; removed on focus so password managers don't detect
 *    the field as a writable password input on initial render.
 * 3. type="password" with a manual visibility toggle for masking.
 * 4. Non-standard name/id to avoid heuristics based on common field names.
 */
export function SecretKeyField({ form, disabled }: Props) {
  const [showKey, setShowKey] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    const el = inputRef.current;
    if (el && el.hasAttribute("readonly")) {
      el.removeAttribute("readonly");
    }
  };

  return (
    <form.Field
      name="secretKey"
      validators={{
        onBlur: ({ value }) =>
          validateAddSuperAdminField(addSuperAdminSchema.shape.secretKey, value),
        onSubmit: ({ value }) =>
          validateAddSuperAdminField(addSuperAdminSchema.shape.secretKey, value),
      }}
    >
      {(field) => (
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="super-admin-secret-key"
            className="text-sm font-medium text-foreground"
          >
            Kunci Rahasia
          </label>
          <TextInput
            ref={inputRef}
            id="super-admin-secret-key"
            name="super_admin_secret_key_unsaved"
            type={showKey ? "text" : "password"}
            placeholder="Masukkan kunci rahasia"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            onFocus={handleFocus}
            readOnly
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            startItem={<Icon icon="material-symbols:key-outline" />}
            endItem={
              <PasswordToggleButton
                visible={showKey}
                onToggle={() => setShowKey((prev) => !prev)}
              />
            }
            disabled={disabled}
            surface="transparent"
          />
          <FormFieldError
            isTouched={field.state.meta.isTouched}
            error={field.state.meta.errors[0]}
          />
        </div>
      )}
    </form.Field>
  );
}
