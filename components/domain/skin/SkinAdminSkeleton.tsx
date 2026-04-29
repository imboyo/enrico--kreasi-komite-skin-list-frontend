import { Skeleton } from "components/atomic/atom/Skeleton";

export function SkinAdminSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {/* Section: Skin care card skeleton */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="rounded-3xl border border-border bg-card p-4"
        >
          <div className="flex items-start gap-3">
            <Skeleton className="size-11 rounded-2xl" />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <Skeleton className="h-5 w-2/3 rounded-lg" />
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-4/5 rounded-lg" />
            </div>
            <Skeleton className="size-8 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}