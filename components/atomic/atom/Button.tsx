import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Icon } from "@iconify/react";

const buttonVariants = cva(
  // Base styles shared by all variants
  "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70",
        accent2:
          "bg-[#E9E9E9] text-[#363536] hover:bg-[#DDDDDD] active:bg-[#D1D1D1]",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-muted active:bg-muted/80",
        ghost:
          "bg-transparent text-foreground hover:bg-muted active:bg-muted/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80",
        accent:
          "bg-accent text-accent-foreground hover:bg-accent/80 active:bg-accent/70",
        muted:
          "bg-muted text-muted-foreground hover:bg-muted/80 active:bg-muted/70",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        md: "h-10 px-4 text-sm rounded-lg",
        lg: "h-12 px-6 text-base rounded-xl",
      },
      // icon-only button: square, no horizontal padding
      iconOnly: {
        true: "px-0 aspect-square",
        false: "",
      },
      // full-width stretch
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    compoundVariants: [
      // icon-only size overrides to keep it square
      { iconOnly: true, size: "sm", class: "w-8" },
      { iconOnly: true, size: "md", class: "w-10" },
      { iconOnly: true, size: "lg", class: "w-12" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      iconOnly: false,
      fullWidth: false,
    },
  },
);

const iconSlotVariants = cva(
  "shrink-0 inline-flex items-center justify-center [&>*]:h-full [&>*]:w-full",
  {
    variants: {
      size: {
        sm: "size-5",
        md: "size-5",
        lg: "size-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    /** Icon rendered before the label */
    leadingIcon?: ReactNode;
    /** Icon rendered after the label */
    trailingIcon?: ReactNode;
    /** Shows a spinner and disables the button while true */
    isLoading?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      iconOnly,
      fullWidth,
      leadingIcon,
      trailingIcon,
      isLoading,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const showLeadingSlot = isLoading || Boolean(leadingIcon);
    const showTrailingSlot = !isLoading && Boolean(trailingIcon);
    const leadingSlotContent = isLoading ? (
      <Icon icon="svg-spinners:ring-resize" />
    ) : (
      leadingIcon
    );

    // Reserve the opposite icon slot when only one side is populated so the
    // text label stays visually centered inside the button.
    const reserveLeadingSlot = !showLeadingSlot && showTrailingSlot;
    const reserveTrailingSlot = showLeadingSlot && !showTrailingSlot;
    const leadingSlotClassName = reserveLeadingSlot ? "invisible" : "";
    const trailingSlotClassName = reserveTrailingSlot ? "invisible" : "";

    return (
      <button
        ref={ref}
        className={buttonVariants({
          variant,
          size,
          iconOnly,
          fullWidth,
          className,
        })}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Spinner replaces the leading icon slot while loading */}
        {!iconOnly && (showLeadingSlot || reserveLeadingSlot) ? (
          <span
            aria-hidden={reserveLeadingSlot}
            className={iconSlotVariants({
              size,
              className: leadingSlotClassName,
            })}
          >
            {reserveLeadingSlot ? trailingIcon : leadingSlotContent}
          </span>
        ) : null}
        {/* Render children only when not icon-only to avoid layout issues */}
        {!iconOnly ? (
          <span className="inline-flex min-w-0 items-center text-center leading-none">
            {children}
          </span>
        ) : null}
        {!iconOnly && (showTrailingSlot || reserveTrailingSlot) ? (
          <span
            aria-hidden={reserveTrailingSlot}
            className={iconSlotVariants({
              size,
              className: trailingSlotClassName,
            })}
          >
            {reserveTrailingSlot ? leadingSlotContent : trailingIcon}
          </span>
        ) : null}
        {/* For icon-only, children act as the icon itself */}
        {iconOnly && (
          <span className={iconSlotVariants({ size })}>{children}</span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
