"use client";

import { useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { QueryStateHandler } from "components/atomic/molecule/QueryStateHandler";
import { RoutineListSkeleton } from "components/atomic/molecule/RoutineListSkeleton";
import { useCheckableItems } from "hooks/useCheckableItems";
import { useRoutineCheckStore } from "client-side-page/home/routine-check-store";
import { updateSkinTreat } from "backend-service/user/skin-treat/index";

import { ListItem } from "components/atomic/organism/user-skin-treat-list/ListItem";

export type SkinTreatListItem = {
  id: string;
  label: string;
  description: string;
  isChecked: boolean;
};

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

type ChecklistSyncParams = {
  queryKey: readonly unknown[];
  setChecked: (id: string, isChecked: boolean) => void;
};

function syncChecklistQueryData<TQueryData>(
  data: TQueryData | undefined,
  itemId: string,
  isChecked: boolean,
): TQueryData | undefined {
  if (!data || typeof data !== "object") return data;

  const dataWithItems = data as { data?: unknown };

  if (!Array.isArray(dataWithItems.data)) return data;

  let hasUpdatedItem = false;
  const nextItems = dataWithItems.data.map((item) => {
    if (!item || typeof item !== "object") return item;

    const checklistItem = item as {
      id?: string;
      uuid?: string;
      isChecked?: boolean;
      is_check?: boolean;
    };
    const currentId = checklistItem.id ?? checklistItem.uuid;

    if (currentId !== itemId) return item;

    hasUpdatedItem = true;

    return {
      ...checklistItem,
      ...(typeof checklistItem.isChecked === "boolean" ? { isChecked } : {}),
      ...(typeof checklistItem.is_check === "boolean"
        ? { is_check: isChecked }
        : {}),
    };
  });

  if (!hasUpdatedItem) return data;

  return {
    ...data,
    data: nextItems,
  };
}

/**
 * Sends checklist updates directly to the backend and only updates local state
 * after the request succeeds. Each item is locked while its request is in flight.
 */
function useSkinTreatChecklistUpdate<
  TItem extends SkinTreatListItem,
  TQueryData,
>({
  queryKey,
  setChecked,
}: ChecklistSyncParams) {
  const queryClient = useQueryClient();
  const [syncingItemIds, setSyncingItemIds] = useState<Set<string>>(
    () => new Set(),
  );
  const syncingByIdRef = useRef<Record<string, boolean>>({});

  function setItemSyncing(id: string, isSyncing: boolean) {
    setSyncingItemIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (isSyncing) {
        nextIds.add(id);
      } else {
        nextIds.delete(id);
      }

      return nextIds;
    });
  }

  async function updateChecked(item: TItem, checked: boolean) {
    const id = item.id;

    if (syncingByIdRef.current[id]) return false;

    syncingByIdRef.current[id] = true;
    setItemSyncing(id, true);

    try {
      const updatedTreat = await updateSkinTreat(id, { is_check: checked });
      const nextChecked = updatedTreat.is_check;

      setChecked(id, nextChecked);
      queryClient.setQueryData<TQueryData>(queryKey, (currentData) =>
        syncChecklistQueryData(currentData, id, nextChecked),
      );

      return true;
    } catch {
      return false;
    } finally {
      syncingByIdRef.current[id] = false;
      setItemSyncing(id, false);
    }
  }

  return { updateChecked, syncingItemIds };
}

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
    <div className="mt-4">
      {/* Query state section */}
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
        </div>
      </QueryStateHandler>
    </div>
  );
}
