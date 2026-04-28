import type { Metadata } from "next";

import { PageAdminSkinScars } from "../../../../components/atomic/layout/skins/PageAdminSkinScars";

export const metadata: Metadata = {
  title: "Skin Scars",
};

export default function AdminSkinScarsPage() {
  return <PageAdminSkinScars />;
}
