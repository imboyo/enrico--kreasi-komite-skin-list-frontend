"use client";

const CATEGORY_LABELS = ["Routine", "Tone", "Make Up", "Concerns"];

export const HeroCard = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary px-5 py-4 text-primary-foreground">
      {/* Decorative background circles — CSS animations run off main thread */}
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10"
        style={{ animation: "hero-pulse 4s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute -bottom-8 -right-2 h-20 w-20 rounded-full bg-white/5"
        style={{ animation: "hero-pulse 4s ease-in-out 1.5s infinite" }}
      />

      <p className="text-xs font-medium uppercase tracking-widest opacity-70">
        Your skin at a glance
      </p>
      <p className="mt-1 text-2xl font-semibold leading-tight">
        Stay consistent,
        <br />
        glow naturally.
      </p>

      {/* Category pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {CATEGORY_LABELS.map((label) => (
          <span
            key={label}
            className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};
