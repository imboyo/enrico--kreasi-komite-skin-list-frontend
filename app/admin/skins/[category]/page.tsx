import { redirect } from "next/navigation";

import { APP_URL } from "@/constant";
import {
  ADMIN_SKIN_CATEGORY_PARAM_KEY,
  DEFAULT_ADMIN_SKIN_CATEGORY,
  isAdminSkinCategoryId,
} from "@/client-side-page/admin/skins/utils/skinCategory";

interface LegacyAdminSkinCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function LegacyAdminSkinCategoryPage({
  params,
}: Readonly<LegacyAdminSkinCategoryPageProps>) {
  const { category } = await params;
  const nextCategory = isAdminSkinCategoryId(category)
    ? category
    : DEFAULT_ADMIN_SKIN_CATEGORY;

  redirect(
    `${APP_URL.ADMIN_CARE_SKIN_MANAGEMENT}?${ADMIN_SKIN_CATEGORY_PARAM_KEY}=${nextCategory}`,
  );
}
