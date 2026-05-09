import { Icon } from "@iconify/react";
import { Button } from "@/components/atomic/atom/Button";

interface SkinGoalsSummaryProps {
  activeGoals: string[];
  onEdit: () => void;
}

export function SkinGoalsSummary({
  activeGoals,
  onEdit,
}: SkinGoalsSummaryProps) {
  return (
    <section className="rounded-[28px] border border-border/60 bg-card/80 p-5 shadow-sm backdrop-blur-md sm:p-6">
      {/* Skin goals section header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Skin Goals
          </p>
          <h2 className="text-xl font-semibold text-foreground">
            Tentukan fokus hasil yang ingin kamu capai.
          </h2>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Pilih target utama agar rekomendasi dan progres yang muncul tetap
            relevan dengan kebutuhan kulitmu saat ini.
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={onEdit}
          className="w-full sm:w-auto"
          leadingIcon={<Icon icon="lucide:settings-2" className="size-3.5" />}
        >
          Ubah Goals
        </Button>
      </div>

      {/* Selected goals list */}
      <div className="mt-5 flex flex-wrap gap-2.5">
        {activeGoals.length === 0 ? (
          <div className="w-full rounded-2xl border border-dashed border-border/70 bg-background/60 px-4 py-5 text-sm text-muted-foreground">
            Belum ada goals yang dipilih. Gunakan tombol pengaturan untuk
            menentukan prioritas perawatanmu.
          </div>
        ) : (
          activeGoals.map((goal) => (
            <span
              key={goal}
              className="rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary"
            >
              {goal}
            </span>
          ))
        )}
      </div>
    </section>
  );
}
