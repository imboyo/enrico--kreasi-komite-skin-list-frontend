"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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
  defaultOpen?: boolean;
};

export function HomeChecklistSection<TItem extends HomeChecklistItem>({
  title,
  queryKey,
  queryFn,
  errorTitle,
  emptyTitle,
  emptyDescription,
  defaultOpen = false,
}: HomeChecklistSectionProps<TItem>) {
  // Each section manages its own initial fold state so PageHome can choose
  // which checklist is expanded on the first render.
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const query = useQuery<HomeChecklistResponse<TItem>>({
    queryKey,
    queryFn,
  });

  const items = query.data?.data ?? [];
  const { resolvedItems, setChecked } = useCheckableItems(items);
  const incrementCheckCount = useRoutineCheckStore((state) => state.increment);

  return (
    <section
      className={cn(
        "space-y-3 pb-3",
        // Keep the subtle divider attached to the title while collapsed,
        // then move it to the bottom edge once the section is expanded.
        isOpen ? "border-b border-border/50" : "",
      )}
    >
      <header className={cn(!isOpen && "border-b border-border/50 pb-3")}>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-4 bg-transparent py-1 text-left transition-opacity hover:opacity-80"
          aria-expanded={isOpen}
          onClick={() => {
            setIsOpen((currentValue) => !currentValue);
          }}
        >
          <h2 className="text-2xl font-medium uppercase tracking-[0.08em] text-foreground">
            {title}
          </h2>
          <span className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground/80">
            {isOpen ? "Hide" : "Show"}
          </span>
        </button>
      </header>

      {isOpen && (
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
                      "flex w-full items-center gap-3 rounded-[24px] border border-border/70 bg-card/90 px-4 py-4 shadow-sm transition-all hover:border-primary/40 hover:bg-primary/5 hover:shadow-md",
                      item.isChecked && "border-primary/50 bg-primary/5",
                    ),
                  }}
                  labelClassName="text-base font-medium text-foreground"
                />
              </div>
            ))}
          </div>
        </QueryStateHandler>
      )}
    </section>
  );
}
