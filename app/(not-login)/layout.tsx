import type { ReactNode } from "react";

import { NotLoginSidebar } from "@/components/atomic/layout/not-login/NotLoginSidebar";
import { NotLoginTopbar } from "@/components/atomic/layout/not-login/NotLoginTopbar";
import GuardNotLogin from "@/guard/GuardNotLogin";

interface NotLoginLayoutProps {
  children: ReactNode;
}

export default function NotLoginLayout({ children }: Readonly<NotLoginLayoutProps>) {
  return (
    <GuardNotLogin>
      <div className="flex min-h-dvh bg-background">
        {/* Section: Not Login Sidebar */}
        <NotLoginSidebar />

        {/* Section: Not Login Page Shell */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Section: Not Login Topbar */}
          <NotLoginTopbar />

          {/* Section: Not Login Content */}
          <main className="min-w-0 flex-1 overflow-y-auto">
            <div className="mx-auto flex min-h-full w-full max-w-125 flex-col px-4 py-4 sm:max-w-160 md:max-w-3xl lg:max-w-240 xl:max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </GuardNotLogin>
  );
}
