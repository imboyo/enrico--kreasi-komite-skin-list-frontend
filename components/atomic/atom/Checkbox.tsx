import {
  forwardRef,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "@/util/cn";

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label?: ReactNode;
  labelClassName?: string;
  wrapperProps?: LabelHTMLAttributes<HTMLLabelElement>;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, labelClassName, wrapperProps, ...props }, ref) => {
    const { className: wrapperClassName, ...restWrapperProps } =
      wrapperProps ?? {};
    const checkboxInput = (
      <span className="relative inline-flex size-5 shrink-0">
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            // Render the checkmark as a real SVG overlay instead of a CSS data URI
            // so the checked indicator stays visible across browsers.
            "peer size-full cursor-pointer appearance-none rounded-md border border-[#999] bg-transparent checked:border-secondary checked:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        />
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 m-auto hidden size-3.5 text-white peer-checked:block"
        >
          <path
            d="M3 8l3.5 3.5L13 4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );

    if (!label) {
      return checkboxInput;
    }

    return (
      <label
        {...restWrapperProps}
        className={cn(
          "inline-flex items-center gap-2 text-sm text-muted-foreground",
          props.disabled && "cursor-not-allowed opacity-70",
          wrapperClassName,
        )}
      >
        {checkboxInput}
        <span className={cn("leading-none", labelClassName)}>{label}</span>
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
