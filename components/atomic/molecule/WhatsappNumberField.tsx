import { Icon } from "@iconify/react";

import { FormFieldError } from "@/components/atomic/atom/FormFieldError";
import { Popover } from "@/components/atomic/atom/Popover";
import { TextInput } from "@/components/atomic/atom/TextInput";
import {
  sanitizeWhatsappNumberInput,
  WHATSAPP_MAX_LENGTH,
} from "libs/util/whatsapp-number";

// Slim structural interface — matches TanStack Form's FieldApi render-prop value.
interface WhatsappFieldSlim {
  state: {
    value: string;
    meta: { isTouched: boolean; errors: (string | undefined)[] };
  };
  handleChange: (value: string) => void;
  handleBlur: () => void;
}

interface Props {
  field: WhatsappFieldSlim;
  inputId: string;
  disabled: boolean;
}

function NumberFormatHint() {
  return (
    <div className="-mx-3 -my-2 flex flex-col gap-1 rounded-lg border border-border bg-popover px-3 py-2 text-popover-foreground">
      <p className="font-semibold">Accepted formats:</p>
      <ul className="list-disc pl-3 space-y-0.5 text-popover-foreground/80">
        <li>
          Local: <span className="font-mono text-popover-foreground">08XXXXXXXXXX</span>
        </li>
        <li>
          Without prefix:{" "}
          <span className="font-mono text-popover-foreground">8XXXXXXXXXX</span>
        </li>
        <li>
          International:{" "}
          <span className="font-mono text-popover-foreground">628XXXXXXXXXX</span>
        </li>
      </ul>
      <p className="mt-1 text-popover-foreground/60">
        Numbers only, no spaces or dashes.
      </p>
    </div>
  );
}

export function WhatsappNumberField({ field, inputId, disabled }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground"
        >
          WhatsApp Number
        </label>

        {/* Info popover: tells the user which number formats are accepted */}
        <Popover
          trigger={
            <button
              type="button"
              aria-label="WhatsApp number format help"
              className="text-foreground/50 hover:text-foreground transition-colors"
            >
              <Icon icon="ri:information-line" className="text-base" />
            </button>
          }
          side="bottom"
        >
          <NumberFormatHint />
        </Popover>
      </div>

      <TextInput
        id={inputId}
        type="text"
        placeholder="e.g. 08123456789"
        value={field.state.value}
        onChange={(e) => {
          // Store only digits in form state so pasted formatting never bypasses the field rule.
          field.handleChange(sanitizeWhatsappNumberInput(e.target.value));
        }}
        onBlur={field.handleBlur}
        autoComplete="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={WHATSAPP_MAX_LENGTH}
        startItem={<Icon icon="ri:whatsapp-line" />}
        disabled={disabled}
        surface="transparent"
      />

      <FormFieldError
        isTouched={field.state.meta.isTouched}
        error={field.state.meta.errors[0]}
      />
    </div>
  );
}
