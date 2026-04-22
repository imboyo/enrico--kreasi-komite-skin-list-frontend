"use client";

import { useQuery } from "@tanstack/react-query";

import { Checkbox } from "@/components/atomic/atom/Checkbox";
import { QueryStateHandler } from "@/components/atomic/molecule/QueryStateHandler";
import { Skeleton as RoutineListSkeleton } from "@/components/domain/routine-list/Skeleton";
import { useCheckableItems } from "@/hooks/useCheckableItems";
import { getRoutines } from "@/mock-backend/skin-care/get-routines";
import { cn } from "@/util/cn";

export function Routines() {
  const query = useQuery({
    queryKey: ["skin-care-routines"],
    queryFn: () => getRoutines(),
  });

  const routines = query.data?.data ?? [];
  const { resolvedItems: renderedRoutines, setChecked } =
    useCheckableItems(routines);

  return (
    <QueryStateHandler
      query={query}
      skeleton={<RoutineListSkeleton />}
      isEmpty={renderedRoutines.length === 0}
      errorTitle="Routine list is unavailable."
      emptyTitle="No routines available yet."
      emptyDescription="Add your routine data or retry the request to load this checklist again."
    >
      <section className="space-y-3">
        {renderedRoutines.map((routine) => (
          <Checkbox
            key={routine.id}
            checked={routine.isChecked}
            label={routine.label}
            onChange={(event) => {
              setChecked(routine.id, event.currentTarget.checked);
            }}
            wrapperProps={{
              className: cn(
                "flex w-full items-center gap-3 rounded-[24px] border border-border/70 bg-card/90 px-4 py-4 shadow-sm transition-colors",
                routine.isChecked && "border-primary/50 bg-primary/5",
              ),
            }}
            labelClassName="text-base font-medium text-foreground"
          />
        ))}
      </section>
    </QueryStateHandler>
  );
}
