import { DashboardLinkCard } from "@/components/atomic/molecule/DashboardLinkCard";

export function DashboardShortcutsSection() {
  return (
    // Two-column grid of quick-access dashboard cards
    <div className="grid grid-cols-2 gap-3">
      <DashboardLinkCard
        label="Skin Treat"
        title="Siap untuk menjaga kesehatan kulitmu?"
        description=""
        href="/app"
      />
      <DashboardLinkCard
        label="Routine"
        title=""
        description="Fondasi harian kamu. Konsistensi adalah kuncinya."
        href="/app"
      />
    </div>
  );
}
