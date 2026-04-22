"use client";

import { HomeChecklistSection } from "@/client-side-page/home/HomeChecklistSection";
import { getMakeUps } from "@/mock-backend/skin-care/get-make-ups";

export function MakeUps() {
  return (
    <HomeChecklistSection
      title="Make Ups"
      queryKey={["skin-care-make-ups"]}
      queryFn={() => getMakeUps()}
      errorTitle="Make up list is unavailable."
      emptyTitle="No make ups available yet."
      emptyDescription="Add your make up data or retry the request to load this checklist again."
    />
  );
}
