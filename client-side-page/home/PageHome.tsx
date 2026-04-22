"use client";

import { Routines } from "@/client-side-page/home/Routines";
import { LimitDialog } from "@/components/domain/routine-list/LimitDialog";
import { useRoutineCheckStore } from "@/client-side-page/home/routine-check-store";
import { useEffect } from "react";

export const PageHome = () => {
  const reset = useRoutineCheckStore((s) => s.reset);

  // Reset the shared check counter when this component unmounts so the store
  // doesn't carry stale state into the next mount
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <main className="px-4 py-4 flex flex-col gap-6">
      {/* Renders itself automatically when the check limit is hit */}
      <LimitDialog />

      <section className="flex flex-col">
        <h1 className="text-[40px] font-medium">Routine</h1>
        <h6 className="text-muted-foreground text-sm">
          &#34;Your daily foundation. Consistency beats everything.”
        </h6>
      </section>
      <Routines />
    </main>
  );
};
