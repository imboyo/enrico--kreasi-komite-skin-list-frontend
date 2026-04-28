"use client";

import { FullScreenLoading } from "@/components/atomic/molecule/FullScreenLoading";
import { SkinGoalsEditSheet } from "./SkinGoalsEditSheet";
import { SkinGoalsSummary } from "./SkinGoalsSummary";
import { useSkinGoalsSection } from "./useSkinGoalsSection";

export function SkinGoalsSection() {
  const {
    activeGoals,
    goalName,
    isEditSheetOpen,
    isAdding,
    deletingGoal,
    setGoalName,
    openEditSheet,
    closeEditSheet,
    handleAddGoal,
    handleDeleteGoal,
  } = useSkinGoalsSection();

  // Derive loading message based on which operation is in progress.
  const loadingMessage = isAdding
    ? "Menambahkan Skin Goal..."
    : deletingGoal
      ? "Menghapus Skin Goal..."
      : undefined;

  return (
    <>
      {/* Full-screen overlay during add/delete API calls */}
      <FullScreenLoading
        visible={isAdding || !!deletingGoal}
        message={loadingMessage}
      />

      <SkinGoalsSummary activeGoals={activeGoals} onEdit={openEditSheet} />
      <SkinGoalsEditSheet
        open={isEditSheetOpen}
        activeGoals={activeGoals}
        goalName={goalName}
        isAdding={isAdding}
        deletingGoal={deletingGoal}
        onGoalNameChange={setGoalName}
        onAddGoal={handleAddGoal}
        onDeleteGoal={handleDeleteGoal}
        onClose={closeEditSheet}
      />
    </>
  );
}
