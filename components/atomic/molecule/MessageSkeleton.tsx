import { Skeleton } from "components/atomic/atom/Skeleton";

export function MessagesSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-start">
        <Skeleton className="h-10 w-52 rounded-2xl rounded-bl-sm" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-10 w-36 rounded-2xl rounded-br-sm" />
      </div>
      <div className="flex justify-start">
        <Skeleton className="h-16 w-60 rounded-2xl rounded-bl-sm" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-10 w-44 rounded-2xl rounded-br-sm" />
      </div>
      <div className="flex justify-start">
        <Skeleton className="h-10 w-48 rounded-2xl rounded-bl-sm" />
      </div>
    </div>
  );
}
