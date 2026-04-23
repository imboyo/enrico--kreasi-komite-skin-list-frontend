import { DashboardLinkCard } from "@/components/atomic/molecule/DashboardLinkCard";

export function DashboardShortcutsSection() {
  return (
    // Two-column grid of quick-access dashboard cards
    <div className="grid grid-cols-2 gap-3">
      <DashboardLinkCard
        label="Lists"
        title="Ready to embrace your skin"
        description=""
        href="/app"
      />
      <DashboardLinkCard
        label="Routine"
        title=""
        description="Your daily foundation. Consistency beats everything."
        href="/app"
      />
    </div>
  );
}
