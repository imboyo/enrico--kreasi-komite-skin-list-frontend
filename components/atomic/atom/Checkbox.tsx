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
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          // Use the app theme accent color so the native checkbox renders the primary orange instead of the browser default blue.
          "size-5 shrink-0 cursor-pointer rounded-md border border-input accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
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
