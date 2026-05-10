import type { Metadata } from "next";

import { PageAdminSkinScars } from "client-side-page/admin/skins/scars/PageAdminSkinScars";

export const metadata: Metadata = {
  title: "Skin Scars",
};

export default function AdminSkinScarsPage() {
  return <PageAdminSkinScars />;
}
