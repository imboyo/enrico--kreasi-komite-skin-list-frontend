"use client";

import { useState } from "react";
import type { SkinGoal } from "@/backend-service/user/skin-goal";
import { SkinGoalsEditSheet } from "./SkinGoalsEditSheet";
import { SkinGoalsSummary } from "./SkinGoalsSummary";

export function SkinGoalsSection() {
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [activeGoals, setActiveGoals] = useState<SkinGoal[]>([]);

  return (
    <>
      <SkinGoalsSummary
        activeGoals={activeGoals.map((g) => g.name)}
        onEdit={() => setIsEditSheetOpen(true)}
      />
      <SkinGoalsEditSheet
        open={isEditSheetOpen}
        onClose={() => setIsEditSheetOpen(false)}
        onGoalsChange={setActiveGoals}
      />
    </>
  );
}
