"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";

import { Button } from "@/components/atomic/atom/Button";
import { Checkbox } from "@/components/atomic/atom/Checkbox";
import { TextInput } from "@/components/atomic/atom/TextInput";
import Dialog, {
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/atomic/molecule/Dialog";
import { cn } from "@/util/cn";

export type ListToolbarOption<TValue extends string> = {
  value: TValue;
  label: string;
};

export type ListToolbarProps<
  TFilterValue extends string,
  TSortValue extends string,
> = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filterTitle?: string;
  filterDescription?: string;
  filterOptions: ListToolbarOption<TFilterValue>[];
  selectedFilterValues: TFilterValue[];
  onFilterValuesChange: (values: TFilterValue[]) => void;
  sortLabel?: string;
  sortDescription?: string;
  sortValue: TSortValue;
  sortOptions: ListToolbarOption<TSortValue>[];
  onSortChange: (value: TSortValue) => void;
  onReset?: () => void;
  className?: string;
};

export function ListToolbar<
  TFilterValue extends string,
  TSortValue extends string,
>({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search",
  filterTitle = "Filter",
  filterDescription = "Choose which data should be shown.",
  filterOptions,
  selectedFilterValues,
  onFilterValuesChange,
  sortLabel = "Sort by",
  sortDescription = "Choose how the list should be ordered.",
  sortValue,
  sortOptions,
  onSortChange,
  className,
  onReset,
}: ListToolbarProps<TFilterValue, TSortValue>) {
  const activeFilterCount = selectedFilterValues.length;
  const [isSortDialogOpen, setIsSortDialogOpen] = useState(false);
  const selectedSortOption = sortOptions.find(
    (option) => option.value === sortValue,
  );

  function handleFilterToggle(value: TFilterValue, checked: boolean) {
    // Keep filter values unique while preserving the option order from props.
    const nextValueSet = new Set(selectedFilterValues);

    if (checked) {
      nextValueSet.add(value);
    } else {
      nextValueSet.delete(value);
    }

    onFilterValuesChange(
      filterOptions
        .map((option) => option.value)
        .filter((optionValue) => nextValueSet.has(optionValue)),
    );
  }

  function handleSortChange(value: TSortValue) {
    onSortChange(value);
    setIsSortDialogOpen(false);
  }

  return (
    <section className={cn("flex flex-col gap-3", className)}>
      {/* Section: Search field */}
      <TextInput
        value={searchValue}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder={searchPlaceholder}
        aria-label={searchPlaceholder}
        startItem={<Icon icon="lucide:search" />}
        endItem={
          searchValue ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => onSearchChange("")}
              className="flex size-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Icon icon="lucide:x" className="size-4" />
            </button>
          ) : null
        }
      />

      {/* Section: Filter and sort controls */}
      <div className="flex items-center gap-2">
        <Dialog
          trigger={
            <Button
              type="button"
              variant="outline"
              size="md"
              className="shrink-0"
              leadingIcon={<Icon icon="lucide:list-filter" />}
            >
              Filter
              {activeFilterCount > 0 ? (
                <span className="ml-1 flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[11px] font-semibold leading-none text-primary-foreground">
                  {activeFilterCount}
                </span>
              ) : null}
            </Button>
          }
        >
          <DialogHeader className="items-start">
            <div className="flex flex-col gap-1">
              <DialogTitle>{filterTitle}</DialogTitle>
              <DialogDescription>{filterDescription}</DialogDescription>
            </div>
          </DialogHeader>

          <DialogBody className="flex flex-col gap-3">
            {/* Section: Filter options */}
            <div className="flex flex-col gap-3">
              {filterOptions.map((option) => (
                <Checkbox
                  key={option.value}
                  checked={selectedFilterValues.includes(option.value)}
                  onChange={(event) =>
                    handleFilterToggle(option.value, event.target.checked)
                  }
                  label={option.label}
                  labelClassName="text-sm font-medium text-dialog-current-foreground"
                  wrapperProps={{
                    className:
                      "flex w-full items-center rounded-xl border border-dialog-current-border px-3 py-3",
                  }}
                />
              ))}
            </div>
          </DialogBody>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onFilterValuesChange([])}
              disabled={activeFilterCount === 0}
            >
              Clear filter
            </Button>
          </DialogFooter>
        </Dialog>

        <Dialog
          open={isSortDialogOpen}
          onOpenChange={setIsSortDialogOpen}
          trigger={
            <Button
              type="button"
              variant="outline"
              size="md"
              className="min-w-0 flex-1 justify-start px-3"
              leadingIcon={<Icon icon="lucide:arrow-up-down" />}
              trailingIcon={<Icon icon="lucide:chevron-down" />}
            >
              <span className="flex min-w-0 flex-col items-start gap-0.5">
                <span className="text-[11px] font-medium leading-none text-muted-foreground">
                  {sortLabel}
                </span>
                <span className="max-w-32 truncate text-sm leading-none">
                  {selectedSortOption?.label ?? "Select sort"}
                </span>
              </span>
            </Button>
          }
        >
          <DialogHeader className="items-start">
            <div className="flex flex-col gap-1">
              <DialogTitle>{sortLabel}</DialogTitle>
              <DialogDescription>{sortDescription}</DialogDescription>
            </div>
          </DialogHeader>

          <DialogBody className="flex flex-col gap-3">
            {/* Section: Sort options */}
            <div className="flex flex-col gap-2" role="radiogroup">
              {sortOptions.map((option) => {
                const isSelected = option.value === sortValue;

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSortChange(option.value)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isSelected
                        ? "border-primary bg-primary/10 text-dialog-current-foreground"
                        : "border-dialog-current-border text-dialog-current-muted hover:bg-white/5 hover:text-dialog-current-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full border",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-dialog-current-border",
                      )}
                    >
                      {isSelected ? (
                        <Icon icon="lucide:check" className="size-3.5" />
                      ) : null}
                    </span>
                    <span className="min-w-0 flex-1 text-sm font-medium">
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </DialogBody>
        </Dialog>

        {onReset ? (
          <Button
            type="button"
            variant="ghost"
            size="md"
            iconOnly
            aria-label="Reset toolbar"
            onClick={onReset}
          >
            <Icon icon="lucide:rotate-ccw" />
          </Button>
        ) : null}
      </div>
    </section>
  );
}
