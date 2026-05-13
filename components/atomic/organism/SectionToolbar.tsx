"use client";

import { Icon } from "@iconify/react";

import { Button } from "@/components/atomic/atom/Button";
import { TextInput } from "@/components/atomic/atom/TextInput";
import { cn } from "libs/util/cn";

export type SortDirection = "ASC" | "DESC";

export type SectionToolbarProps = {
  /** Search input — renders when provided */
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  /** Sort button — renders when onSortChange is provided */
  sortDirection?: SortDirection;
  onSortChange?: (direction: SortDirection) => void;
  /** Refresh button — renders when provided */
  onRefresh?: () => void;
  isRefreshing?: boolean;
  className?: string;
};

export function SectionToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Cari",
  sortDirection = "DESC",
  onSortChange,
  onRefresh,
  isRefreshing = false,
  className,
}: SectionToolbarProps) {
  const hasSearch = onSearchChange !== undefined;
  const hasSort = onSortChange !== undefined;
  const hasRefresh = onRefresh !== undefined;

  if (!hasSearch && !hasSort && !hasRefresh) return null;

  function toggleSort() {
    onSortChange?.(sortDirection === "DESC" ? "ASC" : "DESC");
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Search input section */}
      {hasSearch && (
        <TextInput
          value={searchValue ?? ""}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          containerProps={{ className: "flex-1 min-w-0" }}
          startItem={<Icon icon="lucide:search" />}
          surface="transparent"
          endItem={
            searchValue ? (
              <button
                type="button"
                aria-label="Hapus pencarian"
                onClick={() => onSearchChange("")}
                className="flex size-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Icon icon="lucide:x" className="size-4" />
              </button>
            ) : null
          }
        />
      )}

      {/* Sort toggle button — switches between newest-first (DESC) and oldest-first (ASC) */}
      {hasSort && (
        <Button
          type="button"
          variant="outline"
          size="md"
          iconOnly
          aria-label={
            sortDirection === "DESC"
              ? "Urutan: terbaru lebih dulu"
              : "Urutan: terlama lebih dulu"
          }
          onClick={toggleSort}
          title={
            sortDirection === "DESC"
              ? "Terbaru lebih dulu"
              : "Terlama lebih dulu"
          }
        >
          <Icon
            icon={
              sortDirection === "DESC"
                ? "lucide:arrow-down-wide-narrow"
                : "lucide:arrow-up-wide-narrow"
            }
          />
        </Button>
      )}

      {/* Refresh button section */}
      {hasRefresh && (
        <Button
          type="button"
          variant="outline"
          size="md"
          iconOnly
          aria-label={isRefreshing ? "Menyegarkan..." : "Segarkan"}
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          <Icon
            icon="lucide:rotate-cw"
            className={cn(isRefreshing && "animate-spin")}
          />
        </Button>
      )}
    </div>
  );
}
