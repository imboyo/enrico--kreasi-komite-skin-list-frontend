import {
  ListToolbar,
  type ListToolbarOption,
} from "components/atomic/molecule/ListToolbar";
import type { AdminManagerRole } from "mock-backend/admin/user/admins";

export type AdminSortValue = "name-asc" | "name-desc" | "email-asc" | "role-asc";

type AdminListToolbarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedRoles: AdminManagerRole[];
  onSelectedRolesChange: (roles: AdminManagerRole[]) => void;
  sortValue: AdminSortValue;
  onSortChange: (value: AdminSortValue) => void;
};

const ADMIN_ROLE_FILTER_OPTIONS: ListToolbarOption<AdminManagerRole>[] = [
  { value: "super-admin", label: "Super Admin" },
  { value: "moderator", label: "Moderator" },
  { value: "content-manager", label: "Content Manager" },
];

const ADMIN_SORT_OPTIONS: ListToolbarOption<AdminSortValue>[] = [
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
  { value: "email-asc", label: "Email A-Z" },
  { value: "role-asc", label: "Role A-Z" },
];

export const DEFAULT_ADMIN_SORT_VALUE: AdminSortValue = "name-asc";

export function AdminListToolbar({
  searchValue,
  onSearchChange,
  selectedRoles,
  onSelectedRolesChange,
  sortValue,
  onSortChange,
}: AdminListToolbarProps) {
  function handleReset() {
    onSearchChange("");
    onSelectedRolesChange([]);
    onSortChange(DEFAULT_ADMIN_SORT_VALUE);
  }

  return (
    <ListToolbar
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search admins"
      filterTitle="Filter admins"
      filterDescription="Choose which admin roles should be visible."
      filterOptions={ADMIN_ROLE_FILTER_OPTIONS}
      selectedFilterValues={selectedRoles}
      onFilterValuesChange={onSelectedRolesChange}
      sortLabel="Sort admins"
      sortValue={sortValue}
      sortOptions={ADMIN_SORT_OPTIONS}
      onSortChange={onSortChange}
      onReset={handleReset}
    />
  );
}
