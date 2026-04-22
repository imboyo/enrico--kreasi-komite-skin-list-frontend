"use client";

import { HomeChecklistSection } from "@/client-side-page/home/HomeChecklistSection";
import { getColors } from "@/mock-backend/skin-care/get-colors";

export function Colors() {
  return (
    <HomeChecklistSection
      title="Colors"
      defaultOpen={false}
      queryKey={["skin-care-colors"]}
      queryFn={() => getColors()}
      errorTitle="Color list is unavailable."
      emptyTitle="No colors available yet."
      emptyDescription="Add your color data or retry the request to load this checklist again."
    />
  );
}
