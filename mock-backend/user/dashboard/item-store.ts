import {
  BARRIERS,
  type SkinCareBarrierItem,
} from "@/mock-backend/skin-care/get-barriers";
import { COLORS, type SkinCareColorItem } from "@/mock-backend/skin-care/get-colors";
import {
  MAKE_UPS,
  type SkinCareMakeUpItem,
} from "@/mock-backend/skin-care/get-make-ups";
import {
  ROUTINES,
  type SkinCareRoutineItem,
} from "@/mock-backend/skin-care/get-routines";
import { SCARS, type SkinCareScarItem } from "@/mock-backend/skin-care/get-scars";

export type DashboardEditableItem =
  | SkinCareRoutineItem
  | SkinCareColorItem
  | SkinCareMakeUpItem
  | SkinCareBarrierItem
  | SkinCareScarItem;

export type DashboardItemCategory =
  | "routines"
  | "colors"
  | "make-ups"
  | "barriers"
  | "scars"
  | "contours"
  | "fats"
  | "hairs";

type DashboardItemCollections = Record<DashboardItemCategory, DashboardEditableItem[]>;

function cloneItems(items: DashboardEditableItem[]): DashboardEditableItem[] {
  return items.map((item) => ({ ...item }));
}

function createDashboardItemCollections(): DashboardItemCollections {
  return {
    routines: cloneItems(ROUTINES),
    colors: cloneItems(COLORS),
    "make-ups": cloneItems(MAKE_UPS),
    barriers: cloneItems(BARRIERS),
    scars: cloneItems(SCARS),
    contours: [],
    fats: [],
    hairs: [],
  };
}

let dashboardItemCollections = createDashboardItemCollections();

export function getDashboardItems(category: DashboardItemCategory): DashboardEditableItem[] {
  return cloneItems(dashboardItemCollections[category]);
}

export function updateDashboardItemInStore(
  category: DashboardItemCategory,
  itemId: string,
  values: Pick<DashboardEditableItem, "label" | "description">,
): DashboardEditableItem | null {
  const collection = dashboardItemCollections[category];
  const itemIndex = collection.findIndex((item) => item.id === itemId);

  if (itemIndex === -1) {
    return null;
  }

  const currentItem = collection[itemIndex];
  const updatedItem: DashboardEditableItem = {
    ...currentItem,
    label: values.label,
    description: values.description,
  };

  collection[itemIndex] = updatedItem;

  return { ...updatedItem };
}

export function deleteDashboardItemFromStore(
  category: DashboardItemCategory,
  itemId: string,
): DashboardEditableItem | null {
  const collection = dashboardItemCollections[category];
  const itemIndex = collection.findIndex((item) => item.id === itemId);

  if (itemIndex === -1) {
    return null;
  }

  const [deletedItem] = collection.splice(itemIndex, 1);

  return deletedItem ? { ...deletedItem } : null;
}

export function resetDashboardItemStore() {
  dashboardItemCollections = createDashboardItemCollections();
}
