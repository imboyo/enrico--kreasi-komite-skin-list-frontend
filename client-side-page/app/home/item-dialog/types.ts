import type { DashboardItemEditFormApi } from "@/hooks/useDashboardItemEditForm";
import type { SkinTreatCategory } from "@/backend-service/user/skin-treat";
import type { DashboardEditableItem } from "@/mock-backend/user/dashboard/item-store";

export type DialogMode = "view" | "edit";

export type ItemDialogProps = {
  item: DashboardEditableItem | null;
  category: SkinTreatCategory | null;
  isDeleting?: boolean;
  onClose: () => void;
  onSave?: (updated: DashboardEditableItem, category: SkinTreatCategory) => void;
  onDeleteStart?: (item: DashboardEditableItem) => void;
  onDelete?: (item: DashboardEditableItem) => void;
  onDeleteError?: (item: DashboardEditableItem) => void;
};

export type ItemDialogHeaderProps = {
  mode: DialogMode;
  itemLabel: string;
  isPending: boolean;
  isDeleting: boolean;
  onEnterEdit: () => void;
  onCancelEdit: () => void;
};

export type ItemDialogViewContentProps = {
  item: DashboardEditableItem;
  isDeleting: boolean;
  onDelete: () => void;
};

export type ItemDialogEditFormProps = {
  form: DashboardItemEditFormApi;
  isPending: boolean;
  isDeleting?: boolean;
  serverError: string | null;
  onSave: () => Promise<void>;
  onCancel: () => void;
  onDelete: () => void;
};

export type ItemDialogPanelProps = {
  item: DashboardEditableItem;
  category: SkinTreatCategory;
  isDeleting?: boolean;
  onClose: () => void;
  onSave?: (updated: DashboardEditableItem, category: SkinTreatCategory) => void;
  onDeleteStart?: (item: DashboardEditableItem) => void;
  onDelete?: (item: DashboardEditableItem) => void;
  onDeleteError?: (item: DashboardEditableItem) => void;
};
