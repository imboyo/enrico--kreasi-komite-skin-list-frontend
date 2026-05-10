"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";

import type { AdminAccount } from "@/backend-service/index";
import { Button } from "components/atomic/atom/Button";

import {
  ListToolbar,
  type ListToolbarOption,
} from "components/atomic/molecule/ListToolbar";
import { AddAdminDialog } from "client-side-page/admin/user/admin/item-list/admin-list-toolbar/add-admin-dialog/AddAdminDialog";

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
  const [isAddAdminDialogOpen, setIsAddAdminDialogOpen] = useState(false);

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
      actions={
        <>
          <Button
            type="button"
            size="md"
            leadingIcon={<Icon icon="material-symbols:person-add-rounded" />}
            className="w-full sm:ml-auto sm:w-auto"
            onClick={() => setIsAddAdminDialogOpen(true)}
          >
            Tambah admin
          </Button>

          <AddAdminDialog
            open={isAddAdminDialogOpen}
            onOpenChange={setIsAddAdminDialogOpen}
          />
        </>
      }
    />
  );
}
