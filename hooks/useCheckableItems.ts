"use client";

import { useState } from "react";

type CheckableItem = { id: string; isChecked: boolean };

function buildInitialCheckedState(items: CheckableItem[]) {
  return Object.fromEntries(
    items.map((item) => [item.id, item.isChecked]),
  ) as Record<string, boolean>;
}

function mergeCheckedState(
  items: CheckableItem[],
  currentState: Record<string, boolean>,
) {
  return items.reduce<Record<string, boolean>>((nextState, item) => {
    nextState[item.id] = currentState[item.id] ?? item.isChecked;
    return nextState;
  }, {});
}

/**
 * Manages per-item checked state for a list of checkable items.
 * User interactions override the server-provided `isChecked` value,
 * while new items from the server still get their default state.
 */
export function useCheckableItems<T extends CheckableItem>(items: T[]) {
  const [checkedById, setCheckedById] = useState<Record<string, boolean>>({});

  const resolvedCheckedState =
    items.length === 0
      ? buildInitialCheckedState(items)
      : mergeCheckedState(items, checkedById);

  const resolvedItems = items.map((item) => ({
    ...item,
    isChecked: resolvedCheckedState[item.id],
  }));

  function setChecked(id: string, isChecked: boolean) {
    setCheckedById((currentState) => ({
      ...mergeCheckedState(items, currentState),
      [id]: isChecked,
    }));
  }

  return { resolvedItems, setChecked };
}
