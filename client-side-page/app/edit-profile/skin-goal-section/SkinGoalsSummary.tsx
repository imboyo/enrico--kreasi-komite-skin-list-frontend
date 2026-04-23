import { Icon } from "@iconify/react";
import { Button } from "@/components/atomic/atom/Button";

interface SkinGoalsSummaryProps {
  activeGoals: string[];
  onEdit: () => void;
}

export function SkinGoalsSummary({
  activeGoals,
  onEdit,
}: SkinGoalsSummaryProps) {
  return (
    <div className="flex flex-col gap-3 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">Skin Goals</h2>

        <Button
          size="sm"
          variant="outline"
          onClick={onEdit}
          leadingIcon={<Icon icon="lucide:settings-2" className="size-3.5" />}
        >
          Edit Goals
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {activeGoals.length === 0 ? (
          <p className="text-sm text-muted-foreground">No goals selected.</p>
        ) : (
          activeGoals.map((goal) => (
            <span
              key={goal}
              className="rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary"
            >
              {goal}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
