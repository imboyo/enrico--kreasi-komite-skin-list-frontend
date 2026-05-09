export type CategorySummaryItem = {
  category: string;
  last_30_days: number;
  last_7_days: number;
  last_24_hours: number;
};

export type CategorySummaryTotals = {
  last_30_days: number;
  last_7_days: number;
  last_24_hours: number;
};

export type GetSkinCareCategorySummaryResponse = {
  data: {
    categories: CategorySummaryItem[];
    totals: CategorySummaryTotals;
  };
  meta: {
    generated_at: string;
    cache_ttl_minutes: number;
  };
};
