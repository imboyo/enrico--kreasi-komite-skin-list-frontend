"use client";

import { useQuery } from "@tanstack/react-query";

import { useRoutineCheckStore } from "@/client-side-page/home/routine-check-store";
import { Checkbox } from "@/components/atomic/atom/Checkbox";
import { QueryStateHandler } from "@/components/atomic/molecule/QueryStateHandler";
import { Skeleton as RoutineListSkeleton } from "@/components/domain/routine-list/Skeleton";
import { useCheckableItems } from "@/hooks/useCheckableItems";
import { cn } from "@/util/cn";

type HomeChecklistItem = {
  id: string;
  label: string;
  isChecked: boolean;
};

type HomeChecklistResponse<TItem extends HomeChecklistItem> = {
  data: TItem[];
  meta: {
    mode: string;
  };
};

type HomeChecklistSectionProps<TItem extends HomeChecklistItem> = {
  title: string;
  queryKey: string[];
  queryFn: () => Promise<HomeChecklistResponse<TItem>>;
  errorTitle: string;
  emptyTitle: string;
  emptyDescription: string;
};

export function HomeChecklistSection<TItem extends HomeChecklistItem>({
  title,
  queryKey,
  queryFn,
  errorTitle,
  emptyTitle,
  emptyDescription,
}: HomeChecklistSectionProps<TItem>) {
  const query = useQuery<HomeChecklistResponse<TItem>>({
    queryKey,
    queryFn,
  });

  const items = query.data?.data ?? [];
  const { resolvedItems, setChecked } = useCheckableItems(items);
  const incrementCheckCount = useRoutineCheckStore((state) => state.increment);

  return (
    <section className="space-y-3">
      <header className="space-y-1">
        <h2 className="text-2xl font-medium text-foreground">{title}</h2>
      </header>

      <QueryStateHandler
        query={query}
        skeleton={<RoutineListSkeleton />}
        isEmpty={resolvedItems.length === 0}
        errorTitle={errorTitle}
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
      >
        <div className="space-y-3">
          {resolvedItems.map((item) => (
            <div key={item.id} className="relative">
              <Checkbox
                checked={item.isChecked}
                label={item.label}
                onChange={(event) => {
                  setChecked(item.id, event.currentTarget.checked);
                  // All home checklists share one interaction counter so the
                  // limit dialog still behaves the same across sections.
                  incrementCheckCount();
                }}
                wrapperProps={{
                  className: cn(
                    "flex w-full items-center gap-3 rounded-[24px] border border-border/70 bg-card/90 px-4 py-4 shadow-sm transition-colors",
                    item.isChecked && "border-primary/50 bg-primary/5",
                  ),
                }}
                labelClassName="text-base font-medium text-foreground"
              />
            </div>
          ))}
        </div>
      </QueryStateHandler>
    </section>
  );
}
