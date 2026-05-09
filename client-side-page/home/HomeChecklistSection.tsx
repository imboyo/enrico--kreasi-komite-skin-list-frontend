"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import { useRoutineCheckStore } from "@/client-side-page/home/routine-check-store";
import { ChecklistItemCard } from "@/components/atomic/molecule/ChecklistItemCard";
import { QueryStateHandler } from "@/components/atomic/molecule/QueryStateHandler";
import { Skeleton as RoutineListSkeleton } from "components/domain/skin/list/Skeleton";
import { useCheckableItems } from "@/hooks/useCheckableItems";
import { cn } from "libs/util/cn";

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
  const [contentHeight, setContentHeight] = useState(
    defaultOpen ? "auto" : "0px",
  );
  const contentInnerRef = useRef<HTMLDivElement | null>(null);
  const query = useQuery<HomeChecklistResponse<TItem>>({
    queryKey,
    queryFn,
  });

  const items = query.data?.data ?? [];
  const { resolvedItems, setChecked } = useCheckableItems(items);
  const incrementCheckCount = useRoutineCheckStore((state) => state.increment);

  useEffect(() => {
    const contentElement = contentInnerRef.current;

    if (!contentElement) {
      return;
    }

    const updateHeight = () => {
      // Measure the rendered content so the wrapper can animate both expand
      // and collapse instead of hard-mounting the checklist body.
      setContentHeight(isOpen ? `${contentElement.scrollHeight}px` : "0px");
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(contentElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isOpen, resolvedItems.length, query.status]);

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
          aria-controls={`${queryKey.join("-")}-content`}
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

      <div
        id={`${queryKey.join("-")}-content`}
        className={cn(
          "overflow-hidden transition-[height,opacity,margin] duration-300 ease-out motion-reduce:transition-none",
          isOpen ? "mt-3 opacity-100" : "mt-0 opacity-0",
        )}
        style={{
          height: contentHeight,
        }}
        aria-hidden={!isOpen}
      >
        <div
          ref={contentInnerRef}
          className={cn(!isOpen && "pointer-events-none")}
        >
          <QueryStateHandler
            query={query}
            skeleton={<RoutineListSkeleton />}
            isEmpty={resolvedItems.length === 0}
            errorTitle={errorTitle}
            emptyTitle={emptyTitle}
            emptyDescription={emptyDescription}
          >
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {resolvedItems.map((item) => (
                <ChecklistItemCard
                  key={item.id}
                  checked={item.isChecked}
                  label={item.label}
                  onCheckedChange={(event) => {
                    setChecked(item.id, event.currentTarget.checked);
                    // All home checklists share one interaction counter so the
                    // limit dialog still behaves the same across sections.
                    incrementCheckCount();
                  }}
                  labelClassName="text-base font-medium text-foreground"
                />
              ))}
            </div>
          </QueryStateHandler>
        </div>
      </div>
    </section>
  );
}
