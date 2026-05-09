import { appConfig } from "@/config";
import { Icon } from "@iconify/react";
import Link from "next/link";

export const ContactHeroSection = () => {
  const { contact } = appConfig;
  const whatsappHref = `https://wa.me/${contact.whatsappNumber.replace(/\D/g, "")}`;

  return (
    <section className="relative overflow-hidden rounded-2xl bg-primary px-6 py-8 text-primary-foreground md:px-10 md:py-12 lg:px-14 lg:py-14">
      {/* Decorative background circles */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 lg:h-72 lg:w-72"
        style={{ animation: "hero-pulse 4s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute -bottom-10 -right-4 h-24 w-24 rounded-full bg-white/5 lg:h-44 lg:w-44"
        style={{ animation: "hero-pulse 4s ease-in-out 1.5s infinite" }}
      />

      {/* Desktop: text left — CTA right; mobile: stacked */}
      <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        {/* Text block */}
        <div className="flex flex-col gap-2 lg:max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest opacity-70">Support</p>
          <p className="text-2xl font-semibold leading-snug md:text-3xl lg:text-4xl lg:leading-tight">
            We&apos;re here when you need skincare guidance or product help.
          </p>
          <p className="mt-1 text-sm leading-relaxed opacity-80 md:text-base">
            Choose email for detailed questions, WhatsApp for faster follow-ups, or Instagram for
            the latest updates from our team.
          </p>
        </div>

        {/* CTA buttons — stacked on desktop, horizontal wrap on mobile */}
        <div className="flex flex-wrap gap-3 lg:shrink-0 lg:flex-col">
          <Link
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
          >
            <Icon icon="material-symbols:mail-outline-rounded" width={16} height={16} />
            Send an Email
          </Link>
          <Link
            href={whatsappHref}
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-white/10"
          >
            <Icon icon="ri:whatsapp-line" width={16} height={16} />
            Chat on WhatsApp
          </Link>
        </div>
      </div>
    </section>
  );
};
