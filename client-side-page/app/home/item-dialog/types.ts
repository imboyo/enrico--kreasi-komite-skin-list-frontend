import type { DashboardItemEditFormApi } from "@/hooks/useDashboardItemEditForm";
import type {
  DashboardEditableItem,
  DashboardItemCategory,
} from "@/mock-backend/user/dashboard/item-store";

export type DialogMode = "view" | "edit";

export type ItemDialogProps = {
  item: DashboardEditableItem | null;
  category: DashboardItemCategory | null;
  onClose: () => void;
  onSave?: (updated: DashboardEditableItem) => void;
  onDelete?: (item: DashboardEditableItem) => void;
};

export type ItemDialogHeaderProps = {
  mode: DialogMode;
  itemLabel: string;
  isPending: boolean;
  onEnterEdit: () => void;
  onCancelEdit: () => void;
};

export type ItemDialogViewContentProps = {
  item: DashboardEditableItem;
  onDelete: () => void;
};

export type ItemDialogEditFormProps = {
  form: DashboardItemEditFormApi;
  isPending: boolean;
  serverError: string | null;
  onSave: () => Promise<void>;
  onCancel: () => void;
  onDelete: () => void;
};

export type ItemDialogPanelProps = {
  item: DashboardEditableItem;
  category: DashboardItemCategory;
  onClose: () => void;
  onSave?: (updated: DashboardEditableItem) => void;
  onDelete?: (item: DashboardEditableItem) => void;
};
