"use client";

import { useQuery } from "@tanstack/react-query";

import { QueryStateHandler } from "@/components/atomic/molecule/QueryStateHandler";
import { Skeleton as RoutineListSkeleton } from "@/components/domain/routine-list/Skeleton";
import { useCheckableItems } from "@/hooks/useCheckableItems";
import { useRoutineCheckStore } from "@/client-side-page/home/routine-check-store";

import { ListItem } from "./ListItem";

export type DashboardListItem = {
  id: string;
  label: string;
  description: string;
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
  onItemClick: (item: TItem) => void;
};

export function DashboardList<TItem extends DashboardListItem>({
  queryKey,
  queryFn,
  errorTitle,
  emptyTitle,
  emptyDescription,
  onItemClick,
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
        {/* Checklist section */}
        <div className="space-y-3">
          {resolvedItems.map((item) => (
            <ListItem
              key={item.id}
              id={item.id}
              label={item.label}
              isChecked={item.isChecked}
              checkboxId={`${queryKey.join("-")}-${item.id}`}
              onCheck={(checked) => {
                setChecked(item.id, checked);
                incrementCheckCount();
              }}
              onDetailOpen={() => onItemClick(item)}
            />
          ))}
        </div>
      </QueryStateHandler>
    </div>
  );
}
