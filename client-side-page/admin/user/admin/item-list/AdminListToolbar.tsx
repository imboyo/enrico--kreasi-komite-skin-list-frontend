import type { AdminAccount } from "backend-service/admin/account/admin";

import {
  ListToolbar,
  type ListToolbarOption,
} from "components/atomic/molecule/ListToolbar";

export type AdminStatusFilterValue = AdminAccount["status"];

export type AdminSortValue =
  | "full-name-asc"
  | "full-name-desc"
  | "email-asc"
  | "status-asc";

type AdminListToolbarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedStatuses: AdminStatusFilterValue[];
  onSelectedStatusesChange: (statuses: AdminStatusFilterValue[]) => void;
  sortValue: AdminSortValue;
  onSortChange: (value: AdminSortValue) => void;
};

const ADMIN_STATUS_FILTER_OPTIONS: ListToolbarOption<AdminStatusFilterValue>[] =
  [
    // Only expose the operational admin states that should be filterable here.
    { value: "ACTIVE", label: "Aktif" },
    { value: "INACTIVE", label: "Nonaktif" },
  ];

const ADMIN_SORT_OPTIONS: ListToolbarOption<AdminSortValue>[] = [
  { value: "full-name-asc", label: "Nama A-Z" },
  { value: "full-name-desc", label: "Nama Z-A" },
  { value: "email-asc", label: "Email A-Z" },
  { value: "status-asc", label: "Status A-Z" },
];

export const DEFAULT_ADMIN_SORT_VALUE: AdminSortValue = "full-name-asc";

export function AdminListToolbar({
  searchValue,
  onSearchChange,
  selectedStatuses,
  onSelectedStatusesChange,
  sortValue,
  onSortChange,
}: AdminListToolbarProps) {
  function handleReset() {
    onSearchChange("");
    onSelectedStatusesChange([]);
    onSortChange(DEFAULT_ADMIN_SORT_VALUE);
  }

  return (
    <ListToolbar
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      searchPlaceholder="Cari admin"
      filterTitle="Filter status admin"
      filterDescription="Pilih status akun admin yang ingin ditampilkan."
      filterOptions={ADMIN_STATUS_FILTER_OPTIONS}
      selectedFilterValues={selectedStatuses}
      onFilterValuesChange={onSelectedStatusesChange}
      sortLabel="Urutkan admin"
      sortValue={sortValue}
      sortOptions={ADMIN_SORT_OPTIONS}
      onSortChange={onSortChange}
      onReset={handleReset}
    />
  );
}
