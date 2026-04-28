import type { KeyboardEvent } from "react";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/atomic/atom/Badge";
import { Button } from "@/components/atomic/atom/Button";
import { TextInput } from "@/components/atomic/atom/TextInput";
import { BottomSheet } from "@/components/atomic/molecule/BottomSheet";
import { ConfirmationDialog } from "@/components/atomic/molecule/ConfirmationDialog";

interface SkinGoalsEditSheetProps {
  open: boolean;
  activeGoals: string[];
  goalName: string;
  isAdding: boolean;
  deletingGoal: string | null;
  onGoalNameChange: (value: string) => void;
  onAddGoal: () => void | Promise<void>;
  onDeleteGoal: (goal: string) => void | Promise<void>;
  onClose: () => void;
}

export function SkinGoalsEditSheet({
  open,
  activeGoals,
  goalName,
  isAdding,
  deletingGoal,
  onGoalNameChange,
  onAddGoal,
  onDeleteGoal,
  onClose,
}: SkinGoalsEditSheetProps) {
  const [addConfirmOpen, setAddConfirmOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState<string | null>(null);
  const normalizedGoalName = goalName.trim().replace(/\s+/g, " ");
  const alreadyExists = activeGoals.some(
    (goal) => goal.toLowerCase() === normalizedGoalName.toLowerCase(),
  );
  const canRequestAdd = Boolean(normalizedGoalName) && !alreadyExists && !isAdding;

  function handleGoalNameKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    if (canRequestAdd) {
      setAddConfirmOpen(true);
    }
  }

  async function handleConfirmAdd() {
    await onAddGoal();
    setAddConfirmOpen(false);
  }

  async function handleConfirmDelete() {
    if (!goalToDelete) {
      return;
    }

    await onDeleteGoal(goalToDelete);
    setGoalToDelete(null);
  }

  return (
    <>
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
              onChange={(event) => onGoalNameChange(event.target.value)}
              onKeyDown={handleGoalNameKeyDown}
              placeholder="Add a new skin goal"
              containerProps={{ className: "rounded-xl" }}
              disabled={isAdding}
            />

            <Button
              type="button"
              size="sm"
              className="h-full shrink-0 self-stretch"
              onClick={() => setAddConfirmOpen(true)}
              disabled={!canRequestAdd}
              leadingIcon={
                isAdding ? (
                  <Icon icon="lucide:loader-circle" className="size-3.5 animate-spin" />
                ) : (
                  <Icon icon="lucide:plus" className="size-3.5" />
                )
              }
            >
              Add
            </Button>
          </div>

          <p className="px-4 pb-3 text-xs text-muted-foreground">
            All goals shown here are already active. Use the trash icon to remove
            a goal from your profile.
          </p>

          {/* Keep only the list scrollable so the sheet stays at half-screen height. */}
          <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6">
            {activeGoals.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
                Add your first skin goal to start building this list.
              </div>
            ) : (
              <div className="flex flex-wrap content-start gap-2">
                {activeGoals.map((goal) => {
                  const isDeleting = deletingGoal === goal;
                  return (
                    <Badge
                      key={goal}
                      label={goal}
                      hideAction={false}
                      actionLabel={`Delete ${goal}`}
                      actionIcon={
                        isDeleting ? (
                          <Icon icon="lucide:loader-circle" className="size-3.5 animate-spin" />
                        ) : (
                          <Icon icon="lucide:trash-2" className="size-3.5" />
                        )
                      }
                      actionButtonProps={{
                        onClick: () => setGoalToDelete(goal),
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

      <ConfirmationDialog
        open={addConfirmOpen}
        onOpenChange={setAddConfirmOpen}
        title="Add Skin Goal"
        description={`Add "${normalizedGoalName}" to your active skin goals?`}
        confirmLabel="Add"
        isConfirming={isAdding}
        onConfirm={handleConfirmAdd}
      />

      <ConfirmationDialog
        open={!!goalToDelete}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            setGoalToDelete(null);
          }
        }}
        title="Delete Skin Goal"
        description={`Delete "${goalToDelete ?? ""}" from your active skin goals?`}
        confirmLabel="Delete"
        confirmVariant="destructive"
        isConfirming={!!deletingGoal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
