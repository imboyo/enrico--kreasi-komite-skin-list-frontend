"use client";

import { appConfig } from "@/config";
import { motion } from "motion/react";
import { HeroSection } from "@/components/atomic/molecule/HeroSection";
import { IconCard } from "@/components/atomic/molecule/IconCard";
import { fadeUp } from "libs/util/page-motion-variants";

const SECTIONS = [
  {
    icon: "material-symbols:manage-accounts-outline-rounded",
    title: "1. Account & Eligibility",
    body: "Skin List is intended for personal skin-care tracking. By using the app you confirm that the information you provide is accurate and that you are using the service for lawful, personal purposes only. You are responsible for keeping your account credentials secure.",
  },
  {
    icon: "material-symbols:privacy-tip-outline-rounded",
    title: "2. Privacy & Data",
    body: "We collect only the data needed to provide the service — your skin checklist entries, product records, and goal progress. Your data is stored securely and is never sold to third parties. Please review our Privacy Policy for full details on how your data is handled and retained.",
  },
  {
    icon: "material-symbols:medical-information-outline-rounded",
    title: "3. Not Medical Advice",
    body: "Skin List is a personal tracking tool, not a medical device or professional service. Nothing in the app — including checklist items, progress charts, or chat messages — constitutes medical advice, diagnosis, or treatment. Always consult a qualified dermatologist or health professional for medical concerns.",
  },
  {
    icon: "material-symbols:edit-note-rounded",
    title: "4. Your Content",
    body: "You own the data and notes you enter into Skin List. By saving content you grant us a limited licence to store and display it back to you within the app. We will never share your personal entries with your clinic or any third party without your explicit consent.",
  },
  {
    icon: "material-symbols:do-not-disturb-on-outline-rounded",
    title: "5. Prohibited Use",
    body: "You agree not to misuse the app — including attempting to reverse-engineer it, uploading harmful content, or using it to harass others. Accounts found in violation may be suspended or terminated without prior notice.",
  },
  {
    icon: "material-symbols:sync-problem-outline-rounded",
    title: "6. Service Availability",
    body: "We aim to keep Skin List available at all times, but we cannot guarantee uninterrupted access. Scheduled maintenance, updates, or unforeseen issues may cause temporary downtime. We are not liable for any loss arising from service unavailability.",
  },
  {
    icon: "material-symbols:update-rounded",
    title: "7. Changes to These Terms",
    body: "We may update these Terms of Service from time to time. When we do, we will revise the date at the bottom of this page. Continued use of Skin List after changes are posted constitutes your acceptance of the revised terms.",
  },
  {
    icon: "material-symbols:gavel-rounded",
    title: "8. Governing Law",
    body: "These terms are governed by the laws of Indonesia. Any disputes arising from your use of Skin List will be subject to the exclusive jurisdiction of the courts located in Indonesia.",
  },
];

export const PageTerms = () => {
  const { contact } = appConfig;

  return (
    <main className="mx-auto flex w-full max-w-125 flex-col gap-8 px-4 py-6">
      {/* Hero */}
      <motion.div {...fadeUp(0)}>
        <HeroSection
          eyebrow="Legal"
          title={
            <>
              Terms of
              <br />
              Service
            </>
          }
          description="Please read these terms carefully before using Skin List. By accessing or using the app you agree to be bound by them."
        />
      </motion.div>

      {/* Sections */}
      <section className="flex flex-col gap-3">
        {SECTIONS.map((section, i) => (
          <IconCard
            key={section.title}
            icon={section.icon}
            title={section.title}
            description={section.body}
            index={i}
          />
        ))}
      </section>

      {/* Footer note */}
      <motion.section className="flex flex-col gap-1 pb-2" {...fadeUp(0.5)}>
        <p className="text-muted-foreground text-xs leading-relaxed">
          If you have questions about these terms, contact us at{" "}
          <span className="text-foreground font-medium">{contact.email}</span>
          .
        </p>
        <p className="text-muted-foreground text-xs">Last updated: April 2026</p>
      </motion.section>
    </main>
  );
};
