import type { Metadata } from "next";

import { PageAdminSkins } from "../../../components/atomic/layout/skins/PageAdminSkins";

export const metadata: Metadata = {
  title: "Skins Management",
};

export default function AdminSkinsPage() {
  return <PageAdminSkins />;
}
