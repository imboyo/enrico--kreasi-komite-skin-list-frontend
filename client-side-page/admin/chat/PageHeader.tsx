export function PageHeader() {
  return (
    <section className="flex flex-col gap-1">
      {/* Section: Chat page header */}
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Admin
      </p>
      <h1 className="text-2xl font-semibold text-foreground">Chats</h1>
    </section>
  );
}

