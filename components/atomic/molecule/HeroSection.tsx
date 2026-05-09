"use client";

import { ReactNode } from "react";

import { cn } from "libs/util/cn";

interface HeroSectionProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  className?: string;
  children?: ReactNode;
}

/** Shared primary-colour hero banner with animated decorative circles. */
export const HeroSection = ({
  eyebrow,
  title,
  description,
  className,
  children,
}: HeroSectionProps) => {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl bg-primary px-5 py-6 text-primary-foreground md:rounded-3xl md:px-8 md:py-10",
        className,
      )}
    >
      {/* Decorative background circles — CSS animations run off main thread */}
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10"
        style={{ animation: "hero-pulse 4s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute -bottom-8 -right-2 h-20 w-20 rounded-full bg-white/5"
        style={{ animation: "hero-pulse 4s ease-in-out 1.5s infinite" }}
      />

      <p className="text-xs font-medium uppercase tracking-widest opacity-70 md:text-sm">
        {eyebrow}
      </p>
      <p className="mt-1 text-2xl font-semibold leading-tight md:text-3xl lg:text-4xl">
        {title}
      </p>

      {description && (
        <p className="mt-3 text-sm leading-relaxed opacity-80">{description}</p>
      )}

      {children && <div className="mt-4">{children}</div>}
    </section>
  );
};
