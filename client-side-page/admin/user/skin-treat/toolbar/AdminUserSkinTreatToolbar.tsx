"use client";

import {
  ListToolbar,
  type ListToolbarOption,
} from "components/atomic/molecule/ListToolbar";
import { mapSkinTreatLabel } from "libs/util/mapSkinTreatLabel";

import type { AdminUserSkinTreatCategoryConfig } from "../utils/adminUserSkinTreatCategory";
import {
  ADMIN_USER_SKIN_TREAT_SORT_OPTIONS,
  DEFAULT_ADMIN_USER_SKIN_TREAT_SORT_VALUE,
  type AdminUserSkinTreatSortValue,
} from "../utils/adminUserSkinTreatListSort";

type AdminUserSkinTreatToolbarProps = {
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
  activeCategoryConfig,
  searchValue,
  onSearchChange,
  sortValue,
  onSortChange,
}: AdminUserSkinTreatToolbarProps) {
  function handleReset() {
    onSearchChange("");
    onSortChange(DEFAULT_ADMIN_USER_SKIN_TREAT_SORT_VALUE);
  }

  return (
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
    />
  );
}
