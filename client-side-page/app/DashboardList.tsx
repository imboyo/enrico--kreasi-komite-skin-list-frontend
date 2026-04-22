"use client";

import { useQuery } from "@tanstack/react-query";
import { ChecklistItemCard } from "@/components/atomic/molecule/ChecklistItemCard";
import { QueryStateHandler } from "@/components/atomic/molecule/QueryStateHandler";
import { Skeleton as RoutineListSkeleton } from "@/components/domain/routine-list/Skeleton";
import { useCheckableItems } from "@/hooks/useCheckableItems";
import { useRoutineCheckStore } from "@/client-side-page/home/routine-check-store";

type DashboardListItem = {
  id: string;
  label: string;
  isChecked: boolean;
};

type DashboardListResponse<TItem extends DashboardListItem> = {
  data: TItem[];
  meta: {
    mode: string;
  };
};

type DashboardListProps<TItem extends DashboardListItem> = {
  queryKey: string[];
  queryFn: () => Promise<DashboardListResponse<TItem>>;
  errorTitle: string;
  emptyTitle: string;
  emptyDescription: string;
};

export function DashboardList<TItem extends DashboardListItem>({
  queryKey,
  queryFn,
  errorTitle,
  emptyTitle,
  emptyDescription,
}: DashboardListProps<TItem>) {
  const query = useQuery<DashboardListResponse<TItem>>({
    queryKey,
    queryFn,
  });

  const items = query.data?.data ?? [];
  const { resolvedItems, setChecked } = useCheckableItems(items);
  const incrementCheckCount = useRoutineCheckStore((state) => state.increment);

  return (
    <div className="mt-4">
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
            <ChecklistItemCard
              key={item.id}
              checked={item.isChecked}
              label={item.label}
              onCheckedChange={(event) => {
                setChecked(item.id, event.currentTarget.checked);
                incrementCheckCount();
              }}
              labelClassName="text-base font-medium text-foreground"
            />
          ))}
        </div>
      </QueryStateHandler>
    </div>
  );
}
