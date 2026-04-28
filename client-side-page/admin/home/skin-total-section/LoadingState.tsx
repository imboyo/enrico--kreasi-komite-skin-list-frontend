import { SKIN_TOTAL_CARDS } from "@/mock-backend/admin/dashboard/total-skin";

import { SkinTotalCard } from "./SkinTotalCard";

export const LoadingState = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {SKIN_TOTAL_CARDS.map((card) => (
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
