"use client";

import { Routines } from "@/client-side-page/home/Routines";

export const PageHome = () => {
  return (
    <main className="px-4 py-4 flex flex-col gap-6">
      <section className="flex flex-col">
        <h1 className="text-[40px] font-medium">Routine</h1>
        <h6 className="text-muted-foreground text-sm">
          &#34;Your daily foundation. Consistency beats everything.”
        </h6>
      </section>
      <Routines />
    </main>
  );
};
