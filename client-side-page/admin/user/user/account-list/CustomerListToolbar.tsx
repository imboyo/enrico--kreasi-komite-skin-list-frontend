"use client";

import {
  ListToolbar,
  type ListToolbarOption,
} from "components/atomic/molecule/ListToolbar";
import type { AccountStatus } from "backend-service/admin/account";

import { useUserAccountListStore } from "./UserAccountListProvider";
import {
  type UserSortValue,
} from "./utils/userAccountListSort";

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

export function CustomerListToolbar() {
  const searchValue = useUserAccountListStore((state) => state.searchValue);
  const selectedStatuses = useUserAccountListStore(
    (state) => state.selectedStatuses,
  );
  const sortValue = useUserAccountListStore((state) => state.sortValue);
  const handleSearchChange = useUserAccountListStore(
    (state) => state.handleSearchChange,
  );
  const handleSelectedStatusesChange = useUserAccountListStore(
    (state) => state.handleSelectedStatusesChange,
  );
  const handleSortChange = useUserAccountListStore(
    (state) => state.handleSortChange,
  );
  const handleReset = useUserAccountListStore(
    (state) => state.resetToolbarState,
  );

  return (
    <ListToolbar
      searchValue={searchValue}
      onSearchChange={handleSearchChange}
      searchPlaceholder="Cari pelanggan"
      filterTitle="Filter pelanggan"
      filterDescription="Pilih status pelanggan yang ingin ditampilkan."
      filterOptions={USER_STATUS_FILTER_OPTIONS}
      selectedFilterValues={selectedStatuses}
      onFilterValuesChange={handleSelectedStatusesChange}
      sortLabel="Urutkan pelanggan"
      sortValue={sortValue}
      sortOptions={USER_SORT_OPTIONS}
      onSortChange={handleSortChange}
      onReset={handleReset}
    />
  );
}
