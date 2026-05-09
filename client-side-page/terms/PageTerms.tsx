"use client";

import { appConfig } from "@/config";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { fadeUp } from "libs/util/page-motion-variants";

const SECTIONS = [
  {
    icon: "material-symbols:manage-accounts-outline-rounded",
    title: "Account & Eligibility",
    body: "Skin List is intended for personal skin-care tracking. By using the app you confirm that the information you provide is accurate and that you are using the service for lawful, personal purposes only. You are responsible for keeping your account credentials secure.",
  },
  {
    icon: "material-symbols:privacy-tip-outline-rounded",
    title: "Privacy & Data",
    body: "We collect only the data needed to provide the service — your skin checklist entries, product records, and goal progress. Your data is stored securely and is never sold to third parties. Please review our Privacy Policy for full details on how your data is handled and retained.",
  },
  {
    icon: "material-symbols:medical-information-outline-rounded",
    title: "Not Medical Advice",
    body: "Skin List is a personal tracking tool, not a medical device or professional service. Nothing in the app — including checklist items, progress charts, or chat messages — constitutes medical advice, diagnosis, or treatment. Always consult a qualified dermatologist or health professional for medical concerns.",
  },
  {
    icon: "material-symbols:edit-note-rounded",
    title: "Your Content",
    body: "You own the data and notes you enter into Skin List. By saving content you grant us a limited licence to store and display it back to you within the app. We will never share your personal entries with your clinic or any third party without your explicit consent.",
  },
  {
    icon: "material-symbols:do-not-disturb-on-outline-rounded",
    title: "Prohibited Use",
    body: "You agree not to misuse the app — including attempting to reverse-engineer it, uploading harmful content, or using it to harass others. Accounts found in violation may be suspended or terminated without prior notice.",
  },
  {
    icon: "material-symbols:sync-problem-outline-rounded",
    title: "Service Availability",
    body: "We aim to keep Skin List available at all times, but we cannot guarantee uninterrupted access. Scheduled maintenance, updates, or unforeseen issues may cause temporary downtime. We are not liable for any loss arising from service unavailability.",
  },
  {
    icon: "material-symbols:update-rounded",
    title: "Changes to These Terms",
    body: "We may update these Terms of Service from time to time. When we do, we will revise the date at the bottom of this page. Continued use of Skin List after changes are posted constitutes your acceptance of the revised terms.",
  },
  {
    icon: "material-symbols:gavel-rounded",
    title: "Governing Law",
    body: "These terms are governed by the laws of Indonesia. Any disputes arising from your use of Skin List will be subject to the exclusive jurisdiction of the courts located in Indonesia.",
  },
];

export const PageTerms = () => {
  const { contact } = appConfig;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 md:gap-8 md:px-6 md:py-8 xl:px-8">
      <motion.div {...fadeUp(0)}>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-7 py-9 text-primary-foreground md:px-10 md:py-12">
          {/* Decorative background circles */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-12 right-8 h-32 w-32 rounded-full bg-white/5" />

          <p className="text-[11px] font-semibold uppercase tracking-widest opacity-70">
            Legal
          </p>
          <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight md:text-5xl xl:text-[3.5rem]">
            Terms of
            <br />
            Service
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed opacity-80 md:text-[15px]">
            Please read these terms carefully before using Skin List. By
            accessing or using the app you agree to be bound by them.
          </p>

          {/* Meta chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
              {SECTIONS.length} Sections
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
              Last updated April 2026
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
              All users
            </span>
          </div>
        </div>
      </motion.div>

      {/* Section: Terms cards + sticky TOC sidebar */}
      <div className="grid gap-6 xl:grid-cols-[1fr_220px] xl:items-start xl:gap-8">
        {/* Section cards */}
        <section className="grid gap-3 sm:grid-cols-2 md:gap-4">
          {SECTIONS.map((section, i) => (
            <motion.article
              key={section.title}
              id={`section-${i + 1}`}
              className="flex h-full flex-col rounded-3xl border border-border/70 bg-card px-5 py-5 shadow-sm md:px-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: i * 0.06,
                ease: "easeOut" as const,
              }}
            >
              <div className="mb-4 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon icon={section.icon} width={22} height={22} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Section {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-1 text-base font-semibold leading-snug md:text-[17px]">
                    {section.title}
                  </h2>
                </div>
              </div>

              <p className="text-sm leading-7 text-muted-foreground md:text-[15px]">
                {section.body}
              </p>
            </motion.article>
          ))}
        </section>

        {/* Sticky TOC — desktop (xl) only */}
        <motion.aside className="hidden xl:block" {...fadeUp(0.2)}>
          <div className="sticky top-6 rounded-3xl border border-border/70 bg-card px-4 py-5 shadow-sm">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Contents
            </p>
            <nav className="flex flex-col gap-0.5">
              {SECTIONS.map((section, i) => (
                <a
                  key={section.title}
                  href={`#section-${i + 1}`}
                  className="flex items-center gap-2.5 rounded-xl px-2 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {/* TOC number badge */}
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[10px] font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="min-w-0 truncate text-xs leading-tight">
                    {section.title}
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </motion.aside>
      </div>

      {/* Section: Footer note */}
      <motion.section
        className="rounded-3xl border border-border/70 bg-card px-6 py-5 shadow-sm"
        {...fadeUp(0.5)}
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          If you have questions about these terms, contact us at{" "}
          <span className="font-medium text-foreground">{contact.email}</span>.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Last updated: April 2026
        </p>
      </motion.section>
    </main>
  );
};
