import { mapSkinTreatLabel } from "libs/util/mapSkinTreatLabel";

export type HomeSkinTreatSectionConfig = {
  category: "routine" | "colors" | "make_up" | "barrier" | "contour" | "fats" | "hairs";
  title: string;
  defaultOpen?: boolean;
};

const HOME_SKIN_TREAT_SECTIONS: HomeSkinTreatSectionConfig[] = [
  { category: "routine", title: "Routines", defaultOpen: true },
  { category: "colors", title: "Colors" },
  { category: "make_up", title: "Make Ups" },
  { category: "barrier", title: "Barriers" },
  { category: "contour", title: "Contours" },
  { category: "fats", title: "Fats" },
  { category: "hairs", title: "Hairs" },
];

export function getHomeSkinTreatSections() {
  return HOME_SKIN_TREAT_SECTIONS.map((section) => {
    const label = mapSkinTreatLabel(section.title);

    return {
      ...section,
      label,
    };
  });
}
