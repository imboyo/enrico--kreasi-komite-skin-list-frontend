import type { Metadata } from "next";

import { PageAdminSkinColors } from "client-side-page/admin/skins/colors/PageAdminSkinColors";

export const metadata: Metadata = {
  title: "Skin Colors",
};

export default function AdminSkinColorsPage() {
  return <PageAdminSkinColors />;
}
