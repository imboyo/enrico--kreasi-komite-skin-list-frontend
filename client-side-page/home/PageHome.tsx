"use client";

import { Colors } from "@/client-side-page/home/Colors";
import { MakeUps } from "@/client-side-page/home/MakeUps";
import { Routines } from "@/client-side-page/home/Routines";
import { Scars } from "@/client-side-page/home/Scars";
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
    <main className="mx-auto flex w-full max-w-[500px] flex-col gap-6 px-4 py-4">
      {/* Renders itself automatically when the check limit is hit */}
      <LimitDialog />

      <section className="flex flex-col">
        <h1 className="text-[40px] font-medium">Skin Checklist</h1>
        <h6 className="text-muted-foreground text-sm">
          &#34;Track your routine, tone, make up, and skin concerns in one
          place.”
        </h6>
      </section>
      <Routines />
      <Colors />
      <MakeUps />
      <Scars />
    </main>
  );
};
