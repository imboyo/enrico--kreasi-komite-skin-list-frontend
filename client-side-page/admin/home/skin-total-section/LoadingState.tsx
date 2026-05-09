import { SkinTotalCard } from "./SkinTotalCard";

const LOADING_CARDS = [
  {
    key: "routines",
    label: "Routine",
    icon: "mdi:calendar-check-outline",
    accentClassName: "bg-primary/10 text-primary",
  },
  {
    key: "barriers",
    label: "Barrier",
    icon: "mdi:shield-half-full",
    accentClassName: "bg-emerald-500/10 text-emerald-600",
  },
  {
    key: "colors",
    label: "Colors",
    icon: "mdi:palette-outline",
    accentClassName: "bg-sky-500/10 text-sky-600",
  },
  {
    key: "scars",
    label: "Scars",
    icon: "mdi:bandage",
    accentClassName: "bg-rose-500/10 text-rose-600",
  },
];

export const LoadingState = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {LOADING_CARDS.map((card) => (
        <SkinTotalCard
          key={card.key}
          card={{
            ...card,
            total: 0,
          }}
          isLoading
        />
      ))}
    </div>
  );
};
