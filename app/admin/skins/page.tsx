import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { APP_URL } from "@/constant";

export const metadata: Metadata = {
  title: "Skin Routines",
};

export default function AdminSkinsPage() {
  redirect(`${APP_URL.ADMIN_CARE_SKIN_MANAGEMENT}/routines`);
}
