import { useState, useEffect } from "react";
import {
  listSkinGoal,
  addSkinGoal,
  deleteSkinGoal,
  type SkinGoal,
} from "@/backend-service/user/skin-goal";
import { useToast } from "@/components/provider/Toast";

function normalizeGoalName(goal: string) {
  return goal.trim().replace(/\s+/g, " ");
}

export function useSkinGoalsSection() {
  const { showToast } = useToast();
  const [activeGoals, setActiveGoals] = useState<SkinGoal[]>([]);
  const [isLoadingGoals, setIsLoadingGoals] = useState(true);
  const [goalName, setGoalName] = useState("");
  // Tracks which goal UUID is being deleted to show per-badge loading state.
  const [deletingGoal, setDeletingGoal] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    async function fetchGoals() {
      try {
        const res = await listSkinGoal({ limit: 100 });
        setActiveGoals(res.data);
      } catch {
        showToast("Gagal memuat skin goals. Silakan coba lagi.", { variant: "error" });
      } finally {
        setIsLoadingGoals(false);
      }
    }

    fetchGoals();
  }, [showToast]);

  async function handleAddGoal() {
    const normalized = normalizeGoalName(goalName);

    if (!normalized || isAdding) {
      return;
    }

    const alreadyExists = activeGoals.some(
      (goal) => goal.name.toLowerCase() === normalized.toLowerCase(),
    );

    if (alreadyExists) {
      setGoalName("");
      return;
    }

    setIsAdding(true);

    try {
      const newGoal = await addSkinGoal({ name: normalized });
      setActiveGoals((prev) => [...prev, newGoal]);
    } catch {
      showToast("Gagal menambahkan skin goal. Silakan coba lagi.", { variant: "error" });
    } finally {
      setIsAdding(false);
      setGoalName("");
    }
  }

  async function handleDeleteGoal(goalUuid: string) {
    if (deletingGoal) {
      return;
    }

    setDeletingGoal(goalUuid);

    try {
      await deleteSkinGoal(goalUuid);
      setActiveGoals((prev) => prev.filter((goal) => goal.uuid !== goalUuid));
    } catch {
      showToast("Gagal menghapus skin goal. Silakan coba lagi.", { variant: "error" });
    } finally {
      setDeletingGoal(null);
    }
  }

  return {
    activeGoals,
    isLoadingGoals,
    goalName,
    isAdding,
    deletingGoal,
    setGoalName,
    handleAddGoal,
    handleDeleteGoal,
  };
}
