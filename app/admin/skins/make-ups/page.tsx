import type { Metadata } from "next";

import { PageAdminSkinMakeUps } from "../../../../components/atomic/layout/skins/PageAdminSkinMakeUps";

export const metadata: Metadata = {
  title: "Skin Make Ups",
};

export default function AdminSkinMakeUpsPage() {
  return <PageAdminSkinMakeUps />;
}
