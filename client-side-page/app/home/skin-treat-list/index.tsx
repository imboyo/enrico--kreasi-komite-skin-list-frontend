"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { QueryStateHandler } from "components/atomic/molecule/QueryStateHandler";
import { RoutineListSkeleton } from "components/atomic/molecule/RoutineListSkeleton";
import { useCheckableItems } from "hooks/useCheckableItems";
import { useRoutineCheckStore } from "client-side-page/home/routine-check-store";

import { ListItem } from "client-side-page/app/home/skin-treat-list/ListItem";
import {
  useSkinTreatChecklistUpdate,
  type SkinTreatListItem,
} from "client-side-page/app/home/util/useSkinTreatChecklistUpdate";

type SkinTreatListResponse<TItem extends SkinTreatListItem> = {
  data: TItem[];
  meta: {
    mode: string;
  };
};

type SkinTreatListProps<
  TItem extends SkinTreatListItem,
  TQueryData = SkinTreatListResponse<TItem>,
> = {
  queryKey: readonly unknown[];
  queryFn: () => Promise<TQueryData>;
  select?: (data: TQueryData) => SkinTreatListResponse<TItem>;
  errorTitle: string;
  emptyTitle: string;
  emptyDescription: string;
  staleTime?: number;
  gcTime?: number;
  deletingItemId?: string | null;
  onItemClick: (item: TItem) => void;
};

export function SkinTreatList<
  TItem extends SkinTreatListItem,
  TQueryData = SkinTreatListResponse<TItem>,
>({
  queryKey,
  queryFn,
  select,
  errorTitle,
  emptyTitle,
  emptyDescription,
  staleTime,
  gcTime,
  deletingItemId,
  onItemClick,
}: SkinTreatListProps<TItem, TQueryData>) {
  const query = useQuery<TQueryData, Error, SkinTreatListResponse<TItem>>({
    queryKey,
    queryFn,
    select,
    staleTime,
    gcTime,
  });

  const items = useMemo(() => query.data?.data ?? [], [query.data?.data]);

  const { resolvedItems, setChecked } = useCheckableItems(items);
  const incrementCheckCount = useRoutineCheckStore((state) => state.increment);
  const { updateChecked, syncingItemIds } = useSkinTreatChecklistUpdate<
    TItem,
    TQueryData
  >({
    queryKey,
    setChecked,
  });

  return (
    <QueryStateHandler
      query={query}
      skeleton={<RoutineListSkeleton />}
      isEmpty={resolvedItems.length === 0}
      errorTitle={errorTitle}
      emptyTitle={emptyTitle}
      emptyDescription={emptyDescription}
      contentClassName="flex flex-col gap-2.5"
    >
      {resolvedItems.map((item) => (
        <ListItem
          key={item.id}
          id={item.id}
          label={item.label}
          isChecked={item.isChecked}
          isSyncing={syncingItemIds.has(item.id)}
          isDeleting={deletingItemId === item.id}
          checkboxId={`${queryKey.join("-")}-${item.id}`}
          onCheck={(checked) => {
            void updateChecked(item, checked).then((didUpdate) => {
              if (didUpdate) {
                incrementCheckCount();
              }
            });
          }}
          onDetailOpen={() => {
            if (deletingItemId === item.id) {
              return;
            }

            onItemClick(item);
          }}
        />
      ))}
    </QueryStateHandler>
  );
}
