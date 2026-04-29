import type { Metadata } from "next";

import { PageAdminSkinRoutines } from "@/components/atomic/layout/skins/PageAdminSkinRoutines";

export const metadata: Metadata = {
  title: "Skin Routines",
};

export default function AdminSkinRoutinesPage() {
  return <PageAdminSkinRoutines />;
}
