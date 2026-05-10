"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";

import { Button } from "components/atomic/atom/Button";
import {
  ListToolbar,
  type ListToolbarOption,
} from "components/atomic/molecule/ListToolbar";

import { AddSkinCareDialog } from "./add-skin-care-dialog/AddSkinCareDialog";
import type { AdminSkinCategoryConfig, AdminSkinCategoryId } from "../utils/skinCategory";
import {
  ADMIN_SKIN_SORT_OPTIONS,
  DEFAULT_ADMIN_SKIN_SORT_VALUE,
  type AdminSkinSortValue,
} from "../utils/skinListSort";

type AdminSkinToolbarProps = {
  activeCategory: AdminSkinCategoryId;
  activeCategoryConfig: AdminSkinCategoryConfig;
  searchValue: string;
  onSearchChange: (value: string) => void;
  sortValue: AdminSkinSortValue;
  onSortChange: (value: AdminSkinSortValue) => void;
};

const EMPTY_FILTER_OPTIONS: ListToolbarOption<never>[] = [];
const EMPTY_FILTER_VALUES: never[] = [];

function getSearchPlaceholder(categoryLabel: string) {
  return `Cari ${categoryLabel.toLowerCase()}`;
}

export function AdminSkinToolbar({
  activeCategory,
  activeCategoryConfig,
  searchValue,
  onSearchChange,
  sortValue,
  onSortChange,
}: AdminSkinToolbarProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  function handleReset() {
    onSearchChange("");
    onSortChange(DEFAULT_ADMIN_SKIN_SORT_VALUE);
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
        sortLabel={`Urutkan ${activeCategoryConfig.label.toLowerCase()}`}
        sortDescription="Pilih urutan data skin care pada kategori ini."
        sortValue={sortValue}
        sortOptions={ADMIN_SKIN_SORT_OPTIONS}
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
            {`Tambah ${activeCategoryConfig.label}`}
          </Button>
        }
      />

      <AddSkinCareDialog
        open={isAddDialogOpen}
        category={activeCategory}
        categoryLabel={activeCategoryConfig.label}
        onOpenChange={setIsAddDialogOpen}
      />
    </>
  );
}
