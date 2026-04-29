import { Skeleton } from "@/components/atomic/atom/Skeleton";

export function LoadingState() {
  return (
    <div className="flex flex-col gap-3">
      {/* Section: Chat conversation skeleton */}
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="rounded-2xl p-3">
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-1/2 rounded-md" />
              <Skeleton className="h-3 w-3/4 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
