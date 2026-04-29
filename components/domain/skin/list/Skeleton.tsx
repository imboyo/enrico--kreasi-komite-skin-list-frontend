import { Skeleton as BaseSkeleton } from "components/atomic/atom/Skeleton";

export function Skeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={`routine-skeleton-${index}`}
          className="flex items-center gap-3 rounded-[24px] border border-border/70 bg-card/90 px-4 py-4"
        >
          <BaseSkeleton className="size-5 rounded-md" />
          <BaseSkeleton className="h-4 w-32 rounded-full" />
        </div>
      ))}
    </div>
  );
}
