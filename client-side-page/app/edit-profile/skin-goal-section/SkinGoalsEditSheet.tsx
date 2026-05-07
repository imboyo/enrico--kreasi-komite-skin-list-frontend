import { useEffect, type KeyboardEvent } from "react";
import { Icon } from "@iconify/react";
import type { SkinGoal } from "@/backend-service/user/skin-goal";
import { Badge } from "@/components/atomic/atom/Badge";
import { Button } from "@/components/atomic/atom/Button";
import { Skeleton } from "@/components/atomic/atom/Skeleton";
import { TextInput } from "@/components/atomic/atom/TextInput";
import { BottomSheet } from "@/components/atomic/molecule/BottomSheet";
import { useSkinGoalsSection } from "./useSkinGoalsSection";

interface SkinGoalsEditSheetProps {
  open: boolean;
  onClose: () => void;
  /** Notify parent whenever the goals list changes so the summary stays in sync. */
  onGoalsChange: (goals: SkinGoal[]) => void;
}

export function SkinGoalsEditSheet({ open, onClose, onGoalsChange }: SkinGoalsEditSheetProps) {
  const {
    activeGoals,
    isLoadingGoals,
    goalName,
    isAdding,
    deletingGoal,
    setGoalName,
    handleAddGoal,
    handleDeleteGoal,
  } = useSkinGoalsSection();

  // Reset input every time the sheet opens.
  useEffect(() => {
    if (open) setGoalName("");
  }, [open, setGoalName]);

  // Keep parent summary in sync whenever goals change.
  useEffect(() => {
    onGoalsChange(activeGoals);
  }, [activeGoals, onGoalsChange]);

  const normalizedGoalName = goalName.trim().replace(/\s+/g, " ");

  const alreadyExists = activeGoals.some(
    (goal) => goal.name.toLowerCase() === normalizedGoalName.toLowerCase(),
  );

  const canRequestAdd =
    Boolean(normalizedGoalName) && !alreadyExists && !isAdding;


  function handleGoalNameKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    if (canRequestAdd) {
      void handleAddGoal();
    }
  }

  return (
    <BottomSheet open={open} onClose={onClose}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <Button
          type="button"
          size="sm"
          variant="ghost"
          iconOnly
          onClick={onClose}
          className="rounded-full text-muted-foreground hover:bg-muted"
          aria-label="Close"
        >
          <Icon icon="lucide:x" className="size-4" />
        </Button>

        <h3 className="text-sm font-semibold text-foreground">
          Choose Skin Goals
        </h3>
      </div>

      <div className="h-px bg-border" />

      <div className="flex min-h-0 flex-1 flex-col">
        {/* Input section */}
        <div className="flex gap-2 p-4 pb-3">
          <TextInput
            value={goalName}
            onChange={(event) => setGoalName(event.target.value)}
            onKeyDown={handleGoalNameKeyDown}
            placeholder="Add a new skin goal"
            containerProps={{ className: "rounded-xl" }}
            disabled={isAdding}
          />

          <Button
            type="button"
            size="sm"
            className="h-full shrink-0 self-stretch"
            onClick={() => void handleAddGoal()}
            disabled={!canRequestAdd}
            leadingIcon={
              isAdding ? (
                <Icon
                  icon="lucide:loader-circle"
                  className="size-3.5 animate-spin"
                />
              ) : (
                <Icon icon="lucide:plus" className="size-3.5" />
              )
            }
          >
            Add
          </Button>
        </div>

        <p className="px-4 pb-3 text-xs text-muted-foreground">
          All goals shown here are already active. Use the trash icon to
          remove a goal from your profile.
        </p>

        {/* Keep only the list scrollable so the sheet stays at half-screen height. */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6">
          {isLoadingGoals ? (
            <div className="flex flex-wrap content-start gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-28" />
              ))}
            </div>
          ) : activeGoals.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
              Add your first skin goal to start building this list.
            </div>
          ) : (
            <div className="flex flex-wrap content-start gap-2">
              {activeGoals.map((goal) => {
                const isDeleting = deletingGoal === goal.uuid;
                return (
                  <Badge
                    key={goal.uuid}
                    label={goal.name}
                    hideAction={false}
                    actionLabel={`Delete ${goal.name}`}
                    actionIcon={
                      isDeleting ? (
                        <Icon
                          icon="lucide:loader-circle"
                          className="size-3.5 animate-spin"
                        />
                      ) : (
                        <Icon icon="lucide:trash-2" className="size-3.5" />
                      )
                    }
                    actionButtonProps={{
                      onClick: () => void handleDeleteGoal(goal.uuid),
                      disabled: !!deletingGoal,
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </BottomSheet>
  );
}
