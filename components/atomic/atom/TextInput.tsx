import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "@/util/cn";

const textInputVariants = cva(
  "flex items-center gap-3 rounded-2xl border border-input bg-input-surface px-4 transition-shadow duration-150 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1",
  {
    variants: {
      size: {
        sm: "min-h-11 text-sm",
        md: "min-h-12 text-sm",
        lg: "min-h-14 text-base",
      },
      fullWidth: {
        true: "w-full",
        false: "w-fit",
      },
    },
    defaultVariants: {
      size: "md",
      fullWidth: true,
    },
  },
);

const textInputSlotVariants = cva(
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

export type TextInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> &
  VariantProps<typeof textInputVariants> & {
    startItem?: ReactNode;
    endItem?: ReactNode;
    containerProps?: HTMLAttributes<HTMLDivElement>;
  };

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      size,
      fullWidth,
      startItem,
      endItem,
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
          textInputVariants({ size, fullWidth }),
          props.disabled && "cursor-not-allowed opacity-60",
          containerClassName,
        )}
      >
        {startItem ? (
          <span className={textInputSlotVariants({ size })}>{startItem}</span>
        ) : null}

        <input
          ref={ref}
          className={cn(
            "w-full border-none bg-transparent py-3 text-foreground outline-none placeholder:text-input-placeholder disabled:cursor-not-allowed",
            className,
          )}
          {...props}
        />

        {/* Keep extra JSX outside the input so the caret and typing behavior stay native. */}
        {endItem ? (
          <span className={textInputSlotVariants({ size })}>{endItem}</span>
        ) : null}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export { TextInput, textInputVariants };
