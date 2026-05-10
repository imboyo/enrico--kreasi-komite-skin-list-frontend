import {
  ListToolbar,
  type ListToolbarOption,
} from "components/atomic/molecule/ListToolbar";
import type { AccountStatus } from "backend-service/admin/account/index";

export type UserSortValue =
  | "name-asc"
  | "name-desc"
  | "phone-asc"
  | "phone-desc"
  | "status-asc";

type CustomerListToolbarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedStatuses: AccountStatus[];
  onSelectedStatusesChange: (statuses: AccountStatus[]) => void;
  sortValue: UserSortValue;
  onSortChange: (value: UserSortValue) => void;
};

const USER_STATUS_FILTER_OPTIONS: ListToolbarOption<AccountStatus>[] = [
  { value: "ACTIVE", label: "Aktif" },
  { value: "INACTIVE", label: "Tidak Aktif" },
];

const USER_SORT_OPTIONS: ListToolbarOption<UserSortValue>[] = [
  { value: "name-asc", label: "Nama A-Z" },
  { value: "name-desc", label: "Nama Z-A" },
  { value: "phone-asc", label: "Telepon A-Z" },
  { value: "phone-desc", label: "Telepon Z-A" },
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
      searchPlaceholder="Cari pelanggan"
      filterTitle="Filter pelanggan"
      filterDescription="Pilih status pelanggan yang ingin ditampilkan."
      filterOptions={USER_STATUS_FILTER_OPTIONS}
      selectedFilterValues={selectedStatuses}
      onFilterValuesChange={onSelectedStatusesChange}
      sortLabel="Urutkan pelanggan"
      sortValue={sortValue}
      sortOptions={USER_SORT_OPTIONS}
      onSortChange={onSortChange}
      onReset={handleReset}
    />
  );
}
