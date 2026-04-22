import { HeroSection } from "@/components/atomic/molecule/HeroSection";
import { appConfig } from "@/config";
import Link from "next/link";

export const ContactHeroSection = () => {
  const { contact } = appConfig;
  const whatsappHref = `https://wa.me/${contact.whatsappNumber.replace(/\D/g, "")}`;

  return (
    <HeroSection
      eyebrow="Support"
      title="We're here when you need skincare guidance or product help."
      description="Choose email for detailed questions, WhatsApp for faster follow-ups, or Instagram for the latest updates from our team."
    >
      <div className="flex flex-wrap gap-3">
        <Link
          href={`mailto:${contact.email}`}
          className="inline-flex items-center justify-center rounded-xl bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
        >
          Send an Email
        </Link>
        <Link
          href={whatsappHref}
          className="inline-flex items-center justify-center rounded-xl border border-white/30 px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-white/10"
        >
          Chat on WhatsApp
        </Link>
      </div>
    </HeroSection>
  );
};
