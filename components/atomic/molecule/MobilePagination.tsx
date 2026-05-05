"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/atomic/atom/Button";
import { cn } from "libs/util/cn";

export type MobilePaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

function getVisiblePages(currentPage: number, totalPages: number) {
  const pageSet = new Set<number>([1, totalPages, currentPage]);

  if (currentPage > 1) {
    pageSet.add(currentPage - 1);
  }

  if (currentPage < totalPages) {
    pageSet.add(currentPage + 1);
  }

  // Keep the mobile pagination compact while still showing first, current, and last page anchors.
  return Array.from(pageSet)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
}

export function MobilePagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: MobilePaginationProps) {
  const safeTotalPages = Math.max(totalPages, 1);
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), safeTotalPages);
  const visiblePages = getVisiblePages(safeCurrentPage, safeTotalPages);
  const isFirstPage = safeCurrentPage === 1;
  const isLastPage = safeCurrentPage === safeTotalPages;

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-2xl bg-transparent p-2",
        className,
      )}
    >
      {/* Section: Previous page action */}
      <Button
        aria-label="Go to previous page"
        iconOnly
        size="sm"
        variant="ghost"
        disabled={isFirstPage}
        onClick={() => onPageChange(safeCurrentPage - 1)}
      >
        <Icon icon="lucide:chevron-left" />
      </Button>

      {/* Section: Page number list */}
      <div className="flex min-w-0 flex-1 items-center justify-center gap-1">
        {visiblePages.map((page, index) => {
          const previousPage = visiblePages[index - 1];
          const showGap = previousPage !== undefined && page - previousPage > 1;
          const isActive = page === safeCurrentPage;

          return (
            <div key={page} className="flex items-center gap-1">
              {showGap ? (
                <span className="flex h-8 w-5 items-center justify-center text-xs font-medium text-muted-foreground">
                  ...
                </span>
              ) : null}
              <button
                type="button"
                aria-label={`Go to page ${page}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => onPageChange(page)}
                className={cn(
                  "flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {page}
              </button>
            </div>
          );
        })}
      </div>

      {/* Section: Next page action */}
      <Button
        aria-label="Go to next page"
        iconOnly
        size="sm"
        variant="ghost"
        disabled={isLastPage}
        onClick={() => onPageChange(safeCurrentPage + 1)}
      >
        <Icon icon="lucide:chevron-right" />
      </Button>
    </nav>
  );
}
