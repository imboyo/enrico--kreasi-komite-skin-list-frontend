import type { Metadata } from "next";

import { PageAdminSkinColors } from "../../../../components/atomic/layout/skins/PageAdminSkinColors";

export const metadata: Metadata = {
  title: "Skin Colors",
};

export default function AdminSkinColorsPage() {
  return <PageAdminSkinColors />;
}
