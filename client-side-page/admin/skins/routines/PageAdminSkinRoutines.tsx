"use client";

import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";

import { SkinCareAdminCard } from "components/atomic/organism/SkinCareAdminCard";
import { Button } from "components/atomic/atom/Button";
import {
  MenuDropdown,
  MenuDropdownItem,
  MenuDropdownSeparator,
} from "components/atomic/molecule/MenuDropdown";
import { QueryStateHandler } from "components/atomic/molecule/QueryStateHandler";
import {
  getRoutines,
  type SkinCareRoutineItem,
} from "mock-backend/skin-care/get-routines";
import { SkinCareAdminCardSkeleton } from "components/atomic/molecule/SkinCareAdminCardSkeleton";

export function PageAdminSkinRoutines() {
  const routinesQuery = useQuery({
    queryKey: ["admin-skin-routines"],
    queryFn: async () => {
      return await getRoutines();
    },
  });

  const routines = routinesQuery.data?.data ?? [];

  function handleRoutineAction(action: string, routine: SkinCareRoutineItem) {
    // Keep each endpoint action isolated so this page can later call
    // routine-specific edit, hide, or delete APIs.
    console.log(`Admin routine action: ${action}`, routine);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Section: Skin routines header */}
      <section className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Skin Management
        </p>
        <h1 className="text-2xl font-semibold text-foreground">Routines</h1>
      </section>

      <QueryStateHandler
        query={routinesQuery}
        skeleton={<SkinCareAdminCardSkeleton />}
        isEmpty={routines.length === 0}
        errorTitle="Failed to load routines."
        emptyTitle="No routines found."
        emptyDescription="Refresh the mock data and try again."
      >
        {/* Section: Routine card list */}
        <div className="flex flex-col gap-3">
          {routines.map((routine) => (
            <SkinCareAdminCard
              key={routine.id}
              item={routine}
              icon={
                <Icon
                  icon="material-symbols:spa-outline-rounded"
                  className="size-6"
                />
              }
              actions={
                <MenuDropdown
                  align="start"
                  side="bottom"
                  trigger={
                    <Button
                      variant="ghost"
                      size="sm"
                      iconOnly
                      aria-label={`Open actions for ${routine.label}`}
                      className="rounded-full"
                    >
                      <Icon icon="material-symbols:more-vert" />
                    </Button>
                  }
                >
                  {/* Section: Routine row actions */}
                  <MenuDropdownItem
                    icon={<Icon icon="material-symbols:edit-outline-rounded" />}
                    onSelect={() => handleRoutineAction("edit", routine)}
                  >
                    Edit routine
                  </MenuDropdownItem>
                  <MenuDropdownSeparator />
                  <MenuDropdownItem
                    destructive
                    icon={<Icon icon="material-symbols:delete-outline" />}
                    onSelect={() => handleRoutineAction("delete", routine)}
                  >
                    Delete routine
                  </MenuDropdownItem>
                </MenuDropdown>
              }
            />
          ))}
        </div>
      </QueryStateHandler>
    </div>
  );
}
