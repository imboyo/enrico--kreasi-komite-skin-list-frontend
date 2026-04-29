"use client";

import { useQuery } from "@tanstack/react-query";

import { QueryStateHandler } from "@/components/atomic/molecule/QueryStateHandler";
import { getRoutines } from "@/mock-backend/skin-care/get-routines";

import { LoadingState } from "./PageAdminSkinRoutines/LoadingState";
import { RoutineCard } from "./PageAdminSkinRoutines/RoutineCard";

export function PageAdminSkinRoutines() {
  const routinesQuery = useQuery({
    queryKey: ["admin-skin-routines"],
    queryFn: async () => {
      return await getRoutines();
    },
  });

  const routines = routinesQuery.data?.data ?? [];

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
        skeleton={<LoadingState />}
        isEmpty={routines.length === 0}
        errorTitle="Failed to load routines."
        emptyTitle="No routines found."
        emptyDescription="Refresh the mock data and try again."
      >
        {/* Section: Routine card list */}
        <div className="flex flex-col gap-3">
          {routines.map((routine) => (
            <RoutineCard key={routine.id} routine={routine} />
          ))}
        </div>
      </QueryStateHandler>
    </div>
  );
}
