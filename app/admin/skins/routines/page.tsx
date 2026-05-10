import type { Metadata } from "next";

import { PageAdminSkinRoutines } from "client-side-page/admin/skins/routines/PageAdminSkinRoutines";

export const metadata: Metadata = {
  title: "Skin Routines",
};

export default function AdminSkinRoutinesPage() {
  return <PageAdminSkinRoutines />;
}
