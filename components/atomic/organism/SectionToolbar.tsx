"use client";

import { Icon } from "@iconify/react";

import { Button } from "@/components/atomic/atom/Button";
import { TextInput } from "@/components/atomic/atom/TextInput";
import { MobilePagination } from "@/components/atomic/molecule/MobilePagination";
import { cn } from "libs/util/cn";

export type SectionToolbarPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export type SectionToolbarProps = {
  /** Search input — renders when provided */
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  /** Refresh button — renders when provided */
  onRefresh?: () => void;
  isRefreshing?: boolean;
  /** Pagination — renders when provided and totalPages > 1 */
  pagination?: SectionToolbarPaginationProps;
  className?: string;
};

export function SectionToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search",
  onRefresh,
  isRefreshing = false,
  pagination,
  className,
}: SectionToolbarProps) {
  const hasSearch = onSearchChange !== undefined;
  const hasRefresh = onRefresh !== undefined;
  const showPagination = pagination !== undefined && pagination.totalPages > 1;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Search and refresh row */}
      {(hasSearch || hasRefresh) && (
        <div className="flex items-center gap-2">
          {/* Search input section */}
          {hasSearch && (
            <TextInput
              value={searchValue ?? ""}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              containerProps={{ className: "flex-1 min-w-0" }}
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
          )}

          {/* Refresh button section */}
          {hasRefresh && (
            <Button
              type="button"
              variant="outline"
              size="md"
              iconOnly
              aria-label={isRefreshing ? "Refreshing..." : "Refresh"}
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
      )}

      {/* Pagination section */}
      {showPagination && (
        <MobilePagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
        />
      )}
    </div>
  );
}
