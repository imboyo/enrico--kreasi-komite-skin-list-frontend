import type { Metadata } from "next";

import { PageAdminSkinMakeUps } from "client-side-page/admin/skins/PageAdminSkinMakeUps";

export const metadata: Metadata = {
  title: "Skin Make Ups",
};

export default function AdminSkinMakeUpsPage() {
  return <PageAdminSkinMakeUps />;
}
