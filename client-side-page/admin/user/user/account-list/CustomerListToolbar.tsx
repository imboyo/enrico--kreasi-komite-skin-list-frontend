import {
  ListToolbar,
  type ListToolbarOption,
} from "components/atomic/molecule/ListToolbar";
import type { AdminUserStatus } from "mock-backend/admin/user/users";

export type UserSortValue =
  | "name-asc"
  | "name-desc"
  | "email-asc"
  | "status-asc";

type CustomerListToolbarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedStatuses: AdminUserStatus[];
  onSelectedStatusesChange: (statuses: AdminUserStatus[]) => void;
  sortValue: UserSortValue;
  onSortChange: (value: UserSortValue) => void;
};

const USER_STATUS_FILTER_OPTIONS: ListToolbarOption<AdminUserStatus>[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

const USER_SORT_OPTIONS: ListToolbarOption<UserSortValue>[] = [
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
  { value: "email-asc", label: "Email A-Z" },
  { value: "status-asc", label: "Status A-Z" },
];

export const DEFAULT_USER_SORT_VALUE: UserSortValue = "name-asc";

export function CustomerListToolbar({
  searchValue,
  onSearchChange,
  selectedStatuses,
  onSelectedStatusesChange,
  sortValue,
  onSortChange,
}: CustomerListToolbarProps) {
  function handleReset() {
    onSearchChange("");
    onSelectedStatusesChange([]);
    onSortChange(DEFAULT_USER_SORT_VALUE);
  }

  return (
    <ListToolbar
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search users"
      filterTitle="Filter users"
      filterDescription="Choose which user statuses should be visible."
      filterOptions={USER_STATUS_FILTER_OPTIONS}
      selectedFilterValues={selectedStatuses}
      onFilterValuesChange={onSelectedStatusesChange}
      sortLabel="Sort users"
      sortValue={sortValue}
      sortOptions={USER_SORT_OPTIONS}
      onSortChange={onSortChange}
      onReset={handleReset}
    />
  );
}
