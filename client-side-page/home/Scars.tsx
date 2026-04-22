"use client";

import { HomeChecklistSection } from "@/client-side-page/home/HomeChecklistSection";
import { getScars } from "@/mock-backend/skin-care/get-scars";

export function Scars() {
  return (
    <HomeChecklistSection
      title="Scars"
      queryKey={["skin-care-scars"]}
      queryFn={() => getScars()}
      errorTitle="Scar list is unavailable."
      emptyTitle="No scars available yet."
      emptyDescription="Add your scar data or retry the request to load this checklist again."
    />
  );
}
