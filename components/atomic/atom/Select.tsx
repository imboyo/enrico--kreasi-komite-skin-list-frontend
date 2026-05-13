"use client";

import { Icon } from "@iconify/react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";

import { cn } from "libs/util/cn";

const selectVariants = cva(
  "relative flex items-center gap-3 rounded-2xl border border-input px-4 transition-shadow duration-150 focus-within:ring-2 focus-within:ring-ring",
  {
    variants: {
      size: {
        sm: "min-h-11 text-sm",
        md: "min-h-12 text-sm",
        lg: "min-h-14 text-base",
      },
      surface: {
        default: "bg-input-surface",
        transparent: "bg-transparent",
      },
      fullWidth: {
        true: "w-full",
        false: "w-fit",
      },
    },
    defaultVariants: {
      size: "md",
      surface: "default",
      fullWidth: true,
    },
  },
);

const selectSlotVariants = cva(
  "flex shrink-0 items-center justify-center text-input-placeholder [&_svg]:size-5",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type SelectOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

export type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> &
  VariantProps<typeof selectVariants> & {
    startItem?: ReactNode;
    endItem?: ReactNode;
    options?: readonly SelectOption[];
    containerProps?: HTMLAttributes<HTMLDivElement>;
  };

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      size,
      surface,
      fullWidth,
      startItem,
      endItem,
      options,
      children,
      className,
      containerProps,
      ...props
    },
    ref,
  ) => {
    const { className: containerClassName, ...restContainerProps } =
      containerProps ?? {};

    return (
      <div
        {...restContainerProps}
        className={cn(
          selectVariants({ size, surface, fullWidth }),
          props.disabled && "cursor-not-allowed opacity-60",
          containerClassName,
        )}
      >
        {startItem ? (
          <span className={selectSlotVariants({ size })}>{startItem}</span>
        ) : null}

        <select
          ref={ref}
          className={cn(
            "w-full appearance-none border-none bg-transparent py-3 pr-8 text-foreground outline-none disabled:cursor-not-allowed",
            "text-sm placeholder:text-input-placeholder",
            className,
          )}
          {...props}
        >
          {options?.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
          {children}
        </select>

        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-input-placeholder",
            selectSlotVariants({ size }),
          )}
        >
          {endItem ?? <Icon icon="material-symbols:keyboard-arrow-down-rounded" />}
        </span>
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select, selectVariants };
