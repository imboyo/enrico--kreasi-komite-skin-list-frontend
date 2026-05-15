"use client";

import { Icon } from "@iconify/react";
import debounce from "lodash/debounce";
import { useEffect, useMemo, useState } from "react";

import { Button } from "components/atomic/atom/Button";
import {
  ListToolbar,
  type ListToolbarOption,
} from "components/atomic/molecule/ListToolbar";
import { mapSkinTreatLabel } from "libs/util/mapSkinTreatLabel";

import { AddSkinTreatDialog } from "./add-skin-treat-dialog/AddSkinTreatDialog";
import { usePageLevelStore } from "../page-level.store";
import {
  getAdminDefaultSkinTreatCategoryConfig,
  type AdminDefaultSkinTreatCategoryId,
} from "../utils/defaultSkinTreatCategory";
import {
  ADMIN_DEFAULT_SKIN_TREAT_SORT_OPTIONS,
  type AdminDefaultSkinTreatSortValue,
} from "../utils/defaultSkinTreatListSort";

const EMPTY_FILTER_OPTIONS: ListToolbarOption<never>[] = [];
const EMPTY_FILTER_VALUES: never[] = [];

function getSearchPlaceholder(categoryLabel: string) {
  return `Cari ${mapSkinTreatLabel(categoryLabel).toLowerCase()}`;
}

export function AdminDefaultSkinTreatToolbar() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const activeCategory = usePageLevelStore((state) => state.activeCategory);
  const activeCategoryConfig =
    getAdminDefaultSkinTreatCategoryConfig(activeCategory);
  const searchValue = usePageLevelStore((state) => state.searchValue);
  const sortValue = usePageLevelStore((state) => state.sortValue);
  const setSearchValue = usePageLevelStore((state) => state.setSearchValue);
  const applySearchToStore = usePageLevelStore(
    (state) => state.applyDebouncedSearch,
  );
  const setSortValue = usePageLevelStore((state) => state.setSortValue);
  const resetToolbarState = usePageLevelStore(
    (state) => state.resetToolbarState,
  );

  const applyDebouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        applySearchToStore(value);
      }, 400),
    [applySearchToStore],
  );

  useEffect(() => () => applyDebouncedSearch.cancel(), [applyDebouncedSearch]);

  function handleSearchChange(value: string) {
    setSearchValue(value);
    applyDebouncedSearch(value);
  }

  function handleSortChange(nextSortValue: AdminDefaultSkinTreatSortValue) {
    setSortValue(nextSortValue);
  }

  function handleReset() {
    // Cancel the queued debounce so a stale keyword cannot restore itself
    // after the toolbar state has already been cleared.
    applyDebouncedSearch.cancel();
    resetToolbarState();
  }

  return (
    <>
      <ListToolbar
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        searchPlaceholder={getSearchPlaceholder(activeCategoryConfig.label)}
        filterOptions={EMPTY_FILTER_OPTIONS}
        selectedFilterValues={EMPTY_FILTER_VALUES}
        onFilterValuesChange={() => undefined}
        sortLabel={`Urutkan ${mapSkinTreatLabel(activeCategoryConfig.label).toLowerCase()}`}
        sortDescription="Pilih urutan data skin care pada kategori ini."
        sortValue={sortValue}
        sortOptions={ADMIN_DEFAULT_SKIN_TREAT_SORT_OPTIONS}
        onSortChange={handleSortChange}
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
        category={activeCategory}
        categoryLabel={mapSkinTreatLabel(activeCategoryConfig.label)}
        onOpenChange={setIsAddDialogOpen}
      />
    </>
  );
}
