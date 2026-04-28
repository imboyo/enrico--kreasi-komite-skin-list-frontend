"use client";

import { useQuery } from "@tanstack/react-query";

import { QueryStateHandler } from "@/components/atomic/molecule/QueryStateHandler";
import { getAdminSkinTotals } from "@/mock-backend/admin/dashboard/total-skin";

import { LoadingState } from "./LoadingState";
import { SkinTotalCard } from "./SkinTotalCard";

export function SkinTotalSection() {
  const skinTotalsQuery = useQuery({
    queryKey: ["admin-skin-totals"],
    queryFn: async () => {
      return await getAdminSkinTotals();
    },
  });

  const skinTotalCards = skinTotalsQuery.data?.data ?? [];

  return (
    <>
      {/* Section: Skins total overview */}
      <section className="flex flex-col gap-4">
        {/* Section: Skin total cards */}
        <QueryStateHandler
          query={skinTotalsQuery}
          skeleton={<LoadingState />}
          isEmpty={skinTotalCards.length === 0}
          errorTitle="Failed to load skin totals."
          emptyTitle="No skin totals available."
          emptyDescription="The dashboard does not have any skin data yet."
        >
          <div className="grid grid-cols-2 gap-3">
            {skinTotalCards.map((card) => (
              <SkinTotalCard key={card.key} card={card} />
            ))}
          </div>
        </QueryStateHandler>
      </section>
    </>
  );
}
