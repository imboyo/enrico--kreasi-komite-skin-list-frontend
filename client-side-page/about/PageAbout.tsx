"use client";

import { motion } from "motion/react";
import { HeroSection } from "@/components/atomic/molecule/HeroSection";
import { IconCard } from "@/components/atomic/molecule/IconCard";
import { fadeUp } from "libs/util/page-motion-variants";

const TEAM_MEMBERS = [
  {
    name: "Enrico J Hartono",
    role: "Owner & Founder · Kreasi Komite",
    icon: "material-symbols:person-outline-rounded",
  },
  {
    name: "Mabrur Syamhur",
    role: "Developer · Imboyo",
    icon: "material-symbols:code-rounded",
  },
];

const FEATURES = [
  {
    icon: "material-symbols:checklist-rounded",
    title: "Skin Checklist",
    description:
      "Log your skin-care steps — routines, tone, make-up, and concerns — all in one place.",
  },
  {
    icon: "material-symbols:inventory-2-outline-rounded",
    title: "Clinic Product Records",
    description:
      "Track the skin-care products your clinic has prescribed or reserved for you, updated online so the clinic always knows what you're using.",
  },
  {
    icon: "material-symbols:flag-outline-rounded",
    title: "Skin Goals",
    description:
      "Set personal skin-health targets and stay motivated as you work toward clearer, healthier skin.",
  },
  {
    icon: "material-symbols:trending-up-rounded",
    title: "Dermal Progress",
    description:
      "Visualise how your skin has improved over time and share progress with your clinic.",
  },
  {
    icon: "material-symbols:chat-outline-rounded",
    title: "Chat Consultation",
    description:
      "Connect directly with your clinic or skin-care specialist without leaving the app.",
  },
  {
    icon: "material-symbols:water-drop-outline-rounded",
    title: "Skin Tone & Color Log",
    description:
      "Monitor changes in your skin tone over time and spot what works.",
  },
  {
    icon: "material-symbols:face-retouching-natural-rounded",
    title: "Make-Up Checklist",
    description:
      "Keep track of the products in your make-up bag and how your skin reacts.",
  },
  {
    icon: "material-symbols:health-and-safety-outline-rounded",
    title: "Concerns & Scars",
    description:
      "Document blemishes and scars so you can measure healing progress.",
  },
];

const HIGHLIGHTS = [
  {
    label: "Core features",
    value: `${FEATURES.length}`,
    description: "Tools to log routines, progress, and clinic follow-up in one place.",
  },
  {
    label: "Team members",
    value: `${TEAM_MEMBERS.length}`,
    description: "A focused product and engineering team shaping the app.",
  },
];

export const PageAbout = () => {
  return (
    <main className="flex w-full flex-col gap-6 py-2 md:gap-8 md:py-4">
      {/* Section: Hero */}
      <motion.section {...fadeUp(0)}>
        <HeroSection
          eyebrow="About us"
          title={
            <>
              Know your skin,
              <br />
              love your glow.
            </>
          }
          description="Skin List is a simple, focused app built to help you stay on top of your skin-care journey — one check at a time."
        />
      </motion.section>

      {/* Section: Page summary */}
      <motion.section className="grid gap-3 md:grid-cols-2" {...fadeUp(0.08)}>
        {HIGHLIGHTS.map((highlight) => (
          <div
            key={highlight.label}
            className="rounded-2xl border border-border/70 bg-card/90 px-5 py-5 shadow-sm"
          >
            <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
              {highlight.label}
            </p>
            <p className="mt-2 text-3xl font-semibold">{highlight.value}</p>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {highlight.description}
            </p>
          </div>
        ))}
      </motion.section>

      {/* Section: Mission */}
      <motion.section
        className="rounded-2xl border border-border/70 bg-card/90 px-5 py-5 shadow-sm md:px-6"
        {...fadeUp(0.12)}
      >
        <h2 className="text-lg font-semibold md:text-xl">Our Mission</h2>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed md:text-base">
          We believe great skin comes from consistency, not complexity. Skin
          List bridges you and your clinic — track routines, products, goals,
          and progress in one place, while staying connected through chat
          consultation. Focus on what matters: your skin health.
        </p>
      </motion.section>

      {/* Section: Team */}
      <section className="flex flex-col gap-3">
        <motion.h2 className="text-lg font-semibold md:text-xl" {...fadeUp(0.16)}>
          The Team
        </motion.h2>
        <div className="grid gap-3 md:grid-cols-2">
          {TEAM_MEMBERS.map((member, i) => (
            <IconCard
              key={member.name}
              icon={member.icon}
              title={member.name}
              description={member.role}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* Section: Features */}
      <section className="flex flex-col gap-3">
        <motion.h2 className="text-lg font-semibold md:text-xl" {...fadeUp(0.2)}>
          What We Offer
        </motion.h2>
        <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <IconCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={i}
            />
          ))}
        </div>
      </section>
    </main>
  );
};
