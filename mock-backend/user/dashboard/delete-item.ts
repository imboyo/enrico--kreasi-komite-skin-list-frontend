import { z } from "zod";

import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

import {
  deleteDashboardItemFromStore,
  type DashboardEditableItem,
  type DashboardItemCategory,
} from "./item-store";

export const dashboardItemDeleteSchema = z.object({
  category: z.enum([
    "routines",
    "colors",
    "make-ups",
    "barriers",
    "scars",
    "contours",
    "fats",
    "hairs",
  ]),
  itemId: z.string().trim().min(1, "Item id is required"),
});

export type DeleteDashboardItemPayload = z.infer<typeof dashboardItemDeleteSchema>;

export type DeleteDashboardItemResponse = {
  item: DashboardEditableItem;
};

export class DashboardItemNotFoundError extends Error {
  constructor(message = "Dashboard item was not found.") {
    super(message);
    this.name = "DashboardItemNotFoundError";
  }
}

export async function deleteDashboardItem(
  payload: DeleteDashboardItemPayload,
  control: MockControlInput = {},
): Promise<DeleteDashboardItemResponse> {
  await simulateMockRequest(control);

  const validatedPayload = dashboardItemDeleteSchema.parse(payload) as {
    category: DashboardItemCategory;
    itemId: string;
  };

  const deletedItem = deleteDashboardItemFromStore(
    validatedPayload.category,
    validatedPayload.itemId,
  );

  if (!deletedItem) {
    throw new DashboardItemNotFoundError();
  }

  return {
    item: deletedItem,
  };
}

export default deleteDashboardItem;
