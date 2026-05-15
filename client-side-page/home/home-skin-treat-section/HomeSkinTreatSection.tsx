"use client";

import { HomeChecklistSection } from "@/client-side-page/home/home-checklist-section/HomeChecklistSection";
import {
  getHomeDefaultSkinTreatQueryKey,
  listHomeDefaultSkinTreat,
  type HomeDefaultSkinTreatItem,
} from "@/client-side-page/home/utils/defaultSkinTreat";
import { mapSkinTreatLabel } from "libs/util/mapSkinTreatLabel";

export type HomeSkinTreatCategory =
  | "routine"
  | "colors"
  | "make_up"
  | "barrier"
  | "contour"
  | "fats"
  | "hairs";

type HomeSkinTreatSectionProps = {
  category: HomeSkinTreatCategory;
  title: string;
  defaultOpen?: boolean;
};

export function HomeSkinTreatSection({ category, title, defaultOpen = false }: HomeSkinTreatSectionProps) {
  const mappedLabel = mapSkinTreatLabel(title);

  return (
    <HomeChecklistSection<HomeDefaultSkinTreatItem>
      title={mappedLabel}
      defaultOpen={defaultOpen}
      queryKey={getHomeDefaultSkinTreatQueryKey(category)}
      queryFn={() => listHomeDefaultSkinTreat(category)}
      errorTitle={`Daftar ${mappedLabel.toLowerCase()} tidak tersedia.`}
      emptyTitle={`Belum ada data ${mappedLabel.toLowerCase()}.`}
      emptyDescription={`Data ${mappedLabel.toLowerCase()} belum tersedia. Admin akan segera mengisi data ${mappedLabel.toLowerCase()} untuk Anda.`}
    />
  );
}
