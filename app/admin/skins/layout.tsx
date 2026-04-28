import type { ReactNode } from "react";

import { SkinsTabNavigation } from "../../../components/atomic/layout/skins/SkinsTabNavigation";

interface AdminSkinsLayoutProps {
  children: ReactNode;
}

export default function AdminSkinsLayout({
  children,
}: Readonly<AdminSkinsLayoutProps>) {
  return (
    <section className="mx-auto flex w-full max-w-125 flex-1 flex-col gap-4 px-4 py-4">
      {/* Section: Skins tab navigation */}
      <SkinsTabNavigation />

      {/* Section: Skins page content */}
      <div className="flex flex-1 flex-col">{children}</div>
    </section>
  );
}
