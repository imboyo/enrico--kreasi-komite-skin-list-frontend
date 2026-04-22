"use client";

import { HomeChecklistSection } from "@/client-side-page/home/HomeChecklistSection";
import { getRoutines } from "@/mock-backend/skin-care/get-routines";

export function Routines() {
  return (
    <HomeChecklistSection
      title="Routines"
      queryKey={["skin-care-routines"]}
      queryFn={() => getRoutines()}
      errorTitle="Routine list is unavailable."
      emptyTitle="No routines available yet."
      emptyDescription="Add your routine data or retry the request to load this checklist again."
    />
  );
}
