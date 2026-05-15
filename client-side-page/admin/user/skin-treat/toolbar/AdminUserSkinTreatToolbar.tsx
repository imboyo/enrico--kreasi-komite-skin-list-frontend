"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";

import { Button } from "components/atomic/atom/Button";
import {
  ListToolbar,
  type ListToolbarOption,
} from "components/atomic/molecule/ListToolbar";
import { mapSkinTreatLabel } from "libs/util/mapSkinTreatLabel";

import { AddSkinTreatDialog } from "./add-skin-treat-dialog/AddSkinTreatDialog";
import type {
  AdminUserSkinTreatCategoryConfig,
  AdminUserSkinTreatCategoryId,
} from "../utils/adminUserSkinTreatCategory";
import {
  ADMIN_USER_SKIN_TREAT_SORT_OPTIONS,
  DEFAULT_ADMIN_USER_SKIN_TREAT_SORT_VALUE,
  type AdminUserSkinTreatSortValue,
} from "../utils/adminUserSkinTreatListSort";

type AdminUserSkinTreatToolbarProps = {
  userUuid: string;
  activeCategory: AdminUserSkinTreatCategoryId;
  activeCategoryConfig: AdminUserSkinTreatCategoryConfig;
  searchValue: string;
  onSearchChange: (value: string) => void;
  sortValue: AdminUserSkinTreatSortValue;
  onSortChange: (value: AdminUserSkinTreatSortValue) => void;
};

const EMPTY_FILTER_OPTIONS: ListToolbarOption<never>[] = [];
const EMPTY_FILTER_VALUES: never[] = [];

function getSearchPlaceholder(categoryLabel: string) {
  return `Cari ${mapSkinTreatLabel(categoryLabel).toLowerCase()}`;
}

export function AdminUserSkinTreatToolbar({
  userUuid,
  activeCategory,
  activeCategoryConfig,
  searchValue,
  onSearchChange,
  sortValue,
  onSortChange,
}: AdminUserSkinTreatToolbarProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  function handleReset() {
    onSearchChange("");
    onSortChange(DEFAULT_ADMIN_USER_SKIN_TREAT_SORT_VALUE);
  }

  return (
    <>
      <ListToolbar
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        searchPlaceholder={getSearchPlaceholder(activeCategoryConfig.label)}
        filterOptions={EMPTY_FILTER_OPTIONS}
        selectedFilterValues={EMPTY_FILTER_VALUES}
        onFilterValuesChange={() => undefined}
        sortLabel={`Urutkan ${mapSkinTreatLabel(activeCategoryConfig.label).toLowerCase()}`}
        sortDescription="Pilih urutan data skin care pada kategori ini."
        sortValue={sortValue}
        sortOptions={ADMIN_USER_SKIN_TREAT_SORT_OPTIONS}
        onSortChange={onSortChange}
        onReset={handleReset}
        actions={
          <Button
            type="button"
            size="md"
            leadingIcon={<Icon icon="material-symbols:add-rounded" />}
            className="w-full sm:ml-auto sm:w-auto"
            onClick={() => setIsAddDialogOpen(true)}
          >
            {`Tambah ${mapSkinTreatLabel(activeCategoryConfig.label)}`}
          </Button>
        }
      />

      <AddSkinTreatDialog
        open={isAddDialogOpen}
        userUuid={userUuid}
        category={activeCategory}
        categoryLabel={mapSkinTreatLabel(activeCategoryConfig.label)}
        onOpenChange={setIsAddDialogOpen}
      />
    </>
  );
}
