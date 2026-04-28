export const LoadingState = () => {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-card/90 px-4 py-4 text-foreground shadow-[0_10px_30px_rgba(60,60,60,0.08)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 rounded-full bg-muted/60"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-2">
            <div
              className="h-4 w-24 rounded-full bg-muted/60"
              aria-hidden="true"
            />
            <div
              className="h-8 w-14 rounded-full bg-muted/60"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Section: Pending conversation preview skeleton */}
      <div className="flex flex-col gap-2">
        {[0, 1, 2].map((placeholder) => (
          <div
            key={placeholder}
            className="h-16 rounded-2xl bg-muted/60"
            aria-hidden="true"
          />
        ))}
      </div>
    </article>
  );
};
