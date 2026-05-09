import { DashboardLinkCard } from "@/components/atomic/molecule/DashboardLinkCard";

export function DashboardShortcutsSection() {
  return (
    /* Shortcut section */
    <section className="rounded-[28px] border border-border/60 bg-card/80 p-5 shadow-sm backdrop-blur-md sm:p-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Akses Cepat
        </p>
        <h2 className="text-xl font-semibold text-foreground">
          Lanjutkan langkah perawatan tanpa harus berpindah-pindah layar.
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Semua pintasan utama ditata lebih lega agar nyaman dibaca di mobile
          maupun desktop.
        </p>
      </div>

      {/* Cards switch from one column on small screens to two columns when there is enough room */}
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <DashboardLinkCard
          label="Skin Treat"
          title="Lihat treatment yang cocok untuk kondisi kulitmu."
          description="Masuk ke rekomendasi perawatan yang sudah disesuaikan dengan kebutuhan kamu."
          href="/app"
        />
        <DashboardLinkCard
          label="Routine"
          title="Rapikan rutinitas harian agar tetap konsisten."
          description="Pantau langkah pagi dan malam supaya progres kulit tetap stabil dari hari ke hari."
          href="/app"
        />
      </div>
    </section>
  );
}
