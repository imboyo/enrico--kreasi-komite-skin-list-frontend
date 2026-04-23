"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/atomic/atom/Button";

// Preset list maintained by the app — users pick from these
const ALL_SKIN_GOALS = [
  "Hydration Boost",
  "Anti-Aging",
  "Acne Control",
  "Even Skin Tone",
  "Pore Minimizing",
  "Brightening",
  "Sun Protection",
  "Soothing & Calming",
  "Oil Control",
  "Firming",
  "Dark Spot Fading",
  "Barrier Repair",
];

export function SkinGoalsSection() {
  // Active goals shown on the profile
  const [activeGoals, setActiveGoals] = useState<string[]>([
    "Hydration Boost",
    "Anti-Aging",
    "Acne Control",
    "Even Skin Tone",
    "Pore Minimizing",
    "Brightening",
  ]);

  // Draft selection while the panel is open
  const [draft, setDraft] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  function openPanel() {
    setDraft([...activeGoals]);
    setOpen(true);
  }

  function closePanel() {
    setOpen(false);
  }

  function savePanel() {
    setActiveGoals([...draft]);
    setOpen(false);
  }

  function toggleGoal(goal: string) {
    setDraft((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal],
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">
            Skin Goals
          </h2>
          <Button size="sm" variant="outline" onClick={openPanel}>
            <Icon icon="lucide:pencil" className="size-3.5" />
            Edit Goals
          </Button>
        </div>

        {/* Active goals badges */}
        <div className="flex flex-wrap gap-2">
          {activeGoals.length === 0 ? (
            <p className="text-sm text-muted-foreground">No goals selected.</p>
          ) : (
            activeGoals.map((goal) => (
              <span
                key={goal}
                className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
              >
                {goal}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePanel}
          />
        )}
      </AnimatePresence>

      {/* Slide-up edit panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-125 rounded-t-2xl bg-background shadow-xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-3">
              {/* Close button on the left */}
              <button
                onClick={closePanel}
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
                aria-label="Close"
              >
                <Icon icon="lucide:x" className="size-4" />
              </button>

              <h3 className="text-sm font-semibold text-foreground">
                Choose Skin Goals
              </h3>

              {/* Save button on the right */}
              <Button size="sm" onClick={savePanel}>
                Save
              </Button>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Toggleable goal badges */}
            <div className="flex flex-wrap content-start gap-x-1.5 gap-y-2 p-4 pb-12 min-h-80">
              {ALL_SKIN_GOALS.map((goal) => {
                const selected = draft.includes(goal);
                return (
                  <button
                    key={goal}
                    onClick={() => toggleGoal(goal)}
                    className={[
                      "rounded-lg border px-2.5 py-3 text-xs font-medium transition-colors duration-150",
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-transparent text-foreground hover:bg-muted",
                    ].join(" ")}
                  >
                    {goal}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
