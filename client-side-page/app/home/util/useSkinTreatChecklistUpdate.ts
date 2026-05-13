"use client";

import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { updateSkinTreat } from "backend-service/index";

export type SkinTreatListItem = {
  id: string;
  label: string;
  description: string;
  isChecked: boolean;
};

type ChecklistSyncParams = {
  queryKey: readonly unknown[];
  setChecked: (id: string, isChecked: boolean) => void;
};

export function syncChecklistQueryData<TQueryData>(
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

export function useSkinTreatChecklistUpdate<
  TItem extends SkinTreatListItem,
  TQueryData,
>({ queryKey, setChecked }: ChecklistSyncParams) {
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
