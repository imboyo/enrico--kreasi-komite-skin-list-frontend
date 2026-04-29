"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/atomic/atom/Button";
import { Fallback } from "@/components/atomic/atom/Fallback";
import { Skeleton } from "@/components/atomic/atom/Skeleton";
import { cn } from "@/util/cn";

type QueryState = {
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  isFetching: boolean;
  refetch: () => void;
};

type QueryStateHandlerProps = {
  query: QueryState;
  /** Skeleton shown during the initial load */
  skeleton: ReactNode;
  /** Pass true when the resolved/derived data is empty (checked after loading & error states) */
  isEmpty?: boolean;
  errorTitle?: string;
  /** Falls back to the error message when omitted */
  errorDescription?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  contentClassName?: string;
  children: ReactNode;
};

/**
 * Handles the four query states — loading, error, empty, success — in a
 * consistent way across different list features (routines, colors, scars, …).
 *
 * Wrap your success-state JSX in this component and pass the relevant
 * fallback props. A thin progress bar is shown over the children whenever
 * a background refetch is in progress.
 */
export function QueryStateHandler({
  query,
  skeleton,
  isEmpty = false,
  errorTitle = "Something went wrong.",
  errorDescription,
  emptyTitle = "No data available.",
  emptyDescription,
  contentClassName,
  children,
}: QueryStateHandlerProps) {
  if (query.isLoading) {
    return <>{skeleton}</>;
  }

  if (query.isError) {
    return (
      <Fallback
        title={errorTitle}
        description={
          errorDescription ??
          (query.error instanceof Error
            ? query.error.message
            : "Request failed. Try again.")
        }
        action={
          <Button size="sm" onClick={() => query.refetch()}>
            Retry
          </Button>
        }
      />
    );
  }

  if (isEmpty) {
    return (
      <Fallback
        title={emptyTitle}
        description={emptyDescription}
        action={
          <Button size="sm" variant="secondary" onClick={() => query.refetch()}>
            Refresh
          </Button>
        }
      />
    );
  }

  return (
    <div className={cn("relative", contentClassName)}>
      {/* Thin progress bar while a background refetch runs */}
      {query.isFetching ? (
        <div className="pointer-events-none absolute inset-x-4 top-0 z-10">
          <Skeleton className="h-1.5 w-full rounded-full bg-primary/25" />
        </div>
      ) : null}
      {children}
    </div>
  );
}
