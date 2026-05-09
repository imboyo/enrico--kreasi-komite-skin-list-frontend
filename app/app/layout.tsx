import { AppTopbar } from "@/components/atomic/layout/app/AppTopbar";
import { AppSidebar } from "@/components/atomic/layout/app/AppSidebar";
import GuardLogin from "@/guard/GuardLogin";
import type { ReactNode } from "react";

export default function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    // Only USER role can access the app area; impersonation is resolved in GuardLogin.
    <GuardLogin allowedRoles={["USER"]}>
      <div className="flex min-h-dvh bg-background">
        {/* Section: App Sidebar */}
        <AppSidebar />

        {/* Section: App Page Shell */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Section: App Topbar */}
          <AppTopbar />

          {/* Section: App Content */}
          <main className="min-w-0 flex-1 overflow-y-auto">
            {/* Keep the app pages readable on large screens without locking the entire shell to a mobile width. */}
            <div className="mx-auto flex min-h-full w-full max-w-125 flex-col px-4 py-4 sm:max-w-160 md:max-w-3xl lg:max-w-240 xl:max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </GuardLogin>
  );
}
