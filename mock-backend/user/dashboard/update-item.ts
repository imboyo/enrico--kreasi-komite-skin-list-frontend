import { z } from "zod";

import {
  simulateMockRequest,
  type MockControlInput,
} from "@/mock-backend/utils/mock-control";

import {
  updateDashboardItemInStore,
  type DashboardEditableItem,
  type DashboardItemCategory,
} from "./item-store";
export { DashboardItemNotFoundError } from "./delete-item";
import { DashboardItemNotFoundError } from "./delete-item";

export const dashboardItemEditSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(60, "Title must be 60 characters or less"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(280, "Description must be 280 characters or less"),
});

export type DashboardItemEditValues = z.infer<typeof dashboardItemEditSchema>;

export type UpdateDashboardItemPayload = DashboardItemEditValues & {
  category: DashboardItemCategory;
  itemId: string;
};

export type UpdateDashboardItemResponse = {
  item: DashboardEditableItem;
};

export async function updateDashboardItem(
  payload: UpdateDashboardItemPayload,
  control: MockControlInput = {},
): Promise<UpdateDashboardItemResponse> {
  await simulateMockRequest(control);

  const validatedPayload = dashboardItemEditSchema.parse({
    label: payload.label,
    description: payload.description,
  });

  const updatedItem = updateDashboardItemInStore(payload.category, payload.itemId, validatedPayload);

  if (!updatedItem) {
    throw new DashboardItemNotFoundError();
  }

  return {
    item: updatedItem,
  };
}

export default updateDashboardItem;
