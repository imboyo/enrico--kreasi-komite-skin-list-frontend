import { useState } from "react";
import { addSkinGoal } from "@/mock-backend/user/skin-goal/add-goal";
import { deleteSkinGoal } from "@/mock-backend/user/skin-goal/delete-goal";
import { useToast } from "@/components/provider/Toast";
import { INITIAL_ACTIVE_GOALS } from "./constants";

function normalizeGoalName(goal: string) {
  return goal.trim().replace(/\s+/g, " ");
}

export function useSkinGoalsSection() {
  const { showToast } = useToast();
  const [activeGoals, setActiveGoals] =
    useState<string[]>(INITIAL_ACTIVE_GOALS);
  const [goalName, setGoalName] = useState("");
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  // Tracks which goal is currently being deleted to show per-badge loading state.
  const [deletingGoal, setDeletingGoal] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  function openEditSheet() {
    setGoalName("");
    setIsEditSheetOpen(true);
  }

  function closeEditSheet() {
    setGoalName("");
    setIsEditSheetOpen(false);
  }

  async function handleAddGoal() {
    const normalized = normalizeGoalName(goalName);

    if (!normalized || isAdding) {
      return;
    }

    const alreadyExists = activeGoals.some(
      (goal) => goal.toLowerCase() === normalized.toLowerCase(),
    );

    if (alreadyExists) {
      setGoalName("");
      return;
    }

    setIsAdding(true);

    try {
      await addSkinGoal({ goal: normalized });
      setActiveGoals((prev) => [...prev, normalized]);
    } catch {
      showToast("Gagal menambahkan skin goal. Silakan coba lagi.", { variant: "error" });
    } finally {
      setIsAdding(false);
      setGoalName("");
    }
  }

  async function handleDeleteGoal(goalToDelete: string) {
    if (deletingGoal) {
      return;
    }

    setDeletingGoal(goalToDelete);

    try {
      await deleteSkinGoal({ goal: goalToDelete });
      setActiveGoals((prev) => prev.filter((goal) => goal !== goalToDelete));
    } catch {
      showToast("Gagal menghapus skin goal. Silakan coba lagi.", { variant: "error" });
    } finally {
      setDeletingGoal(null);
    }
  }

  return {
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
  };
}
